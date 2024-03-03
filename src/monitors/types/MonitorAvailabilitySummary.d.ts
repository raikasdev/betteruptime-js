export type MonitorAvailabilitySummary = {
  /**
   * The id of the monitor. String representation of a number
   */
  id: string;
  type: "monitor_sla";

  /**
   * Attributes object - contains all the Monitor Response Time attributes.
   */
  attributes: MonitorAvailabilitySummaryAttributes;
};

export type MonitorAvailabilitySummaryAttributes = {
  /**
   * Percentage of uptime from 0-100
   */
  availability: number;

  /**
   * Total downtime in seconds
   */
  total_downtime: number;

  /**
   * Total incidents during timeframe
   */
  number_of_incidents: number;

  /**
   * Longest incident in seconds
   */
  longest_incident: number;

  /**
   * Average incident in seconds
   */
  average_incident: number;
};
