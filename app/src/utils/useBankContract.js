import { useMemo } from "react";
import { drizzleReactHooks } from "drizzle-react";

const useBankContract = () => {
  const {
    drizzle,
    useCacheSend,
    useCacheCall,
    useCacheEvents
  } = drizzleReactHooks.useDrizzle();

  const drizzleState = drizzleReactHooks.useDrizzleState(
    drizzleState => drizzleState
  );

  const web3 = drizzle && drizzle.web3;
  const account = drizzleState.accounts[0];
  const contracts = drizzleState.contracts;
  const transactions = drizzleState.transactions;

  let accountBalEth = 0;
  let bankBalanceEth = 0;
  let minBalanceEth = 0;
  let contractBalanceEth = 0;
  let oneUsdEth = 0;
  const accountBalance = drizzleState.accountBalances[account];
  accountBalEth =
    accountBalance && parseFloat(accountBalance / 1e18).toFixed(18);
  const bankBalance = useCacheCall("SimpleBank", "getBalance", {
    from: account
  });
  bankBalanceEth = bankBalance && parseFloat(bankBalance / 1e18).toFixed(18);

  // enroll
  const isEnrolled = useCacheCall("SimpleBank", "enrolled", account);
  const enrollAccount = useCacheSend("SimpleBank", "enroll");

  const deposit = useCacheSend("SimpleBank", "deposit");
  const withdraw = useCacheSend("SimpleBank", "withdraw");
  const closeAccount = useCacheSend("SimpleBank", "closeAccount");

  /* ADMIN */
  const isOwner = useCacheCall("SimpleBank", "isOwner", { from: account });

  // get bank accounts
  const bankAccounts = useCacheCall("SimpleBank", "getAccounts");

  // contract balance
  const contractBalance = useCacheCall("SimpleBank", "getContractBalance", {
    from: account
  });
  contractBalanceEth =
    contractBalance && parseFloat(contractBalance / 1e18).toFixed(4);

  // bank interest rate
  const interestRate = useCacheCall("SimpleBank", "interestRate");
  const setInterestRate = useCacheSend("SimpleBank", "setInterestRate");
  const payInterest = useCacheSend("SimpleBank", "payInterest");

  // bank minumum balance per 10 cents usd
  const minBalance = useCacheCall("SimpleBank", "minBalanceEth");
  minBalanceEth = parseFloat(minBalance / 1e18).toFixed(5);
  // 10 cents USD in ETH
  const tenCents = useCacheCall("SimpleBank", "tenCents");
  // 1 USD in ETH
  oneUsdEth = tenCents && parseFloat((tenCents * 10) / 1e18).toFixed(5);

  const minBalanceUsd = useCacheCall("SimpleBank", "minBalanceUsd");
  const setMinBalance = useCacheSend("SimpleBank", "setMinBalance");
  const contractAddress = useCacheCall("SimpleBank", "getContractAddress");

  // circuit breaker to start stop interest payments
  const payingInterest = useCacheCall("SimpleBank", "interestRunning");
  const startInterest = useCacheSend("SimpleBank", "startPayments");
  const stopInterest = useCacheSend("SimpleBank", "stopPayments");

  // circuit breaker to pause contract
  const isPaused = useCacheCall("SimpleBank", "paused");
  const pauseContract = useCacheSend("SimpleBank", "pauseContract");
  const unpauseContract = useCacheSend("SimpleBank", "unPauseContract");

  const allEvents = useCacheEvents(
    "SimpleBank",
    "allEvents",
    // Use memoization to only recreate listener when account changes.
    useMemo(
      () => ({
        filter: { accountAddress: account },
        fromBlock: 0
      }),
      [account]
    )
  );

  return {
    web3,
    drizzle,
    drizzleState,
    contracts,
    transactions,
    account,
    contractAddress,
    contractBalanceEth,
    accountBalEth,
    isEnrolled,
    enrollAccount,
    bankBalanceEth,
    bankBalance,
    deposit,
    withdraw,
    closeAccount,
    isOwner,
    bankAccounts,
    interestRate,
    payInterest,
    setInterestRate,
    minBalanceEth,
    minBalanceUsd,
    setMinBalance,
    payingInterest,
    startInterest,
    stopInterest,
    isPaused,
    oneUsdEth,
    pauseContract,
    unpauseContract,
    allEvents
  };
};

export default useBankContract;
