import type { AxiosInstance } from "axios";
import axios from "axios";
import { MonitorManager } from "./monitors/MonitorManager";
import { MonitorGroupManager } from "./monitor-groups/MonitorGroupManager";
import { HeartbeatManager } from "./heartbeats/HeartbeatManager";
import { CommentManager } from "./comments/CommentManager";
import { IncidentManager } from "./incidents/IncidentManager";
import { EscalationPolicyManager } from "./escalation-policies/EscalationPolicyManager";
import { OncallCalendarManager } from "./oncall-calendars/OncallCalendarManager";
import { StatusPageManager } from "./status-pages/StatusPageManager";
import { MetadataManager } from "./metadata/MetadataManager";
import { StatusPageReportManager } from "./status-page-reports/StatusPageReportManager";
import { StatusPageResourceManager } from "./status-page-resources/StatusPageResourceManager";
import { StatusPageSectionManager } from "./status-page-sections/StatusPageSectionManager";
import { StatusPageUpdateManager } from "./status-page-updates/StatusPageUpdateManager";

/**
 * Better Stack's Uptime API wrapper
 */
export class BetterUptime {
  /**
   * The axios API client
   */
  public readonly _apiClient: AxiosInstance;

  /**
   * The monitor manager
   */
  private monitorManager: MonitorManager;

  /**
   * The monitor group manager
   */
  private monitorGroupManager: MonitorGroupManager;

  /**
   * The heartbeat manager
   */
  private heartbeatManager: HeartbeatManager;

  /**
   * The heartbeat manager
   */
  private oncallCalendarManager: OncallCalendarManager;

  /**
   * The heartbeat manager
   */
  private escalationPolicyManager: EscalationPolicyManager;

  /**
   * The heartbeat manager
   */
  private incidentManager: IncidentManager;

  /**
   * The heartbeat manager
   */
  private commentManager: CommentManager;

  /**
   * The status page manager
   */
  private statusPageManager: StatusPageManager;

  /**
   * The status page manager
   */
  private statusPageReportManager: StatusPageReportManager;

  /**
   * The status page manager
   */
  private statusPageResourceManager: StatusPageResourceManager;

  /**
   * The status page manager
   */
  private statusPageSectionManager: StatusPageSectionManager;

  /**
   * The status page manager
   */
  private statusPageUpdateManager: StatusPageUpdateManager;

  /**
   * The metadata manager
   */
  private metadataManager: MetadataManager;

  /**
   * Creates new API client
   * @param apiKey Better Uptime API key
   */
  constructor(apiKey: string) {
    /**
     * Axios with bun doesn't support Brotli. See oven-sh/bun #267
     */
    const isBun = typeof Bun !== "undefined";

    this._apiClient = axios.create({
      baseURL: "https://uptime.betterstack.com/api/v2/",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${apiKey}`,
        "Accept-Encoding": `gzip, compress, deflate${!isBun ? ", br" : ""}`,
      },
    });

    this.monitorManager = new MonitorManager(this);
    this.monitorGroupManager = new MonitorGroupManager(this);
    this.heartbeatManager = new HeartbeatManager(this);
    this.oncallCalendarManager = new OncallCalendarManager(this);
    this.escalationPolicyManager = new EscalationPolicyManager(this);
    this.incidentManager = new IncidentManager(this);
    this.commentManager = new CommentManager(this);
    this.statusPageManager = new StatusPageManager(this);
    this.statusPageReportManager = new StatusPageReportManager(this);
    this.statusPageResourceManager = new StatusPageResourceManager(this);
    this.statusPageSectionManager = new StatusPageSectionManager(this);
    this.statusPageUpdateManager = new StatusPageUpdateManager(this);
    this.metadataManager = new MetadataManager(this);
  }

  /**
   * Gets the monitor manager
   */
  get monitors() {
    return this.monitorManager;
  }

  /**
   * Get the monitor group manager
   */
  get monitorGroups() {
    return this.monitorGroupManager;
  }

  /**
   * Get the heartbeat manager
   */
  get heartbeats() {
    return this.heartbeatManager;
  }

  /**
   * Get the on-call calendar manager
   */
  get oncallCalendars() {
    return this.oncallCalendarManager;
  }

  /**
   * Get the escalation policy manager
   */
  get escalationPolicies() {
    return this.escalationPolicyManager;
  }

  /**
   * Get the on-call calendar manager
   */
  get incidents() {
    return this.incidentManager;
  }

  /**
   * Get the on-call calendar manager
   */
  get comments() {
    return this.commentManager;
  }

  /**
   * Get the status page manager
   */
  get statusPages() {
    return this.statusPageManager;
  }

  /**
   * Get the status page manager
   */
  get statusPageReports() {
    return this.statusPageReportManager;
  }

  /**
   * Get the status page manager
   */
  get statusPageResources() {
    return this.statusPageResourceManager;
  }

  /**
   * Get the status page manager
   */
  get statusPageSections() {
    return this.statusPageSectionManager;
  }

  /**
   * Get the status page manager
   */
  get statusPageUpdates() {
    return this.statusPageUpdateManager;
  }

  /**
   * Get the status page manager
   */
  get metadata() {
    return this.metadataManager;
  }
}

export default BetterUptime;
