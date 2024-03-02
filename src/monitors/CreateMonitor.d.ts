import type {
  BasicMonitorAttributes,
  ExpectedStatusCodeAttributes,
  IMAPMonitorAttributes,
  KeywordAbsenceMonitorAttributes,
  KeywordMonitorAttributes,
  POPMonitorAttributes,
  SMTPMonitorAttributes,
  TCPMonitorAttributes,
  UDPMonitorAttributes,
} from "./Monitor";

export type NewMonitor = {
  /**
   * The URL of your website or the host you want to ping
   * @see monitor_type
   */
  url: string;

  /**
   * The pronounceable name of the monitor. We will use this when we call you, so no tongue-twisters, please. :)
   */
  pronounceable_name?: string;

  /**
   * The Id of the monitor group that your monitor is part of. Set this attribute if you want to add this monitor to a monitor group.
   */
  monitor_group_id?: string;

  /**
   * When was the last check performed. ISO date string.
   */
  last_checked_at?: string;

  /**
   * The status of the monitor.
   * @type {MonitorStatus}
   */
  status?: MonitorStatus;

  /**
   * Should we verify SSL certificate validity?
   */
  verify_ssl?: boolean;

  /**
   * How often should we check your website? In seconds.
   */
  check_frequency?: number;

  /**
   * Should we call the on-call person?
   */
  call?: boolean;

  /**
   * Should we email the on-call person?
   */
  email?: boolean;

  /**
   * Should we send an SMS to the on-call person?
   */
  sms?: boolean;

  /**
   * Should we send an a push notification to the on-call person?
   */
  push?: boolean;

  /**
   * How long to wait before escalating the incident alert to the team. Leave blank to disable escalating to the entire team. In seconds.
   */
  team_wait?: number;

  /**
   * HTTP Method used to make a request.
   */
  http_method?: HTTPMethod;

  /**
   * How long to wait before timing out the request? In seconds.
   */
  request_timeout?: number;

  /**
   * How long to wait before timing out the request? In seconds.
   */
  recovery_period?: number;

  /**
   * An optional array of custom HTTP headers for the request.
   */
  request_headers?: ResponseMonitorHTTPHeader[];

  /**
   * Request body for POST, PUT, PATCH requests.
   */
  request_body?: string;

  /**
   * When was the monitor paused. ISO date string.
   */
  paused_at?: string;

  /**
   * When was the monitor created. ISO date string.
   */
  created_at?: string;

  /**
   * When was the monitor last updated. ISO date string.
   */
  updated_at?: string;

  /**
   * How many days in advance of your SSL certificate expiration date you want to be alerted. "Don't check for SSL expiration" = null
   */
  ssl_expiration?: 1 | 2 | 3 | 7 | 14 | 30 | 60;

  /**
   * How many days in advance of your domain's expiration date you want to be alerted. = null
   */
  domain_expiration?: 1 | 2 | 3 | 7 | 14 | 30 | 60;

  /**
   * An array of regions to set. Options: us, eu, as, au
   * @param {string[]} regions Regions to allow
   */
  regions?: string[];

  /**
   * How long should we wait after observing a failure before we start a new incident? In seconds.
   */
  confirmation_period?: number;

  // Properties only in the create documentation

  /**
   * Should we automatically follow redirects when sending the HTTP request?
   */
  follow_redirects?: boolean;

  /**
   * Escalation policy ID.
   */
  policy_id?: string;

  /**
   * Do you want to keep cookies when redirecting?
   */
  remember_cookies?: boolean;

  /**
   * For Playwright monitors, the JavaScript source code of the scenario.
   */
  playwright_script?: string;

  /**
   * Start of the maintenance window each day. We won't check your website during this window.
   * @example "01:00:00"
   */
  maintenance_from?: string;

  /**
   * End of the maintenance window each day.
   * @example "03:00:00"
   */
  maintenance_to?: string;

  /**
   * The timezone to use for the maintenance window each day. Defaults to UTC. The accepted values can be found in the Rails TimeZone documentation.
   * @see {@link https://api.rubyonrails.org/classes/ActiveSupport/TimeZone.html}
   */
  maintenance_timezone?: string;

  // Undocumented properties

  /**
   * HTTP Basic Auth username.
   */
  auth_username?: string;

  /**
   * HTTP Basic Auth password.
   */
  auth_password?: string;
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
