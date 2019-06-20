import React, { useState, useEffect } from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Flex, Box, Button, Form } from "rimble-ui";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const EditMinimumBalance = ({ balance }) => {
  const [minBalance, setMinBalance] = useState(balance);
  const { useCacheSend } = drizzleReactHooks.useDrizzle();
  const setBalance = useCacheSend("SimpleBank", "setMinBalance");

  const handleChange = e => {
    // handle form validation
    e.target.parentNode.classList.add("was-validated");
    setMinBalance(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // write to contract
    setBalance.send(minBalance);
  };

  useEffect(() => {
    if (setBalance.status) {
      showTransactionToast(setBalance.status);
    }
  }, [setBalance.TXObjects.length, setBalance.status]);

  return (
    <Form onSubmit={handleSubmit} w={1}>
      <Flex>
        <Box p={2} w={1 / 2} alignSelf="center" mt={12}>
          <Button type="submit">Change Balance</Button>
        </Box>
        <Box p={2} width={1 / 2}>
          <Form.Field label="Minimum Balance (USD)">
            <Form.Input
              type="number"
              min="1"
              required
              width={1}
              onChange={handleChange}
              value={minBalance}
            />
          </Form.Field>
        </Box>
      </Flex>
    </Form>
  );
};

export default EditMinimumBalance;
