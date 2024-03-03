type Sorry = "Sorry, you misspelled some attributes";
export class UptimeValidationError extends Error {
  public data: Sorry | Record<string, unknown>;
  constructor(data: Sorry | Record<string, string[]>) {
    const reason: string =
      data !== "Sorry, you misspelled some attributes"
        ? Object.entries(data)
            .map(([key, reason]) => `${key}: ${reason.join(" ")}`)
            .join(", ")
        : data;

    super(`Validation failed (${reason})`);

    this.name = "UptimeValidationError";
    this.data = data;
  }
}
