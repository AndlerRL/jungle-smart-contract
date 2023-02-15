# jungle-smart-contract

A test Antelope Smart Contract made with Typescript, which compiles to C++ for the blockchain.

### TODO: To add description :wink

Action within the example:

```typescript
// Execute action to update account table
function async createNewAccount(newAccount) {
  let results = { data: null, error: null }

  try {
    results.data = await api.transact({
      actions: [{
        // contract_name
        account: 'jungle4andler',
        // action_name
        name: 'sign',
        authorization: contract_names.map((actor) => ({
          actor,
          permission: 'active',
        })),
        data: {
          account_name: 'newaccount1',
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });
  } catch (error) {
    console.error('[Action Error]', error)
    results.error = error,message;
  } finally {
    if (results.error) throw new Error(results.error)

    return results.data
  }
}
```
