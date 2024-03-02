export type Monitor = {
  /**
   * The id of the monitor. String representation of a number
   */
  id: string;
  type: "monitor";

  /**
   * Attributes object - contains all the Monitor attributes.
   */
  attributes: MonitorAttributes;

  /**
   * Relationships to other objects.
   */
  relationships: {
    /**
     * Relationship to escalation policy
     */
    policy: {
      /**
       * ID of the escalation policy. Might also be the escalation policy object?
       */
      data: string | null;
    };
  };
};

/*
 Developers note: This type has all the possible values as optional values ?: <type>, and then
 by type in type <monitor_type>Attributes to get strong type for those types, if the type is checked 
*/

export type MonitorAttributes = {
  /**
   * The URL of your website or the host you want to ping
   * @see monitor_type
   */
  url: string;

  /**
   * The pronounceable name of the monitor. We will use this when we call you, so no tongue-twisters, please. :)
   */
  pronounceable_name: string;

  /**
   * The Id of the monitor group that your monitor is part of. Set this attribute if you want to add this monitor to a monitor group.
   */
  monitor_group_id: string | null;

  /**
   * When was the last check performed. ISO date string.
   */
  last_checked_at: string | null;

  /**
   * The status of the monitor.
   * @type {MonitorStatus}
   */
  status: MonitorStatus;

  /**
   * Should we verify SSL certificate validity?
   */
  verify_ssl: boolean;

  /**
   * How often should we check your website? In seconds.
   */
  check_frequency: number;

  /**
   * Should we call the on-call person?
   */
  call: boolean;

  /**
   * Should we email the on-call person?
   */
  email: boolean;

  /**
   * Should we send an SMS to the on-call person?
   */
  sms: boolean;

  /**
   * Should we send an a push notification to the on-call person?
   */
  push: boolean;

  /**
   * How long to wait before escalating the incident alert to the team. Leave blank to disable escalating to the entire team. In seconds.
   */
  team_wait: number | null;

  /**
   * HTTP Method used to make a request.
   */
  http_method: HTTPMethod;

  /**
   * How long to wait before timing out the request? In seconds.
   */
  request_timeout: number;

  /**
   * How long to wait before timing out the request? In seconds.
   */
  recovery_period: number;

  /**
   * An optional array of custom HTTP headers for the request.
   */
  request_headers: ResponseMonitorHTTPHeader[];

  /**
   * Request body for POST, PUT, PATCH requests.
   */
  request_body: string | null;

  /**
   * When was the monitor paused. ISO date string.
   */
  paused_at: string | null;

  /**
   * When was the monitor created. ISO date string.
   */
  created_at: string;

  /**
   * When was the monitor last updated. ISO date string.
   */
  updated_at: string;

  /**
   * How many days in advance of your SSL certificate expiration date you want to be alerted. "Don't check for SSL expiration" = null
   */
  ssl_expiration: null | 1 | 2 | 3 | 7 | 14 | 30 | 60;

  /**
   * How many days in advance of your domain's expiration date you want to be alerted. = null
   */
  domain_expiration: null | 1 | 2 | 3 | 7 | 14 | 30 | 60;

  /**
   * An array of regions to set. Options: us, eu, as, au
   * @param {string[]} regions Regions to allow
   */
  regions: string[] | null;

  /**
   * How long should we wait after observing a failure before we start a new incident? In seconds.
   */
  confirmation_period: number;

  // Properties only in the create documentation

  /**
   * Should we automatically follow redirects when sending the HTTP request?
   */
  follow_redirects: boolean;

  /**
   * Escalation policy ID.
   */
  policy_id: string | null;

  /**
   * Do you want to keep cookies when redirecting?
   */
  remember_cookies: boolean;

  /**
   * For Playwright monitors, the JavaScript source code of the scenario.
   */
  playwright_script: string | null;

  /**
   * Start of the maintenance window each day. We won't check your website during this window. Example: '01:00:00'
   */
  maintenance_from: string | null;

  /**
   * End of the maintenance window each day. Example: '03:00:00'
   */
  maintenance_to: string | null;

  /**
   * The timezone to use for the maintenance window each day. Defaults to UTC. The accepted values can be found in the Rails TimeZone documentation.
   * @see {@link https://api.rubyonrails.org/classes/ActiveSupport/TimeZone.html}
   */
  maintenance_timezone: string | null;

  // Undocumented properties

  /**
   * HTTP Basic Auth username.
   */
  auth_username: string | null;

  /**
   * HTTP Basic Auth password.
   */
  auth_password: string | null;

  // Monitor type specific optionals
  /**
   * An array of status codes you expect to receive from your website.
   */
  expected_status_codes: number[];

  /**
   * We will create a new incident if this keyword is (missing) on your page.
   */
  required_keyword: string | null;

  /**
   * The port to ping.
   */
  port: string | null;
} & (
  | BasicMonitorAttributes
  | ExpectedStatusCodeAttributes
  | KeywordMonitorAttributes
  | KeywordAbsenceMonitorAttributes
  | TCPMonitorAttributes
  | UDPMonitorAttributes
  | SMTPMonitorAttributes
  | POPMonitorAttributes
  | IMAPMonitorAttributes
);

// ts-to-zod doesn't support Lowercase<> :(
export type HTTPMethod =
  | ("GET" | "HEAD" | "POST" | "PUT" | "PATCH")
  | ("get" | "head" | "post" | "put" | "patch");

export type MonitorStatus =
  | "paused" // The monitor was paused
  | "pending" // The monitor was just created and it's waiting for the first check
  | "maintenance" // THe monitor is paused becuase it's currently in it's maintenance period
  | "up" // Checks are passing
  | "validating" // The service seems to be back up, but the recovery_period since the last failed check still hasn't passed
  | "down"; // Checks are failing

export type MonitorHTTPHeader = {
  /**
   * The name of the header.
   * @example Application-type
   */
  name: string;

  /**
   * The value of the header.
   * @example application/json
   */
  value: string;
};

export type ResponseMonitorHTTPHeader = MonitorHTTPHeader & {
  /**
   * The Id of the header. Do not set this parameter; it is generated automatically.
   */
  readonly id: string;
};

export type BasicMonitorAttributes = {
  /**
   * Type of the monitor.
   */
  monitor_type: "status" | "ping";
};

export type ExpectedStatusCodeAttributes = {
  /**
   * Type of the monitor.
   */
  monitor_type: "expected_status_code";

  /**
   * An array of status codes you expect to receive from your website.
   */
  expected_status_codes: number[];
};

export type KeywordMonitorAttributes = {
  /**
   * Type of the monitor.
   */
  monitor_type: "keyword";

  /**
   * We will create a new incident if this keyword is missing on your page.
   */
  required_keyword: string;
};

export type KeywordAbsenceMonitorAttributes = {
  /**
   * Type of the monitor.
   */
  monitor_type: "keyword_absence";

  /**
   * We will create a new incident if this keyword is on your page.
   */
  required_keyword: string;
};

export type TCPMonitorAttributes = {
  /**
   * Type of the monitor.
   */
  monitor_type: "tcp";

  /**
   * The port to ping.
   */
  port: string;
};

export type UDPMonitorAttributes = {
  /**
   * Type of the monitor.
   */
  monitor_type: "udp";

  /**
   * The port to ping.
   */
  port: string;

  /**
   * We will create a new incident if this keyword is (missing) on your page.
   */
  required_keyword: string;
};

export type SMTPPort = "25" | "465" | "587";
export type SMTPMonitorAttributes = {
  /**
   * Type of the monitor.
   */
  monitor_type: "smtp";

  /**
   * The port to ping.
   */
  port:
    | SMTPPort
    | `${SMTPPort},${SMTPPort}`
    | `${SMTPPort},${SMTPPort},${SMTPPort}`;
};

export type POPPort = "110" | "995";
export type POPMonitorAttributes = {
  /**
   * Type of the monitor.
   */
  monitor_type: "pop";

  /**
   * The port to ping.
   */
  port: POPPort | `${POPPort},${POPPort}`;
};

export type IMAPPort = "143" | "993";
export type IMAPMonitorAttributes = {
  /**
   * Type of the monitor.
   */
  monitor_type: "imap";

  /**
   * The port to ping.
   */
  port: IMAPPort | `${IMAPPort},${IMAPPort}`;
};

export type * from "./CreateMonitor";
export type * from "./MonitorAvailabilitySummary";
export type * from "./MonitorRequest";
export type * from "./MonitorResponseTimes";
