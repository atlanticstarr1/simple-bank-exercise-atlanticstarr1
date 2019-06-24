import React, { useState, useEffect } from "react";
import { Flex, Box, Button, Form } from "rimble-ui";
import useBankContract from "../utils/useBankContract";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const EditInterestRate = ({ rate }) => {
  const [interest, setInterest] = useState(rate);
  const { setInterestRate } = useBankContract();

  const handleChange = e => {
    // handle validation
    e.target.parentNode.classList.add("was-validated");
    setInterest(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setInterestRate.send(interest);
  };

  useEffect(() => {
    if (setInterestRate.status) {
      showTransactionToast(setInterestRate.status);
    }
  }, [setInterestRate.TXObjects.length, setInterestRate.status]);

  return (
    <Form onSubmit={handleSubmit}>
      <Flex flexDirection="column">
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
        <Button type="submit">Change rate</Button>
      </Flex>
    </Form>
  );
};

export default EditInterestRate;
