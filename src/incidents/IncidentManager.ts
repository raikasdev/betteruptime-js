import { AxiosError, type AxiosInstance } from "axios";
import { UptimeValidationError } from "../errors/UptimeValidationError";
import { UptimeNotFound } from "../errors/UptimeNotFound";
import type BetterUptime from "..";

export class IncidentManager {
  private apiClient: AxiosInstance;
  constructor({ _apiClient }: BetterUptime) {
    this.apiClient = _apiClient;
  }

  /**
   * Returns a list of all your incidents.
   */
  async getAll({
    page,
    per_page,
  }: { per_page?: number; page?: number } = {}): Promise<any> {
    const res = await this.apiClient.get("/incidents", {
      params: {
        page,
        per_page,
      },
    });
    const { data: incidents } = res.data;

    return incidents;
  }

  /**
   * Returns a single incident by ID.
   */
  async get(incident_id: string): Promise<any> {
    try {
      const res = await this.apiClient.get(`/incidents/${incident_id}`);
      const { data: incident } = res.data;

      return incident;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new UptimeNotFound("Incident", incident_id);
      }

      throw e;
    }
  }

  /**
   * Returns a list of timeline items for the given incident.
   */
  async getTimeline(incident_id: string): Promise<any> {
    try {
      const res = await this.apiClient.get(
        `/incidents/${incident_id}/timeline`,
      );
      const { data: timeline } = res.data;

      return timeline;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new UptimeNotFound("Incident", incident_id);
      }

      throw e;
    }
  }

  /**
   * Returns either a newly created incident, or validation errors.
   */
  async create(newIncident: any): Promise<any> {
    try {
      const res = await this.apiClient.post(`/incidents`, newIncident);
      const { data: incident } = res.data;

      return incident;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * This will acknowledge an ongoing incident, preventing further escalations.
   */
  async acknowledge(
    incident_id: string,
    { acknowledged_by }: { acknowledged_by?: string } = {},
  ): Promise<any> {
    try {
      const res = await this.apiClient.post(
        `/incidents/${incident_id}/acknowledge`,
        {
          acknowledged_by,
        },
      );
      const { data: incident } = res.data;

      return incident;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * This will resolve an ongoing incident.
   */
  async resolve(
    incident_id: string,
    { resolved_by }: { resolved_by?: string } = {},
  ): Promise<any> {
    try {
      const res = await this.apiClient.post(
        `/incidents/${incident_id}/resolve`,
        {
          resolved_by,
        },
      );
      const { data: incident } = res.data;

      return incident;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Update the attributes of an existing incident. Send only the parameters you wish to change
   * @param {string} incident_id Incident ID you want to change
   */
  async update(incident_id: string, newIncident: Partial<any>): Promise<any> {
    try {
      const res = await this.apiClient.patch(
        `/incidents/${incident_id}`,
        newIncident,
      );
      const { data: incident } = res.data;

      return incident;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Permanently deletes an existing incident.
   * @param {string} incident_id Incident ID you want to remove
   * @returns {Promise<boolean>} True if success
   */
  async delete(incident_id: string): Promise<boolean> {
    await this.apiClient.delete(`/incidents/${incident_id}`);

    return true;
  }
}
