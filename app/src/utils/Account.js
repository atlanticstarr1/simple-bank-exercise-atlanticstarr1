import { drizzleReactHooks } from "drizzle-react";

const useAccount = () => {
  const { drizzle } = drizzleReactHooks.useDrizzle();
  const drizzleState = drizzleReactHooks.useDrizzleState(
    drizzleState => drizzleState
  );
  const account = drizzleState.accounts[0];
  const accountBalWei = drizzleState.accountBalances[account];

  let accountBalEth =
    drizzle.web3.utils && drizzle.web3.utils.fromWei(accountBalWei, "ether");

  return { account, accountBalWei, accountBalEth };
};

export default useAccount;
