import { AxiosError, type AxiosInstance } from "axios";
import { UptimeValidationError } from "../errors/UptimeValidationError";
import { UptimeNotFound } from "../errors/UptimeNotFound";
import type BetterUptime from "..";

export class HeartbeatManager {
  private apiClient: AxiosInstance;
  constructor({ _apiClient }: BetterUptime) {
    this.apiClient = _apiClient;
  }

  /**
   * Returns a list of all your heartbeats.
   */
  async getAll({
    page,
    per_page,
  }: { per_page?: number; page?: number } = {}): Promise<any> {
    const res = await this.apiClient.get("/heartbeats", {
      params: {
        page,
        per_page,
      },
    });
    const { data: heartbeats } = res.data;

    return heartbeats;
  }

  /**
   * Returns a single heartbeat by ID.
   */
  async get(heartbeat_id: string): Promise<any> {
    try {
      const res = await this.apiClient.get(`/heartbeats/${heartbeat_id}`);
      const { data: heartbeat } = res.data;

      return heartbeat;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new UptimeNotFound("Heartbeat", heartbeat_id);
      }

      throw e;
    }
  }

  /**
   * Returns either a newly created heartbeat, or validation errors.
   */
  async create(newHeartbeat: any): Promise<any> {
    try {
      const res = await this.apiClient.post(`/heartbeats`, newHeartbeat);
      const { data: heartbeat } = res.data;

      return heartbeat;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Update the attributes of an existing heartbeat. Send only the parameters you wish to change
   * @param {string} heartbeat_id Heartbeat ID you want to change
   */
  async update(heartbeat_id: string, newHeartbeat: Partial<any>): Promise<any> {
    try {
      const res = await this.apiClient.patch(
        `/heartbeats/${heartbeat_id}`,
        newHeartbeat,
      );
      const { data: heartbeat } = res.data;

      return heartbeat;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Permanently deletes an existing heartbeat.
   * @param {string} heartbeat_id Heartbeat ID you want to remove
   * @returns {Promise<boolean>} True if success
   */
  async delete(heartbeat_id: string): Promise<boolean> {
    await this.apiClient.delete(`/heartbeats/${heartbeat_id}`);

    return true;
  }
}
