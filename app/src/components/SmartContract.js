import React, { useState } from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Flex, Box, Text, Button } from "rimble-ui";

const SmartContract = props => {
  //const [interest, setInterest] = useState(0);
  //const [minDeposit, setMinDeposit] = useState(1);
  //const [balance, setBalance] = useState(0);

  const closeAccount = () => {};
  const deposit = () => {};
  const withdraw = () => {};

  const { useCacheCall } = drizzleReactHooks.useDrizzle();
  const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
    account: drizzleState.accounts[0]
  }));

  const interestRate = useCacheCall("SimpleBank", "interestRate");
  const minDepositEth = useCacheCall("SimpleBank", "minBalanceEth");
  const minDepositUsd = useCacheCall("SimpleBank", "minBalanceUsd");
  const enrolled = useCacheCall("SimpleBank", "enrolled", drizzleState.account);
  const isOwner = useCacheCall("SimpleBank", "isOwner");

  return (
    <Box>
      <div className="section">
        <p>Interest Rate: {interestRate}</p>
        <p>Minumum Balance: {minDepositUsd} USD</p>
        <p>Minumum Balance: {minDepositEth} ETH </p>
        <p>Enrolled: {enrolled ? "Enrolled" : "Not Enrolled"}</p>
        <p>Contract Owner: {isOwner ? "Yes" : "No"}</p>
      </div>
      <Flex px={0} justifyContent="space-between" alignItems={"center"}>
        <Text fontWeight={3}>Bank</Text>

        <Button.Outline
          size={"small"}
          onClick={() => closeAccount()}
          disabled={props.account}
        >
          Close Account
        </Button.Outline>
      </Flex>

      <Text
        fontSize={"5rem"}
        fontWeight={1}
        lineHeight={1}
        textAlign={"center"}
        my={5}
      >
        {5}
      </Text>

      <Flex flexDirection={"row"}>
        <Button onClick={() => deposit()} flex={"1"} mr={[2, 3]}>
          Deposit
        </Button>
        <Button onClick={() => withdraw()} flex={"1"}>
          Withdraw
        </Button>
      </Flex>
    </Box>
  );
};

export default SmartContract;
