# betteruptime.js

Unofficial API wrapper for BetterStack's [Uptime API](https://betterstack.com/docs/uptime/api/getting-started-with-uptime-api).

Built with TypeScript, strongly typed\* and JSDoc'd. [Documentation](https://raikasdev.github.io/betteruptime-js/)

\* = This project is still work-in-progress, and some APIs are not fully typed yet. See more in the [API Support](https://github.com/raikasdev/betteruptime-js#api-support) section.

## Installation

Install the package (`betteruptime`) with your favourite package manager:

```bash
# Bun.sh
bun install betteruptime.js
```

```bash
# NPM
npm install betteruptime.js
```

## API Support

Currently most APIs are not typed, please consult the [API documentation](https://betterstack.com/docs/uptime/api/getting-started-with-uptime-api/) for the time being.

Partly or untyped APIs are marked with a `*`.

### Monitors API

- [x] Monitor
- [x] Monitor groups\*
- [x] Heartbeats\*
- [x] Heartbeat groups\*

### On-call & Incidents API

- [x] On-call calendar\*
- [x] Escalation policies\*
- [x] Incidents\*
- [x] Comments\*

### Status pages API

- [x] Status pages\*
- [ ] Status page sections
- [ ] Status page resources
- [ ] Status page reports
- [ ] Status page updates

### Other API

- [ ] Metadata

### Integrations API (low priority)

- [ ] Incoming webhooks
- [ ] Email integrations
- [ ] New Relic
- [ ] Datadog
- [ ] AWS CloudWatch
- [ ] Azure
- [ ] Google Monitoring
- [ ] Grafana
- [ ] Prometheus
- [ ] Splunk On-Call integrations
- [ ] PagerDuty

## Getting started

```typescript
const uptime = new BetterUptime("your-api-key");

// Creates a new "status" (2XX status code) monitor for google.com
const monitor = await api.monitors.create({
  monitor_type: "status",
  url: "https://google.com",
});

console.log(monitor); // -> Monitor { id: '123', type: 'monitor', attributes: { ... } }

// Pause the google.com monitor
await monitor.pause();

// Only ping from EU
monitor.attributes.regions = ["eu"];
await monitor.save(); // Saves the changes made to attributes manually

// Get all monitors
const monitors = await api.monitors.getAll();

console.log(monitors); // -> [ Monitor { ... }, Monitor { ... }, Monitor { ... }, ... ]
```
