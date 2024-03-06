import { AxiosError, type AxiosInstance } from "axios";
import { UptimeValidationError } from "../errors/UptimeValidationError";
import { UptimeNotFound } from "../errors/UptimeNotFound";
import type BetterUptime from "..";

export class CommentManager {
  private apiClient: AxiosInstance;
  constructor({ _apiClient }: BetterUptime) {
    this.apiClient = _apiClient;
  }

  /**
   * List all comments under an incident.
   */
  async getAll(incident_id: string): Promise<any> {
    const res = await this.apiClient.get(`/incidents/${incident_id}/comments`);
    const { data: comments } = res.data;

    return comments;
  }

  /**
   * This will return an existing comment.
   */
  async get(incident_id: string, comment_id: string): Promise<any> {
    try {
      const res = await this.apiClient.get(
        `/incidents/${incident_id}/comments/${comment_id}`,
      );
      const { data: comment } = res.data;

      return comment;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new UptimeNotFound("Comment", comment_id);
      }

      throw e;
    }
  }

  /**
   * Returns either a newly created comment, or validation errors.
   */
  async create(incident_id: string, newComment: string): Promise<any> {
    try {
      const res = await this.apiClient.post(
        `/incidents/${incident_id}/comments`,
        { content: newComment },
      );
      const { data: comment } = res.data;

      return comment;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * This will update an existing comment. You can only update a comment created by the API.
   * @param {string} comment_id Comment ID you want to change
   */
  async update(
    incident_id: string,
    comment_id: string,
    updatedComment: string,
  ): Promise<any> {
    try {
      const res = await this.apiClient.patch(
        `/incidents/${incident_id}/comments/${comment_id}`,
        { content: updatedComment },
      );
      const { data: comment } = res.data;

      return comment;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        throw new UptimeValidationError(e.response?.data.errors ?? {});
      }

      throw e;
    }
  }

  /**
   * Permanently deletes an existing comment.
   * @param {string} comment_id Comment ID you want to remove
   * @returns {Promise<boolean>} True if success
   */
  async delete(incident_id: string, comment_id: string): Promise<boolean> {
    await this.apiClient.delete(
      `/incidents/${incident_id}/comments/${comment_id}`,
    );

    return true;
  }
}
