import type { AxiosInstance } from "axios";
import axios from "axios";
import { MonitorManager } from "./monitors/MonitorManager";
import { MonitorGroupManager } from "./monitor-groups/MonitorGroupManager";

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
}

export default BetterUptime;
