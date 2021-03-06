export interface Address {
    type?: string;
    address?: string;
    port?: number;
}

export interface GetInfoChain {
    chain?: string;
    network?: string;
}

export interface GetInfo {
    id?: string;
    api_version?: string;
    alias?: string;
    color?: string;
    num_peers?: number;
    num_pending_channels?: number;
    num_active_channels?: number;
    num_inactive_channels?: number;
    address?: Address[];
    binding?: Address[];
    version?: string;
    blockheight?: number;
    network?: string;
    chains?: GetInfoChain[];
    msatoshi_fees_collected?: number;
    fees_collected_msat?: string;
    lnImplementation?: string;
}

export interface SortableNode {
    alias?: string;
    lease_fee_base_msat?: number,
    lease_fee_basis?: number,
    funding_weight?: number,
    channel_fee_max_base_msat?: number,
    channel_fee_max_proportional_thousandths?: number,
}

export interface Node {
    addresses?: Address[];
    alias?: string;
    color?: string;
    features?: string;
    last_timestamp?: number;
    nodeid?: string;
    option_will_fund?: {
        lease_fee_base_msat?: number,
        lease_fee_basis?: number,
        funding_weight?: number,
        channel_fee_max_base_msat?: number,
        channel_fee_max_proportional_thousandths?: number,
        compact_lease?: string
    }
}

export interface FunderPolicy {
    summary?: string;
    policy?: string;
    policy_mod?: number;
    leases_only?: boolean;
    min_their_funding_msat?: number;
    max_their_funding_msat?: number;
    per_channel_min_msat?: number;
    per_channel_max_msat?: number;
    reserve_tank_msat?: number;
    fuzz_percent?: number;
    fund_probability?: number;
    lease_fee_base_msat?: number;
    lease_fee_basis?: number;
    funding_weight?: number;
    channel_fee_max_base_msat?: number;
    channel_fee_max_proportional_thousandths?: number;
}

export interface LiquidityStore {
    nodeInfo?: GetInfo;
    nodes?: Node[];
    funderPolicy?: FunderPolicy;
}

export const FEATURES = {
    DATA_LOSS_PROTECT: { first: 0, second: 1, value: 'option_data_loss_protect' },
    UPFRONT_SHUTDOWN_SCRIPT: { first: 4, second: 5, value: 'option_upfront_shutdown_script' }
};