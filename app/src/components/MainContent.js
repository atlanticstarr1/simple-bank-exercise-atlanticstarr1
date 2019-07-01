import React, { useEffect } from "react";
import { Flex, Box } from "rimble-ui";
import useBankContract from "../utils/useBankContract";
import WalletBlock from "./WalletBlock";
import BankBlock from "./BankBlock";
import BankStats from "./BankStats";
import AdminView from "./AdminView";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const MainContent = () => {
  const { isOwner, drizzleState, contracts } = useBankContract();
  const { transactions, transactionStack } = drizzleState;
  useEffect(() => {
    console.log("status messages from main");
    debugger;
    const lastTxId = transactionStack[transactionStack.length - 1];
    let event = contracts.SimpleBank.events.filter(
      a =>
        (a.event === "Poked" || a.event === "OracleDataNotValid") &&
        a.transactionHash === lastTxId
    )[0];
    let lastTx = transactions[lastTxId];
    lastTx && showTransactionToast(event, lastTx);
  }, [contracts.SimpleBank.events, transactionStack, transactions]);

  return (
    <Flex flexDirection={"column"}>
      {/* {showSpinner && <Loader size="40px" />} */}
      {isOwner && (
        <Box flex={1}>
          <AdminView />
        </Box>
      )}
      <Box flex={1}>
        <BankStats />
        <WalletBlock />
        <BankBlock />
      </Box>
    </Flex>
  );
};

export default MainContent;
