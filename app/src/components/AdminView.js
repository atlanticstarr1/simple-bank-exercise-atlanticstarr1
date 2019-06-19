import React, { useState, useCallback } from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Flex, Box, Text, Button, Form, Card, Pill, Input } from "rimble-ui";
import ViewAccounts from "./ViewAccounts";
import InterestPayment from "./InterestPayment";
import PauseContract from "./PauseContract";

const AdminView = props => {
  const { useCacheCall, useCacheSend } = drizzleReactHooks.useDrizzle();
  const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
    account: drizzleState.accounts[0]
  }));

  const interestRate = useCacheCall("SimpleBank", "interestRate");
  const payingInterest = useCacheCall("SimpleBank", "running");
  const minDepositEth = useCacheCall("SimpleBank", "minDepositEth");
  const minDepositUsd = useCacheCall("SimpleBank", "minDepositUsd");
  const enrolled = useCacheCall("SimpleBank", "enrolled", drizzleState.account);
  const isOwner = useCacheCall("SimpleBank", "isOwner");

  const handleValidation = e => {
    e.target.parentNode.classList.add("was-validated");
  };

  return (
    <div>
      <Card maxWidth={"640px"} px={4} mx={"auto"}>
        <Text fontWeight={3} mb={3}>
          Interest and Minimum Balance
        </Text>
        <Flex>
          <Box p={1} width={1 / 2} bg="black">
            <Button onClick={() => console.log("clicked")}>Set Interest</Button>
          </Box>
          <Box p={1} color="white" bg="salmon">
            <Form.Input
              type="number"
              onChange={handleValidation}
              placeholder="3"
              value={interestRate}
            />
          </Box>
        </Flex>
        <Flex>
          <Box p={1} width={1 / 2} bg="black">
            <Button onClick={() => console.log("clicked")}>
              Set Mininum Deposit
            </Button>
          </Box>
          <Box p={1} color="white" bg="salmon">
            <Form.Input
              type="number"
              onChange={handleValidation}
              placeholder="1 USD"
              value={minDepositUsd}
            />
          </Box>
        </Flex>
      </Card>
      <InterestPayment />
      <PauseContract />
      <Card maxWidth={"640px"} px={4} mx={"auto"}>
        <ViewAccounts />
      </Card>
    </div>
  );
};

export default AdminView;
