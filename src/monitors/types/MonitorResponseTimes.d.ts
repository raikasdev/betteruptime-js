export type MonitorResponseTimes = {
  /**
   * The id of the monitor. String representation of a number
   */
  id: string;
  type: "monitor_response_times";

  /**
   * Attributes object - contains all the Monitor Response Time attributes.
   */
  attributes: MonitorResponseTimesAttributes;
};

export type MonitorResponseTimesAttributes = {
  /**
   * Regions in which response times have been recorded.
   */
  regions: MRTARegion[];
};

export type MRTARegion = {
  /**
   * The region from which the request was done.
   */
  region: string;

  /**
   * Array of response times.
   */
  response_times: MRTARegionResponseTimes[];
};

export type MRTARegionResponseTimes = {
  /**
   * What time was the response received. ISO date string.
   */
  at: string;

  /**
   * Response time in seconds.
   */
  response_time: number;
};
