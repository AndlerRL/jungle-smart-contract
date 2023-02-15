import { Name, Action, Contract } from 'eosjs-api'
import { AuthorityProvider } from 'eosjs/dist/eosjs-api-interfaces'
import { jungle4andler } from '~/actions'

// * We can add more contracts (actions & tables) if required
export class Jungle4 extends Contract {
  constructor(account: Name, authority_provider?: AuthorityProvider) {
    super(account, authority_provider);
  }

  // * register action
  register(account_name: Name): Action {
    return jungle4andler.createAccountWithSession(account_name);
  }
}
