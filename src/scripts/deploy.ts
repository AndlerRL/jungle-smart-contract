import { api, env_config } from '~/config'

const wasm = '/deployment/jungle4andler.wasm'
const abi = '/deployment/jungle4andler.abi'

const contract_names = env_config.contract_names
// * We assume that the first on the array is the main contract name, the owner of the contract
const main_contract_name = contract_names[0];

// * Deploying the contract
(async () => {
  try {
    // Set code for the contract
    await api.transact({
      actions: [{
        account: 'eosio',
        name: 'setcode',
        authorization: contract_names.map((actor) => ({
          actor,
          permission: 'active',
        })),
        data: {
          account: main_contract_name,
          vmtype: 0,
          vmversion: 0,
          code: wasm,
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });

    // Set ABI for the contract
    await api.transact({
      actions: [{
        account: 'eosio',
        name: 'setabi',
        authorization: contract_names.map((actor) => ({
          actor,
          permission: 'active',
        })),
        data: {
          account: main_contract_name,
          abi: JSON.parse(abi),
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });
  } catch (error) {
    console.error(error);
  }
})();
