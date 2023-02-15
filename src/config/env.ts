import env from 'env-var'
import { EnvConfig } from '~/types'

export const env_config: EnvConfig = {
  contract_rpc: env.get('CONTRACT_RPC').asString() || 'http://127.0.0.1:8545',
  contract_chain_id: env.get('CHAIN_ID').asString() || '1',
  contract_names: env.get('CONTRACT_NAMES').asArray() as string[],
  contract_signatures: env.get('CONTRACT_SIGNATURES').asArray() as string[],
}