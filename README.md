# betteruptime.js

Unofficial API wrapper for BetterStack's [Uptime API](https://betterstack.com/docs/uptime/api/getting-started-with-uptime-api).

Built with TypeScript, strongly typed and JSDoc'd. [Documentation](https://raikasdev.github.io/betteruptime-js/)

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

## Support

\* = implemented, no typings

### Monitors API

- [x] Monitors
- [ ] Monitor groups\*
- [ ] Heartbeats
- [ ] Heartbeat groups

### On-call & Incidents API

- [ ] On-call calendar
- [ ] Escalation policies
- [ ] Incidents
- [ ] Comments

### Status pages API

- [ ] Status pages
- [ ] Status page sections
- [ ] Status page resources
- [ ] Status page reports
- [ ] Status page updates

### Integrations API

- [ ] New Relic
- [ ] Datadog
- [ ] AWS CloudWatch
- [ ] Azure
- [ ] Google Monitoring
- [ ] Grafana
- [ ] Prometheus
- [ ] Email integrations
- [ ] Incoming webhooks
- [ ] Splunk On-Call integrations
- [ ] PagerDuty

### Other API

- [ ] Metadata

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
