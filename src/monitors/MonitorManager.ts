import { AxiosError, type AxiosInstance } from "axios";
import { Monitor } from "./Monitor";
import type {
  GetAllParams,
  GetAvailabilitySummary,
  BasicMonitor,
  MonitorResponseTimes,
  MonitorAvailabilitySummary,
  NewMonitor,
} from "./types";
import { UptimeValidationError, UptimeNotFound } from "../errors";
import type BetterUptime from "..";

export class MonitorManager {
  private apiClient: AxiosInstance;
  constructor({ _apiClient }: BetterUptime) {
    this.apiClient = _apiClient;
  }

  /**
   * Returns list of all your monitors.
   * @param {GetAllParams} query
   * @returns {Promise<Monitor[]>} Array of monitors
   */
  async getAll({
    per_page,
    pronounceable_name,
    url,
    page,
  }: GetAllParams = {}): Promise<Monitor[]> {
    const res = await this.apiClient.get("/monitors", {
      params: {
        per_page,
        pronounceable_name,
        url: url,
        page,
      },
    });
    const { data: monitors } = res.data;

    return monitors.map(this._getMonitorObject);
  }

  /**
   * Returns a single monitor.
   * @param {string} monitor_id The ID of the monitor you want to get
   * @returns {Promise<Monitor>} Single monitor
   */
  async get(monitor_id: string): Promise<Monitor> {
    try {
      const res = await this.apiClient.get(`/monitors/${monitor_id}`);
      const { data: monitor } = res.data;

      return this._getMonitorObject(monitor);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new UptimeNotFound("Monitor", monitor_id);
      }

      throw e;
    }
  }

  /**
   * Returns the response times for a monitor (last 24h).
   * @param {string} monitor_id The ID of the monitor you want to get
   * @returns {Promise<MonitorResponseTimes>} Single monitor response times object
   */
  async getResponseTimes(monitor_id: string): Promise<MonitorResponseTimes> {
    try {
      const res = await this.apiClient.get(
        `/monitors/${monitor_id}/response-times`,
      );
      const { data: monitorResponseTimes } = res.data;

      return monitorResponseTimes;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new UptimeNotFound("Monitor", monitor_id);
      }

      throw e;
    }
  }

  /**
   * Returns availability summary for a specific monitor.
   * @param {GetAvailabilitySummary} query
   * @returns {Promise<MonitorAvailabilitySummary>} Single monitor response times object
   */
  async getAvailabilitySummary({
    monitor_id,
    from,
    to,
  }: GetAvailabilitySummary): Promise<MonitorAvailabilitySummary> {
    try {
      const res = await this.apiClient.get(`/monitors/${monitor_id}/sla`, {
        params: {
          from,
          to,
        },
      });
      const { data: monitorAvailabilitySummary } = res.data;

      return monitorAvailabilitySummary;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new UptimeNotFound("Monitor", monitor_id);
      }

      throw e;
    }
  }

  /**
   * Returns a newly created monitor or validation errors.
   * @param {NewMonitor} newMonitor The new monitor object
   * @returns {Promise<Monitor>} The created object
   */
  async create(newMonitor: NewMonitor): Promise<Monitor> {
    try {
      const res = await this.apiClient.post(`/monitors`, newMonitor);
      const { data: monitor } = res.data;

      return this._getMonitorObject(monitor);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Update existing monitor configuration. Send only the parameters you wish to change
   * @param {string} monitor_id Monitor ID you want to change
   * @param {Partial<NewMonitor>} newMonitor Object with all changed properties
   * @returns {Promise<Monitor>} The updated monitor
   */
  async update(
    monitor_id: string,
    newMonitor: Partial<NewMonitor>,
  ): Promise<Monitor> {
    try {
      const res = await this.apiClient.patch(
        `/monitors/${monitor_id}`,
        newMonitor,
      );
      const { data: monitor } = res.data;

      return this._getMonitorObject(monitor);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Permanently deletes an existing monitor.
   * @param {string} monitor_id Monitor ID you want to remove
   * @returns {Promise<boolean>} True if success
   */
  async delete(monitor_id: string): Promise<boolean> {
    await this.apiClient.delete(`/monitors/${monitor_id}`);

    return true;
  }

  public _getMonitorObject(monitor: BasicMonitor) {
    return new Monitor(
      this,
      monitor.id,
      monitor.attributes,
      monitor.relationships,
    );
  }
}
