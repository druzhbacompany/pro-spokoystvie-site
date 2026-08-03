import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const SOURCE = "Helix";
const CITY = "Екатеринбург";
const CATEGORY = "Все анализы";
const CITY_ALIAS = "ekaterinburg";
const CITY_ID = 16;
const CATEGORY_ID = 190;
const PAGE_SIZE = 12;
const BASE_SITE_URL = "https://helix.ru";
const API_BASE_URL = "https://helixru-webapi-prod.medindex.ru/api";
const CATALOG_PATH = `/${CITY_ALIAS}/catalog/${CATEGORY_ID}-vse-analizy`;
const DATA_DIR = path.join(process.cwd(), "data", "helix");
const CACHE_DIR = path.join(DATA_DIR, "cache");
const CSV_PATH = path.join(DATA_DIR, "ekaterinburg-analyses.csv");
const JSON_PATH = path.join(DATA_DIR, "ekaterinburg-analyses.json");
const REPORT_PATH = path.join(DATA_DIR, "ekaterinburg-analyses-report.md");
const FIELDS = [
  "source",
  "city",
  "category",
  "type",
  "code",
  "title",
  "price",
  "biomaterial_price",
  "turnaround_time",
  "url",
  "scraped_at",
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const politeDelay = () => sleep(1000 + Math.floor(Math.random() * 501));

function apiUrl(skip) {
  const params = new URLSearchParams({
    cityId: String(CITY_ID),
    "filter.categoryId": String(CATEGORY_ID),
    "pagination.take": String(PAGE_SIZE),
    "pagination.skip": String(skip),
  });
  return `${API_BASE_URL}/catalog/items/list/v2?${params.toString()}`;
}

function catalogPageUrl(pageNumber) {
  const pagePath = `${BASE_SITE_URL}${CATALOG_PATH}`;
  return pageNumber <= 1 ? pagePath : `${pagePath}?page=${pageNumber}`;
}

function cachePath(cacheKey) {
  return path.join(CACHE_DIR, cacheKey.replace(/[^a-z0-9_.-]/gi, "_"));
}

async function fetchWithRetry(url, { cacheKey, responseType, networkResponseType = responseType, errors, transformBeforeCache }) {
  await mkdir(CACHE_DIR, { recursive: true });
  const filePath = cachePath(cacheKey);

  if (existsSync(filePath)) {
    const cached = await readFile(filePath, "utf8");
    return responseType === "json" ? JSON.parse(cached) : cached;
  }

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      await politeDelay();
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          accept: responseType === "json" ? "application/json,text/plain,*/*" : "text/html,*/*",
          "user-agent":
            "pro-spokoystvie-helix-catalog-exporter/1.0 (+https://pro-spokoystvie.ru; catalog data export)",
        },
      });
      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      const rawBody = networkResponseType === "json" ? await response.json() : await response.text();
      const body = transformBeforeCache ? transformBeforeCache(rawBody) : rawBody;
      await writeFile(filePath, responseType === "json" ? JSON.stringify(body, null, 2) : String(body), "utf8");
      return body;
    } catch (error) {
      lastError = error;
      errors.push(`${url}: attempt ${attempt} failed: ${error.message}`);
      if (attempt < 3) {
        await sleep(1000 * attempt);
      }
    }
  }

  throw lastError;
}

function extractListFromTransferState(html) {
  const match = html.match(/<script id="ng-state" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) {
    throw new Error("Angular ng-state script was not found");
  }

  const state = JSON.parse(match[1]);
  const entry = Object.values(state).find(
    (value) =>
      value &&
      typeof value === "object" &&
      typeof value.u === "string" &&
      value.u.includes("/api/catalog/items/list/v2") &&
      value.b &&
      Array.isArray(value.b.catalogItems),
  );

  if (!entry) {
    throw new Error("Catalog list was not found in Angular ng-state");
  }

  return entry.b;
}

async function fetchListPage({ pageNumber, skip, preferApi, errors }) {
  const apiCacheKey = `api-items-skip-${skip}.json`;
  const transferStateCacheKey = `transfer-state-page-${pageNumber}.json`;

  if (existsSync(cachePath(apiCacheKey))) {
    const data = await fetchWithRetry(apiUrl(skip), {
      cacheKey: apiCacheKey,
      responseType: "json",
      errors,
    });
    return { data, method: "api-cache" };
  }

  if (existsSync(cachePath(transferStateCacheKey))) {
    const data = await fetchWithRetry(catalogPageUrl(pageNumber), {
      cacheKey: transferStateCacheKey,
      responseType: "json",
      networkResponseType: "text",
      errors,
      transformBeforeCache: extractListFromTransferState,
    });
    return { data, method: "html-transfer-state-cache" };
  }

  if (preferApi) {
    try {
      const data = await fetchWithRetry(apiUrl(skip), {
        cacheKey: apiCacheKey,
        responseType: "json",
        errors,
      });
      if (data && Array.isArray(data.catalogItems)) {
        return { data, method: "api" };
      }
      throw new Error("API response does not contain catalogItems");
    } catch (error) {
      errors.push(`API page ${pageNumber} skipped, falling back to HTML: ${error.message}`);
    }
  }

  const data = await fetchWithRetry(catalogPageUrl(pageNumber), {
    cacheKey: transferStateCacheKey,
    responseType: "json",
    networkResponseType: "text",
    errors,
    transformBeforeCache: extractListFromTransferState,
  });
  return { data, method: "html-transfer-state" };
}

function normalizeItem(item, scrapedAt) {
  const code = cleanText(item.hxid);
  return {
    source: SOURCE,
    city: CITY,
    category: CATEGORY,
    type: item.isComplex ? "complex" : "analysis",
    code,
    title: cleanText(item.title),
    price: typeof item.price === "number" ? item.price : null,
    biomaterial_price: null,
    turnaround_time: cleanText(item.estimateInfo) || null,
    url: code ? `${BASE_SITE_URL}/catalog/item/${encodeURIComponent(code)}` : null,
    scraped_at: scrapedAt,
  };
}

function cleanText(value) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function dedupe(records) {
  const seen = new Set();
  const unique = [];
  const duplicates = [];

  for (const record of records) {
    const key = [record.code, record.url, record.title].filter(Boolean).join("|").toLowerCase();
    if (seen.has(key)) {
      duplicates.push(record);
      continue;
    }
    seen.add(key);
    unique.push(record);
  }

  return { unique, duplicates };
}

function csvEscape(value) {
  if (value === null || value === undefined) return "";
  const stringValue = String(value);
  if (/[",\n\r]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

function toCsv(records) {
  return [
    FIELDS.join(","),
    ...records.map((record) => FIELDS.map((field) => csvEscape(record[field])).join(",")),
  ].join("\n");
}

function countFilledFields(records) {
  return Object.fromEntries(
    FIELDS.map((field) => [
      field,
      records.filter((record) => record[field] !== null && record[field] !== undefined && record[field] !== "").length,
    ]),
  );
}

function formatSample(record) {
  return `- ${record.code || "no code"} | ${record.type || ""} | ${record.title || ""} | ${record.price ?? ""} | ${
    record.turnaround_time || ""
  } | ${record.url || ""}`;
}

function reportMarkdown({ pagesProcessed, records, fieldCounts, duplicates, errors, methods, scrapedAt }) {
  const sample = records.slice(0, 10).map(formatSample).join("\n");
  const methodSummary = Object.entries(methods)
    .map(([method, count]) => `- ${method}: ${count}`)
    .join("\n");
  const fieldSummary = Object.entries(fieldCounts)
    .map(([field, count]) => `- ${field}: ${count}/${records.length}`)
    .join("\n");
  const errorSummary = errors.length ? errors.map((error) => `- ${error}`).join("\n") : "- none";

  return `# Helix Екатеринбург analyses export

Generated: ${scrapedAt}

## Source

- Catalog: ${BASE_SITE_URL}${CATALOG_PATH}
- City: ${CITY}
- Category: ${CATEGORY}
- Public structure used: Helix Angular HTML with embedded TransferState; API endpoint discovered: ${API_BASE_URL}/catalog/items/list/v2

## Summary

- Pages processed: ${pagesProcessed}
- Items collected: ${records.length}
- Duplicates found: ${duplicates.length}

## Fetch methods

${methodSummary}

## Fields filled

${fieldSummary}

## Errors/skips

${errorSummary}

## 10 sample records

${sample}

## Limitations

- Only catalog-list fields were collected: codes, titles, prices, complex/analysis type, turnaround text, and item URLs.
- biomaterial_price is null because it is not present in the category list API/HTML used for this export.
- Detailed item pages were not crawled to avoid collecting long medical descriptions, preparation text, indications, FAQ, or other copyrighted medical content.
- Prices and turnaround times are Helix Екатеринбург values at export time and should be refreshed before publishing.

## Recommendations for future /analizy page

- Treat this dataset as source-derived reference data, not as medical advice.
- Show source attribution and last update date.
- Add a refresh workflow before release, because prices and availability can change.
- Keep detailed medical preparation and interpretation content out of the page unless separately licensed or authored by the clinic.
- Consider adding clinic-specific service notes: ПРО Спокойствие accepts biomaterial and transfers it to Helix laboratory.
`;
}

async function main() {
  const scrapedAt = new Date().toISOString();
  const errors = [];
  const methods = {};
  const allRecords = [];
  let pagesProcessed = 0;
  let total = null;
  let preferApi = true;

  await mkdir(DATA_DIR, { recursive: true });
  await mkdir(CACHE_DIR, { recursive: true });

  for (let pageNumber = 1; total === null || (pageNumber - 1) * PAGE_SIZE < total; pageNumber += 1) {
    const skip = (pageNumber - 1) * PAGE_SIZE;
    const { data, method } = await fetchListPage({ pageNumber, skip, preferApi, errors });
    methods[method] = (methods[method] || 0) + 1;
    pagesProcessed += 1;

    if (method !== "api") {
      preferApi = false;
    }

    total = Number.isFinite(data.total) ? data.total : total;
    const items = Array.isArray(data.catalogItems) ? data.catalogItems : [];
    allRecords.push(...items.map((item) => normalizeItem(item, scrapedAt)));

    if (items.length === 0) {
      errors.push(`Page ${pageNumber} contained no catalogItems; stopping pagination.`);
      break;
    }
  }

  const { unique: records, duplicates } = dedupe(allRecords);
  const fieldCounts = countFilledFields(records);

  await writeFile(JSON_PATH, `${JSON.stringify(records, null, 2)}\n`, "utf8");
  await writeFile(CSV_PATH, `${toCsv(records)}\n`, "utf8");
  await writeFile(
    REPORT_PATH,
    reportMarkdown({ pagesProcessed, records, fieldCounts, duplicates, errors, methods, scrapedAt }),
    "utf8",
  );

  console.log(`Pages processed: ${pagesProcessed}`);
  console.log(`Items collected: ${records.length}`);
  console.log(`Duplicates found: ${duplicates.length}`);
  console.log(`CSV: ${CSV_PATH}`);
  console.log(`JSON: ${JSON_PATH}`);
  console.log(`Report: ${REPORT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
