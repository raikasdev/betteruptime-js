import { AxiosError, type AxiosInstance } from "axios";
import { UptimeValidationError } from "../errors/UptimeValidationError";
import { UptimeNotFound } from "../errors/UptimeNotFound";
import type { Monitor } from "../monitors/Monitor";
import type BetterUptime from "..";

export class MonitorGroupManager {
  private apiClient: AxiosInstance;
  private betterUptime: BetterUptime;
  constructor(betterUptime: BetterUptime) {
    this.apiClient = betterUptime._apiClient;
    this.betterUptime = betterUptime;
  }

  /**
   * Returns a list of all your monitor groups.
   */
  async getAll({ page }: { page?: number } = {}): Promise<any> {
    const res = await this.apiClient.get("/monitor-groups", {
      params: {
        page,
      },
    });
    const { data: monitorGroups } = res.data;

    return monitorGroups;
  }

  /**
   * Returns a single monitor group by ID.
   */
  async get(monitor_group_id: string): Promise<any> {
    try {
      const res = await this.apiClient.get(
        `/monitor-groups/${monitor_group_id}`,
      );
      const { data: monitor } = res.data;

      return monitor;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new UptimeNotFound("Monitor group", monitor_group_id);
      }

      throw e;
    }
  }

  /**
   * Returns monitors belonging to the given monitor group.
   * @param {string} monitor_group_id The ID of the monitor group you want to get
   * @returns {Promise<Monitor[]>} Array of monitors
   */
  async getAllMonitors(monitor_group_id: string): Promise<Monitor[]> {
    try {
      const res = await this.apiClient.get(
        `/monitor-groups/${monitor_group_id}/monitors`,
      );
      const { data: monitors } = res.data;

      return monitors.map(this.betterUptime.monitors._getMonitorObject);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new UptimeNotFound("Monitor group", monitor_group_id);
      }

      throw e;
    }
  }

  /**
   * Returns either a newly created monitor group, or validation errors.
   */
  async create(newMonitorGroup: any): Promise<any> {
    try {
      const res = await this.apiClient.post(`/monitor-groups`, newMonitorGroup);
      const { data: monitor } = res.data;

      return monitor;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Update the attributes of an existing monitor group. Send only the parameters you wish to change
   * @param {string} monitor_group_id Monitor Group ID you want to change
   */
  async update(
    monitor_group_id: string,
    newMonitorGroup: Partial<any>,
  ): Promise<Monitor> {
    try {
      const res = await this.apiClient.patch(
        `/monitor-groups/${monitor_group_id}`,
        newMonitorGroup,
      );
      const { data: monitorGroup } = res.data;

      return monitorGroup;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Permanently deletes an existing monitor group.
   * @param {string} monitor_group_id Monitor ID you want to remove
   * @returns {Promise<boolean>} True if success
   */
  async delete(monitor_group_id: string): Promise<boolean> {
    await this.apiClient.delete(`/monitor-groups/${monitor_group_id}`);

    return true;
  }
}
