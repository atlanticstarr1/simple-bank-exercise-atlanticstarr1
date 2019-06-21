import React, { useState, useEffect } from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Flex, Button, Card, Form, Heading, Box, Text, Icon } from "rimble-ui";
import { useAccount, usefromWei } from "../utils/Account";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const Withdraw = props => {
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const { drizzle } = drizzleReactHooks.useDrizzle();
  const { useCacheSend, useCacheCall } = drizzleReactHooks.useDrizzle();
  const withdraw = useCacheSend("SimpleBank", "withdraw");
  const balance = useCacheCall("SimpleBank", "getBalance");
  const balanceEth = balance && usefromWei(balance, "ether");

  const handleChange = e => {
    e.target.parentNode.classList.add("was-validated");
    setWithdrawAmount(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const result = drizzle.web3.utils.toWei(withdrawAmount, "ether");
    withdraw.send(result);
  };

  useEffect(() => {
    if (withdraw.status) {
      showTransactionToast(withdraw.status);
    }
  }, [withdraw.TXObjects.length, withdraw.status]);

  return (
    <Card maxWidth={"450px"} px={4} mx={"auto"}>
      <Heading.h4>Withdraw</Heading.h4>
      <Box>
        <Text mb={3}>Send some ether (ETH) to your wallet.</Text>
      </Box>
      <Text
        fontSize={"2rem"}
        fontWeight={1}
        lineHeight={1}
        textAlign={"center"}
        my={4}
      >
        Balance: {parseFloat(balanceEth).toFixed(18)} ETH
      </Text>
      <Form onSubmit={handleSubmit}>
        <Flex flexDirection="column">
          <Form.Field label="Amount">
            <Form.Input
              type="number"
              step="any"
              min="0.000000000000000001"
              max={balanceEth}
              width={1}
              required
              onChange={handleChange}
              value={withdrawAmount}
            />
          </Form.Field>
          <Button type="submit">Withdraw</Button>
        </Flex>
      </Form>
    </Card>
  );
};

export default Withdraw;
