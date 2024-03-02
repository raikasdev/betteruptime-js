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

- [x] Monitors
- [ ] Monitor groups
- [ ] Heartbeats
- [ ] Heartbeat groups

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

const monitor = await api.monitors.create({
  monitor_type: "status",
  url: "https://google.com",
});

console.log(monitor); // -> { id: '123', type: 'monitor', attributes: { ... } }

const monitors = await api.monitors.getAll();

console.log(monitors); // -> [ monitor, monitor, monitor, ... ]
```
