import React, { useState, useEffect } from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Flex, Box, Button, Form } from "rimble-ui";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const EditInterestRate = ({ rate }) => {
  const [interest, setInterest] = useState(rate);
  const { useCacheSend } = drizzleReactHooks.useDrizzle();
  const setRate = useCacheSend("SimpleBank", "setInterestRate");

  const handleChange = e => {
    // handle validation
    e.target.parentNode.classList.add("was-validated");
    setInterest(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setRate.send(interest);
  };

  useEffect(() => {
    if (setRate.status) {
      showTransactionToast(setRate.status);
    }
  }, [setRate.TXObjects.length, setRate.status]);

  return (
    <Form onSubmit={handleSubmit}>
      <Flex>
        <Box alignSelf="center" mt={12} flex="1">
          <Button type="submit">Change rate</Button>
        </Box>
        <Box flex="1">
          <Form.Field label="Interest Rate (%)">
            <Form.Input
              type="number"
              min="1"
              max="6"
              width={1}
              required
              onChange={handleChange}
              value={interest}
            />
          </Form.Field>
        </Box>
      </Flex>
    </Form>
  );
};

export default EditInterestRate;
