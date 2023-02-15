import { JsonRpc, Api } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
import fetch from 'node-fetch'
import { env_config } from '~/config';

// TODO: Custom nodeos RPC
const rpc = new JsonRpc(env_config.contract_rpc, { fetch });
const signatureProvider = new JsSignatureProvider(env_config.contract_signatures)

export const api = new Api({
  rpc,
  signatureProvider,
  chainId: env_config.contract_chain_id,
  textDecoder: new TextDecoder('andler-jungle-smart-contract', { stream: true }),
  textEncoder: new TextEncoder()
});
