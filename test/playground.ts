import BetterUptime from "../src";

const api = new BetterUptime(process.env.BETTER_UPTIME_API_KEY ?? "");

const monitors = await api.monitors.getAll();
console.log(monitors);
/*const monitor = monitors[0];

if (!monitor) {
  console.log("No monitors");
  process.exit();
}

monitor.attributes.regions = ["eu", "as", "au"];
console.log(await monitor.save());
console.log(await monitors[0].resume());

*/
