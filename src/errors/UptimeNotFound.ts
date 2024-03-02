export class UptimeNotFound extends Error {
  constructor(type: string, monitorId: string) {
    super(`${type} not found: ${monitorId}`);
    this.name = "UptimeMonitorNotFound";
  }
}
