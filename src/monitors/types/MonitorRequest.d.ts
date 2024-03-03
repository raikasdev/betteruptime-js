// Request types
export type GetAllParams = {
  /**
   * Filter monitors by their URL property
   */
  url?: string;

  /**
   * Filter monitors by their pronounceable name property
   */
  pronounceable_name?: string;

  /**
   * Definite a number of monitors listed per one call. Maximum = 250, default = 50.
   * @default 50
   * @maximum 250
   */
  per_page?: number;

  /**
   * Page number
   */
  page?: number;
};

export type GetAvailabilitySummary = {
  /**
   * The monitor's ID you want to query
   */
  monitor_id: string;

  /**
   * Filter by start date in YYYY-MM-DD format
   * @example 2021-01-26
   */
  from?: string;

  /**
   * Filter by end date in YYYY-MM-DD format
   * @example 2021-01-27
   */
  to?: string;
};

// export type CreateMonitorBody = {};
