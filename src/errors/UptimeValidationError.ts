export class UptimeValidationError extends Error {
  public data: Record<string, unknown>;
  constructor(data: Record<string, string[]>) {
    const reason = Object.entries(data)
      .map(([key, reason]) => `${key}: ${reason.join(" ")}`)
      .join(", ");

    super(`Validation failed (${reason})`);

    this.name = "UptimeValidationError";
    this.data = data;
  }
}
