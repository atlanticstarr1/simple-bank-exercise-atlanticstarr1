import React, { useState, useCallback } from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Flex, Box, Text, Button, Form, Card, Field, Input } from "rimble-ui";
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
        <Form onSubmit={() => console.log("submit")}>
          <Form.Field label="Interest Rate" width={1}>
            <Form.Input
              type="number"
              min="1"
              max="6"
              required
              width={1}
              onChange={handleValidation}
              defaultValue={interestRate}
            />
          </Form.Field>
          <Button type="submit" width={1}>
            Change Rate
          </Button>
        </Form>
      </Card>
      <InterestPayment />
      <PauseContract />
    </div>
  );
};

export default AdminView;
