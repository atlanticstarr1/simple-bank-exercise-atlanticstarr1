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
    <Form onSubmit={handleSubmit} w={1}>
      <Flex>
        <Box p={2} w={1 / 2} alignSelf="center" mt={12}>
          <Button type="submit">Change Rate</Button>
        </Box>
        <Box p={2} width={1 / 2}>
          <Form.Field label="Interest Rate (%)">
            <Form.Input
              type="number"
              min="1"
              max="6"
              required
              width={1}
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
