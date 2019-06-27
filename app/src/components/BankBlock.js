import React from "react";
import useBankContract from "../utils/useBankContract";
import AdminView from "./AdminView";
import AdminView1 from "./AdminView1";
import EnrollAccount from "./EnrollAccount";
import BankAccount from "./BankAccount";
import ShowTransactions from "./ShowTransactions";
import { Heading, Flex, Box } from "rimble-ui";

const BankBlock = () => {
  const { isEnrolled, isOwner } = useBankContract();

  if (!isEnrolled) {
    return <EnrollAccount />;
  }

  return (
    <Flex>
      {/* <Box flex={1}>{isOwner && <AdminView1 />}</Box> */}
      <Box flex={1}>
        <BankAccount />
        <ShowTransactions />
      </Box>
    </Flex>
  );
};

export default BankBlock;
