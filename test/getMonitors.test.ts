import { test, expect } from "bun:test";

import BetterUptime from "../src";

if (!process.env.BETTER_UPTIME_API_KEY) {
  console.error("No BETTER_UPTIME_API_KEY set.");
  process.exit();
}

const api = new BetterUptime(process.env.BETTER_UPTIME_API_KEY);

test("All monitors is an array", async () => {
  const value = await api.monitors.getAll();
  expect(value).toBeArray();
});
