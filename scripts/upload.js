// make file reading tools available
import fs from 'node:fs/promises';

// import algoliasearch
import { algoliasearch } from 'algoliasearch';

// read products.json and convert in JS readable object
const fileContents = await fs.readFile('data/products.json', 'utf-8');

// store products in array
const products = JSON.parse(fileContents);

// find product price range from price and get its range
function getPriceRange(price) {
  if (price <= 50) {
    return '1 - 50';
  }

  if (price <= 100) {
    return '50 - 100';
  }

  if (price <= 200) {
    return '100 - 200';
  }

  if (price <= 500) {
    return '200 - 500';
  }

  if (price <= 2000) {
    return '500 - 2000';
  }

  return '> 2000';
}

// Apply discount and correct update price_range label

for (const product of products) {
  if (product.categories.includes('Cameras & Camcorders')) {
    const originalPrice = product.price;

    product.price = Math.floor(originalPrice * 0.8);
  }
  // eslint-disable-next-line camelcase
  product.price_range = getPriceRange(product.price);
}

// script to check .env config and exception handling if any missing

const appId = process.env.ALGOLIA_APP_ID;
const writeKey = process.env.ALGOLIA_WRITE_API_KEY;
const targetIndex = process.env.ALGOLIA_INDEX;

if (!appId || !writeKey || !targetIndex) {
  throw new Error('Missing Algolia application ID, write key or index name.');
}

// connect to algolia client and upload

const client = algoliasearch(appId, writeKey);

await client.saveObjects({
  indexName: targetIndex,
  objects: products,
  waitForTasks: true,
});
