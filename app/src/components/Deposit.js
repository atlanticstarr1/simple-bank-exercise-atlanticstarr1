import React, { useState, useEffect } from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Flex, Button, Card, Form, Heading, Box, Text } from "rimble-ui";
import { useAccount } from "../utils/Account";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const Deposit = props => {
  const [depositAmount, setDepositAmount] = useState(0);
  const { useCacheSend } = drizzleReactHooks.useDrizzle();
  const deposit = useCacheSend("SimpleBank", "deposit");
  const { accountBalEth } = useAccount();
  const { drizzle } = drizzleReactHooks.useDrizzle();

  const handleChange = e => {
    e.target.parentNode.classList.add("was-validated");
    setDepositAmount(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const weiValue = drizzle.web3.utils.toWei(depositAmount, "ether");
    deposit.send({ value: weiValue });
  };

  useEffect(() => {
    if (deposit.status) {
      showTransactionToast(deposit.status);
    }
  }, [deposit.TXObjects.length, deposit.status]);

  return (
    <Card maxWidth={"450px"} px={4} mx={"auto"}>
      <Heading.h4>Deposit</Heading.h4>
      <Box>
        <Text mb={4}>Send some ether (ETH) to your bank account.</Text>
      </Box>
      <Form onSubmit={handleSubmit}>
        <Flex flexDirection="column">
          <Form.Field label="Amount">
            <Form.Input
              type="number"
              step="any"
              min="0.000000000000000001"
              max={accountBalEth}
              width={1}
              required
              onChange={handleChange}
              value={depositAmount}
            />
          </Form.Field>
          <Button type="submit">Deposit</Button>
        </Flex>
      </Form>
    </Card>
  );
};

export default Deposit;
