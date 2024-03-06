import { AxiosError, type AxiosInstance } from "axios";
import { UptimeValidationError } from "../errors/UptimeValidationError";
import { UptimeNotFound } from "../errors/UptimeNotFound";
import type BetterUptime from "..";

export class EscalationPolicyManager {
  private apiClient: AxiosInstance;
  constructor({ _apiClient }: BetterUptime) {
    this.apiClient = _apiClient;
  }

  /**
   * Returns a list of all your escalation policies.
   */
  async getAll({ page }: { page?: number } = {}): Promise<any> {
    const res = await this.apiClient.get("/policies", {
      params: {
        page,
      },
    });
    const { data: escalationPolicies } = res.data;

    return escalationPolicies;
  }

  /**
   * Returns a single escalation policy by ID.
   */
  async get(policy_id: string): Promise<any> {
    try {
      const res = await this.apiClient.get(`/policies/${policy_id}`);
      const { data: escalationPolicy } = res.data;

      return escalationPolicy;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new UptimeNotFound("Escalation policy", policy_id);
      }

      throw e;
    }
  }

  /**
   * Returns either a newly created escalation policy, or validation errors.
   */
  async create(newEscalationPolicy: any): Promise<any> {
    try {
      const res = await this.apiClient.post(`/policies`, newEscalationPolicy);
      const { data: escalationPolicy } = res.data;

      return escalationPolicy;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Update the attributes of an existing escalation policy. Send only the parameters you wish to change
   * @param {string} policy_id Escalation policy ID you want to change
   */
  async update(
    policy_id: string,
    newEscalationPolicy: Partial<any>,
  ): Promise<any> {
    try {
      const res = await this.apiClient.patch(
        `/policies/${policy_id}`,
        newEscalationPolicy,
      );
      const { data: escalationPolicy } = res.data;

      return escalationPolicy;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Permanently deletes an existing escalation policy.
   * @param {string} policy_id Escalation policy ID you want to remove
   * @returns {Promise<boolean>} True if success
   */
  async delete(policy_id: string): Promise<boolean> {
    await this.apiClient.delete(`/policies/${policy_id}`);

    return true;
  }
}
