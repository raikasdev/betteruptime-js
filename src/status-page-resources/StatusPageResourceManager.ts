import { AxiosError, type AxiosInstance } from "axios";
import { UptimeValidationError } from "../errors/UptimeValidationError";
import { UptimeNotFound } from "../errors/UptimeNotFound";
import type BetterUptime from "..";

export class StatusPageResourceManager {
  private apiClient: AxiosInstance;
  constructor({ _apiClient }: BetterUptime) {
    this.apiClient = _apiClient;
  }

  /**
   * Returns a list of the resources of your status page.
   */
  async getAll(status_page_id: string): Promise<any> {
    const res = await this.apiClient.get(
      `/status-pages/${status_page_id}/resources`,
    );
    const { data: resources } = res.data;

    return resources;
  }

  /**
   * Returns a single status page resource.
   */
  async get(status_page_id: string, resource_id: string): Promise<any> {
    try {
      const res = await this.apiClient.get(
        `/status-pages/${status_page_id}/resources/${resource_id}`,
      );
      const { data: resource } = res.data;

      return resource;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new UptimeNotFound("Status page resource", resource_id);
      }

      throw e;
    }
  }

  /**
   * Returns a newly created status page resource.
   */
  async create(status_page_id: string, newResource: any): Promise<any> {
    try {
      const res = await this.apiClient.post(
        `/status-pages/${status_page_id}/resources`,
        newResource,
      );
      const { data: resource } = res.data;

      return resource;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Update an existing status page resource. Send only the parameters you wish to change
   * @param {string} resource_id Resource ID you want to change
   */
  async update(
    status_page_id: string,
    resource_id: string,
    updatedResource: string,
  ): Promise<any> {
    try {
      const res = await this.apiClient.patch(
        `/status-pages/${status_page_id}/resources/${resource_id}`,
        updatedResource,
      );
      const { data: resource } = res.data;

      return resource;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Permanently deletes an existing resource.
   * @param {string} resource_id Resource ID you want to remove
   * @returns {Promise<boolean>} True if success
   */
  async delete(status_page_id: string, resource_id: string): Promise<boolean> {
    await this.apiClient.delete(
      `/status-pages/${status_page_id}/resources/${resource_id}`,
    );

    return true;
  }
}
