import { AxiosError, type AxiosInstance } from "axios";
import { UptimeValidationError } from "../errors/UptimeValidationError";
import { UptimeNotFound } from "../errors/UptimeNotFound";
import type BetterUptime from "..";

export class MetadataManager {
  private apiClient: AxiosInstance;
  constructor({ _apiClient }: BetterUptime) {
    this.apiClient = _apiClient;
  }

  /**
   * List all metadata with an option to filter metadata by owner.
   */
  async getAll({
    owner_id,
    owner_type,
    page,
  }: {
    owner_id?: number;
    owner_type?: number;
    page?: number;
  } = {}): Promise<any> {
    const res = await this.apiClient.get("/metadata", {
      params: {
        page,
        owner_id,
        owner_type,
      },
    });
    const { data: metadatas } = res.data;

    return metadatas;
  }

  /**
   * Returns a single metadata record.
   */
  async get(metadata_id: string): Promise<any> {
    try {
      const res = await this.apiClient.get(`/metadata/${metadata_id}`);
      const { data: metadatas } = res.data;

      return metadatas;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new UptimeNotFound("Metadata", metadata_id);
      }

      throw e;
    }
  }

  /**
   * This will create a new metadata.
   */
  async create(newMetadata: any): Promise<any> {
    try {
      const res = await this.apiClient.post(`/metadata`, newMetadata);
      const { data: metadata } = res.data;

      return metadata;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * This will update an existing metadata.
   * @param {string} metadata_id Metadata record ID you want to change
   */
  async update(metadata_id: string, newMetadata: Partial<any>): Promise<any> {
    try {
      const res = await this.apiClient.patch(
        `/metadata/${metadata_id}`,
        newMetadata,
      );
      const { data: metadata } = res.data;

      return metadata;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Permanently deletes a metadata record.
   * @param {string} metadata_id Metadata ID you want to remove
   * @returns {Promise<boolean>} True if success
   */
  async delete(metadata_id: string): Promise<boolean> {
    await this.apiClient.delete(`/metadata/${metadata_id}`);

    return true;
  }
}
