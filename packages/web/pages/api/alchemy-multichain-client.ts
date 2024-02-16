import { Alchemy, AlchemySettings, Network } from 'alchemy-sdk';

/**
 * This is a wrapper around the Alchemy class that allows you to use the same
 * Alchemy object to make requests to multiple networks using different
 * settings.
 *
 * When instantiating this class, you can pass in an `AlchemyMultiChainSettings`
 * object to apply the same settings to all networks. You can also pass in an
 * optional `overrides` object to apply different settings to specific
 * networks.
 */
export class AlchemyMultichainClient {
  readonly settings: AlchemyMultichainSettings;

  readonly overrides: Partial<Record<Network, AlchemyMultichainSettings>>;

  /**
   * Lazy-loaded mapping of `Network` enum to `Alchemy` instance.
   *
   * @private
   */
  private readonly instances: Map<Network, Alchemy> = new Map();

  /**
   * @param settings The settings to use for all networks.
   * @param overrides Optional settings to use for specific networks.
   */
  constructor(
    settings: AlchemyMultichainSettings,
    overrides: Partial<Record<Network, AlchemyMultichainSettings>>
  ) {
    this.settings = settings;
    this.overrides = overrides;
  }

  /**
   * Returns an instance of `Alchemy` for the given `Network`.
   *
   * @param network
   */
  forNetwork(network: Network): Alchemy {
    return this.loadInstance(network);
  }

  /**
   * Checks if an instance of `Alchemy` exists for the given `Network`. If not,
   * it creates one and stores it in the `instances` map.
   *
   * @private
   * @param network
   */
  private loadInstance(network: Network): Alchemy {
    if (!this.instances.has(network)) {
      // Use overrides if they exist -- otherwise use the default settings.
      const alchemySettings =
        this.overrides && this.overrides[network]
          ? { ...this.overrides[network], network }
          : { ...this.settings, network };
      this.instances.set(network, new Alchemy(alchemySettings));
    }

    return this.instances.get(network) as Alchemy;
  }
}

/** AlchemySettings with the `network` param omitted in order to avoid confusion. */
export type AlchemyMultichainSettings = Omit<AlchemySettings, 'network'>;