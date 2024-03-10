import { AxiosError, type AxiosInstance } from "axios";
import { UptimeValidationError } from "../errors/UptimeValidationError";
import { UptimeNotFound } from "../errors/UptimeNotFound";
import type BetterUptime from "..";

export class StatusPageSectionManager {
  private apiClient: AxiosInstance;
  constructor({ _apiClient }: BetterUptime) {
    this.apiClient = _apiClient;
  }

  /**
   * Returns a list of the sections of your status page.
   */
  async getAll(status_page_id: string): Promise<any> {
    const res = await this.apiClient.get(
      `/status-pages/${status_page_id}/sections`,
    );
    const { data: sections } = res.data;

    return sections;
  }

  /**
   * Returns a single status page section.
   */
  async get(status_page_id: string, section_id: string): Promise<any> {
    try {
      const res = await this.apiClient.get(
        `/status-pages/${status_page_id}/sections/${section_id}`,
      );
      const { data: section } = res.data;

      return section;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new UptimeNotFound("Status page section", section_id);
      }

      throw e;
    }
  }

  /**
   * Returns a newly created status page section.
   */
  async create(status_page_id: string, newSection: any): Promise<any> {
    try {
      const res = await this.apiClient.post(
        `/status-pages/${status_page_id}/sections`,
        newSection,
      );
      const { data: section } = res.data;

      return section;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Update an existing status page section. Send only the parameters you wish to change
   * @param {string} section_id Section ID you want to change
   */
  async update(
    status_page_id: string,
    section_id: string,
    updatedSection: string,
  ): Promise<any> {
    try {
      const res = await this.apiClient.patch(
        `/status-pages/${status_page_id}/sections/${section_id}`,
        updatedSection,
      );
      const { data: section } = res.data;

      return section;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Permanently deletes an existing section.
   * @param {string} section_id Section ID you want to remove
   * @returns {Promise<boolean>} True if success
   */
  async delete(status_page_id: string, section_id: string): Promise<boolean> {
    await this.apiClient.delete(
      `/status-pages/${status_page_id}/sections/${section_id}`,
    );

    return true;
  }
}
