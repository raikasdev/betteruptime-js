import { AxiosError, type AxiosInstance } from "axios";
import { UptimeNotFound } from "../errors/UptimeNotFound";
import type BetterUptime from "..";

export class OncallCalendarManager {
  private apiClient: AxiosInstance;
  constructor({ _apiClient }: BetterUptime) {
    this.apiClient = _apiClient;
  }

  /**
   * Returns a list of all your on-call calendars.
   */
  async getAll({
    page,
    per_page,
  }: { per_page?: number; page?: number } = {}): Promise<any> {
    const res = await this.apiClient.get("/on-calls", {
      params: {
        page,
        per_page,
      },
    });
    const { data: oncallCalendars } = res.data;

    return oncallCalendars;
  }

  /**
   * Returns a single on-call calendar by ID.
   */
  async get(
    calendar_id: string,
    { date }: { date?: string } = {},
  ): Promise<any> {
    try {
      const res = await this.apiClient.get(`/on-calls/${calendar_id}`, {
        params: {
          date,
        },
      });
      const { data: oncallCalendar } = res.data;

      return oncallCalendar;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new UptimeNotFound("On-call calendar", calendar_id);
      }

      throw e;
    }
  }
}
