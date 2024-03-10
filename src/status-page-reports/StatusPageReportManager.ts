import { AxiosError, type AxiosInstance } from "axios";
import { UptimeValidationError } from "../errors/UptimeValidationError";
import { UptimeNotFound } from "../errors/UptimeNotFound";
import type BetterUptime from "..";

export class StatusPageReportManager {
  private apiClient: AxiosInstance;
  constructor({ _apiClient }: BetterUptime) {
    this.apiClient = _apiClient;
  }

  /**
   * Returns a list of the reports of your status page.
   */
  async getAll(status_page_id: string): Promise<any> {
    const res = await this.apiClient.get(
      `/status-pages/${status_page_id}/status-reports`,
    );
    const { data: reports } = res.data;

    return reports;
  }

  /**
   * Returns a single status page report.
   */
  async get(status_page_id: string, report_id: string): Promise<any> {
    try {
      const res = await this.apiClient.get(
        `/status-pages/${status_page_id}/status-reports/${report_id}`,
      );
      const { data: report } = res.data;

      return report;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new UptimeNotFound("Status page report", report_id);
      }

      throw e;
    }
  }

  /**
   * Returns a newly created status page report.
   */
  async create(status_page_id: string, newReport: any): Promise<any> {
    try {
      const res = await this.apiClient.post(
        `/status-pages/${status_page_id}/status-reports`,
        newReport,
      );
      const { data: report } = res.data;

      return report;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Update an existing status page report. Send only the parameters you wish to change
   * @param {string} report_id Report ID you want to change
   */
  async update(
    status_page_id: string,
    report_id: string,
    updatedReport: string,
  ): Promise<any> {
    try {
      const res = await this.apiClient.patch(
        `/status-pages/${status_page_id}/status-reports/${report_id}`,
        updatedReport,
      );
      const { data: report } = res.data;

      return report;
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
  async delete(status_page_id: string, report_id: string): Promise<boolean> {
    await this.apiClient.delete(
      `/status-pages/${status_page_id}/status-reports/${report_id}`,
    );

    return true;
  }
}
