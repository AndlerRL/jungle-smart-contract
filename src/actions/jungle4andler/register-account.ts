// * Registering an account actions
import { createHash } from "crypto"
import { TransactResult } from "eosjs/dist/eosjs-api-interfaces";
import { ReadOnlyTransactResult } from "eosjs/dist/eosjs-rpc-interfaces";
import { api, env_config } from "~/config";
import { SignActionData, SignActionDataResponse } from "~/types";

const contract_names = env_config.contract_names
// * We assume that the first on the array is the main contract name, the owner of the contract
const main_contract_name = contract_names[0]

// Function for creating an action for the `jungle4andler` contract
export async function createAccountWithSession(account_name: string): Promise<SignActionDataResponse> {
  // Get current time and add 10 days to simulate session time
  const currentDate = new Date();
  const sessionExpiration = new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000);
  // Convert session expiration time to number of seconds since 1970
  const sessionExpirationSeconds = Math.floor(sessionExpiration.getTime() / 1000);
  // Create a unique session ID using a hash of the current date and account name
  const session = createHash("sha256")
    .update(`{created_at:${currentDate.toISOString().substring(0, 10)},account:${account_name},exp_date:${sessionExpirationSeconds}}`)
    .digest("hex");
  // Action data for the `sign` action
  const data: SignActionData = {
    account_name: account_name,
    created_at: Math.floor(currentDate.getTime() / 1000),
    session,
  };

  // Create the action and broadcast it to the network
  let session_callback: SignActionDataResponse = { session }

  try {
    const { result } = await api.transact(
      {
        actions: [
          {
            account: main_contract_name,
            name: "sign",
            authorization: contract_names.map((actor) => ({
              actor,
              permission: 'active',
            })),
            data,
          },
        ],
      },
      {
        blocksBehind: 3,
        expireSeconds: 30,
      }
    ) as ReadOnlyTransactResult;

    console.log(`Transaction ID: ${result.id}`);
  } catch (error) {
    console.log(`Error occurred: ${error}`);

    session_callback.session = null
  } finally {
    return session_callback
  }
}
