import { AxiosError, type AxiosInstance } from "axios";
import { UptimeValidationError } from "../errors/UptimeValidationError";
import { UptimeNotFound } from "../errors/UptimeNotFound";
import type BetterUptime from "..";

export class StatusPageUpdateManager {
  private apiClient: AxiosInstance;
  constructor({ _apiClient }: BetterUptime) {
    this.apiClient = _apiClient;
  }

  /**
   * Returns a list of the updates of your status page.
   */
  async getAll(status_page_id: string, status_report_id: string): Promise<any> {
    const res = await this.apiClient.get(
      `/status-pages/${status_page_id}/status-reports/${status_report_id}/status-updates`,
    );
    const { data: updates } = res.data;

    return updates;
  }

  /**
   * Returns a single status page update.
   */
  async get(
    status_page_id: string,
    status_report_id: string,
    update_id: string,
  ): Promise<any> {
    try {
      const res = await this.apiClient.get(
        `/status-pages/${status_page_id}/status-reports/${status_report_id}/status-updates/${update_id}`,
      );
      const { data: update } = res.data;

      return update;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new UptimeNotFound("Status page update", update_id);
      }

      throw e;
    }
  }

  /**
   * Returns a newly created status page update.
   */
  async create(
    status_page_id: string,
    status_report_id: string,
    newUpdate: any,
  ): Promise<any> {
    try {
      const res = await this.apiClient.post(
        `/status-pages/${status_page_id}/status-reports/${status_report_id}/status-updates`,
        newUpdate,
      );
      const { data: update } = res.data;

      return update;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Update an existing status page update. Send only the parameters you wish to change
   * @param {string} report_id Report ID you want to change
   */
  async update(
    status_page_id: string,
    status_report_id: string,
    report_id: string,
    updatedUpdate: string,
  ): Promise<any> {
    try {
      const res = await this.apiClient.patch(
        `/status-pages/${status_page_id}/status-reports/${status_report_id}/status-updates/${report_id}`,
        updatedUpdate,
      );
      const { data: update } = res.data;

      return update;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Permanently deletes an existing report.
   * @param {string} report_id Report ID you want to remove
   * @returns {Promise<boolean>} True if success
   */
  async delete(
    status_page_id: string,
    status_report_id: string,
    report_id: string,
  ): Promise<boolean> {
    await this.apiClient.delete(
      `/status-pages/${status_page_id}/status-reports/${status_report_id}/status-updates/${report_id}`,
    );

    return true;
  }
}
