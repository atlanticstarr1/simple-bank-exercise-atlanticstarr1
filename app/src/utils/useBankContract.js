import { useMemo } from "react";
import { drizzleReactHooks } from "drizzle-react";
//import useAccount from "../utils/useAccount";

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

  const web3 = drizzle.web3;
  const account = drizzleState && drizzleState.accounts[0];
  const contracts = drizzleState && drizzleState.contracts;
  const transactions = drizzleState && drizzleState.transactions;
  const accountBalWei = drizzleState.accountBalances[account];

  let accountBalEth = drizzle.web3.utils.fromWei(accountBalWei, "ether");
  let bankBalanceEth = 0;
  let minBalanceEth = 0;
  let contractBalanceEth = 0;

  // enroll
  const isEnrolled = useCacheCall("SimpleBank", "enrolled", account);
  const enrollAccount = useCacheSend("SimpleBank", "enroll");
  const bankBalance = useCacheCall("SimpleBank", "getBalance", {
    from: account
  });
  if (bankBalance) {
    bankBalanceEth = web3.utils.fromWei(bankBalance, "ether");
    bankBalanceEth = parseFloat(bankBalanceEth).toFixed(18);
  }

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
  if (contractBalance) {
    let eth = web3.utils.fromWei(contractBalance, "ether");
    contractBalanceEth = parseFloat(eth).toFixed(5);
  }

  // bank interest rate
  const interestRate = useCacheCall("SimpleBank", "interestRate");
  const setInterestRate = useCacheSend("SimpleBank", "setInterestRate");

  // bank minumum balance per 10 cents usd
  const minBalance = useCacheCall("SimpleBank", "minBalanceEth");
  if (minBalance) {
    let eth = web3.utils.fromWei(minBalance, "ether");
    minBalanceEth = parseFloat(eth).toFixed(5);
  }
  const minBalanceUsd = useCacheCall("SimpleBank", "minBalanceUsd");
  const setMinBalance = useCacheSend("SimpleBank", "setMinBalance");
  const contractAddress = useCacheCall("SimpleBank", "getContractAddress");

  // circuit breaker to start stop interest payments
  const payingInterest = useCacheCall("SimpleBank", "running");
  const startInterest = useCacheSend("SimpleBank", "startPayments");
  const stopInterest = useCacheSend("SimpleBank", "stopPayments");

  // circuit breaker to pause contract
  const isPaused = useCacheCall("SimpleBank", "paused");
  const pauseContract = useCacheSend("SimpleBank", "pause");
  const unpauseContract = useCacheSend("SimpleBank", "unpause");

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
    contracts,
    transactions,
    account,
    contractAddress,
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
    contractBalanceEth,
    interestRate,
    setInterestRate,
    minBalanceEth,
    minBalanceUsd,
    setMinBalance,
    payingInterest,
    startInterest,
    stopInterest,
    isPaused,
    pauseContract,
    unpauseContract,
    allEvents
  };
};

export default useBankContract;
