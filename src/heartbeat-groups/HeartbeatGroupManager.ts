import { AxiosError, type AxiosInstance } from "axios";
import { UptimeValidationError } from "../errors/UptimeValidationError";
import { UptimeNotFound } from "../errors/UptimeNotFound";
import type BetterUptime from "..";

export class HeartbeatGroupManager {
  private apiClient: AxiosInstance;
  constructor({ _apiClient }: BetterUptime) {
    this.apiClient = _apiClient;
  }

  /**
   * Returns a list of all your heartbeat groups.
   */
  async getAll({ page }: { page?: number } = {}): Promise<any> {
    const res = await this.apiClient.get("/heartbeat-groups", {
      params: {
        page,
      },
    });
    const { data: heartbeatGroups } = res.data;

    return heartbeatGroups;
  }

  /**
   * Returns a single heartbeat group by ID.
   */
  async get(heartbeat_group_id: string): Promise<any> {
    try {
      const res = await this.apiClient.get(
        `/heartbeat-groups/${heartbeat_group_id}`,
      );
      const { data: heartbeatGroup } = res.data;

      return heartbeatGroup;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new UptimeNotFound("Heartbeat group", heartbeat_group_id);
      }

      throw e;
    }
  }

  /**
   * Returns either a newly created heartbeat group, or validation errors.
   */
  async create(newHeartbeatGroup: any): Promise<any> {
    try {
      const res = await this.apiClient.post(
        `/heartbeat-groups`,
        newHeartbeatGroup,
      );
      const { data: heartbeatGroup } = res.data;

      return heartbeatGroup;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Update the attributes of an existing heartbeat group. Send only the parameters you wish to change
   * @param {string} heartbeat_group_id Heartbeat Group ID you want to change
   */
  async update(
    heartbeat_group_id: string,
    newHeartbeatGroup: Partial<any>,
  ): Promise<any> {
    try {
      const res = await this.apiClient.patch(
        `/heartbeat-groups/${heartbeat_group_id}`,
        newHeartbeatGroup,
      );
      const { data: heartbeatGroup } = res.data;

      return heartbeatGroup;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Permanently deletes an existing heartbeat group.
   * @param {string} heartbeat_group_id Heartbeat group ID you want to remove
   * @returns {Promise<boolean>} True if success
   */
  async delete(heartbeat_group_id: string): Promise<boolean> {
    await this.apiClient.delete(`/heartbeat-groups/${heartbeat_group_id}`);

    return true;
  }
}
