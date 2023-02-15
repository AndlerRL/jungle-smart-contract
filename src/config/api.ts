import { Api, JsonRpc } from 'eosjs';
import fetch from 'node-fetch'
import { env_config } from '~/config';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

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

// ? Consider @greymass/eosio
// import { Bytes } from '@greymass/eosio';
// import { FetchProvider } from '@greymass/eosio';
// import { API, APIClient, KeyType, Signature } from '@greymass/eosio';

// const provider = new FetchProvider(env_config.contract_rpc, { fetch })
// const signatureProvider = new Signature(KeyType.K1, Bytes.from(env_config.contract_signatures[0]))

// export const api = new APIClient({
//   provider,
// }).v1.chain;
