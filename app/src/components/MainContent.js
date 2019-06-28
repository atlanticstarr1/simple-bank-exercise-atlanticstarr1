import React from "react";
import { Flex, Box } from "rimble-ui";
import useBankContract from "../utils/useBankContract";
import WalletBlock from "./WalletBlock";
import BankBlock from "./BankBlock";
import BankStats from "./BankStats";
import AdminView from "./AdminView";

const MainContent = () => {
  const { isOwner } = useBankContract();
  return (
    <Flex flexDirection={"column"}>
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
