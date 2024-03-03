import { updatedDiff } from "deep-object-diff";
import type { MonitorManager } from "./MonitorManager";
import type {
  BasicMonitor,
  MonitorAttributes,
  MonitorRelationships,
} from "./types";

export class Monitor implements BasicMonitor {
  public readonly id: string;
  public attributes: MonitorAttributes;
  public type = "monitor" as const;
  public readonly relationships: MonitorRelationships | undefined;

  private monitorManager: MonitorManager;
  private originalAttributes: MonitorAttributes;

  constructor(
    monitorManager: MonitorManager,
    id: string,
    attributes: MonitorAttributes,
    relationships?: MonitorRelationships,
  ) {
    this.monitorManager = monitorManager;
    this.id = id;
    this.attributes = attributes;
    this.originalAttributes = JSON.parse(JSON.stringify(attributes)); // Don't reference!
    this.relationships = relationships;
  }

  /**
   * Pauses the monitoring
   * @returns {Promise<boolean>}
   */
  public async pause() {
    await this.changePausedState(true);
    return true;
  }

  /**
   * Resumes the monitoring
   * @returns {Promise<boolean>}
   */
  public async resume() {
    await this.changePausedState(false);
    return true;
  }

  private async changePausedState(paused: boolean) {
    await this.monitorManager.update(this.id, { paused });

    const difference = updatedDiff(this.originalAttributes, this.attributes);

    // There isn't a paused variable in attributes (state === 'paused'), so let's just reload data from DB.
    await this.load();

    // Let's not overwrite changes
    for (const [k, v] of Object.entries(difference)) {
      (this.attributes as any)[k] = v;
    }
  }

  /**
   * Moves the monitor to a monitor group
   * @param {string | null} group Monitor group ID, or null to remove from group.
   * @returns {Promise<boolean>}
   */
  public async moveToGroup(group: null | string /* | MonitorGroup */) {
    this.attributes.monitor_group_id = group;
    return await this.save();
  }

  /**
   * Loads monitor's attributes fresh from the API
   * @returns {Promise<boolean>} Was the operation succesful?
   */
  public async load(): Promise<boolean> {
    const res = await this.monitorManager.get(this.id);

    // Get newest values from Better Stack
    this.attributes = res.attributes;
    this.originalAttributes = JSON.parse(JSON.stringify(res.attributes));

    return true;
  }

  /**
   * Saves changes to the API
   * @returns {Promise<boolean>} Was the operation succesful?
   */
  public async save(): Promise<boolean> {
    const res = await this.monitorManager.update(
      this.id,
      updatedDiff(this.originalAttributes, this.attributes),
    );

    // Get newest values from Better Stack
    this.attributes = res.attributes;
    this.originalAttributes = JSON.parse(JSON.stringify(res.attributes));

    return true;
  }
}
