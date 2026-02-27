// scripts/sync-env.js
// Read local .env and push all variables to Cloudflare Pages via the REST API.
// Requires CF_ACCOUNT_ID, CF_API_TOKEN, CF_PAGES_PROJECT (name) in environment.
// Run this before deploy or whenever you update .env.

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// load .env file
const envPath = path.resolve(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.error('.env file not found');
  process.exit(1);
}
const local = dotenv.parse(fs.readFileSync(envPath));

// gather required parameters
const accountId = process.env.CF_ACCOUNT_ID;
const apiToken = process.env.CF_API_TOKEN;
const projectName = process.env.CF_PAGES_PROJECT;

if (!accountId || !apiToken || !projectName) {
  console.error('Missing CF_ACCOUNT_ID, CF_API_TOKEN or CF_PAGES_PROJECT env vars');
  process.exit(1);
}

// build request body
const variables = Object.entries(local).map(([key, value]) => ({
  name: key,
  value: value,
  type: key.startsWith('PUBLIC_') ? 'plain_text' : 'secret_text',
}));

const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/environment/variables`;

(async () => {
  const resp = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items: variables }),
  });
  const data = await resp.json();
  if (!resp.ok) {
    console.error('Failed to sync env vars:', data);
    process.exit(1);
  }
  console.log('Environment variables synced successfully');
})();
