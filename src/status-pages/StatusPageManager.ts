import { AxiosError, type AxiosInstance } from "axios";
import { UptimeValidationError } from "../errors/UptimeValidationError";
import { UptimeNotFound } from "../errors/UptimeNotFound";
import type BetterUptime from "..";

export class StatusPageManager {
  private apiClient: AxiosInstance;
  constructor({ _apiClient }: BetterUptime) {
    this.apiClient = _apiClient;
  }

  /**
   * Returns a list of all your status pages.
   */
  async getAll({
    page,
    per_page,
  }: { per_page?: number; page?: number } = {}): Promise<any> {
    const res = await this.apiClient.get("/status-pages", {
      params: {
        page,
        per_page,
      },
    });
    const { data: statusPages } = res.data;

    return statusPages;
  }

  /**
   * Returns a single status page by ID.
   */
  async get(status_page_id: string): Promise<any> {
    try {
      const res = await this.apiClient.get(`/status-pages/${status_page_id}`);
      const { data: statusPages } = res.data;

      return statusPages;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new UptimeNotFound("Status page", status_page_id);
      }

      throw e;
    }
  }

  /**
   * Returns either a newly created status page, or validation errors.
   */
  async create(newStatusPage: any): Promise<any> {
    try {
      const res = await this.apiClient.post(`/status-pages`, newStatusPage);
      const { data: statusPage } = res.data;

      return statusPage;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Update an existing status page. Send only the parameters you wish to change
   * @param {string} status_page_id Status page ID you want to change
   */
  async update(
    status_page_id: string,
    newStatusPage: Partial<any>,
  ): Promise<any> {
    try {
      const res = await this.apiClient.patch(
        `/status-pages/${status_page_id}`,
        newStatusPage,
      );
      const { data: statusPage } = res.data;

      return statusPage;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Permanently deletes an existing status page.
   * @param {string} status_page_id Status page ID you want to remove
   * @returns {Promise<boolean>} True if success
   */
  async delete(status_page_id: string): Promise<boolean> {
    await this.apiClient.delete(`/status-pages/${status_page_id}`);

    return true;
  }
}
