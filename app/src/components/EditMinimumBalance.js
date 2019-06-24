import React, { useState, useEffect } from "react";
import { Flex, Button, Form } from "rimble-ui";
import useBankContract from "../utils/useBankContract";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const EditMinimumBalance = ({ balance }) => {
  const [minBalanceUsd, setMinBalanceUsd] = useState(balance);
  const { setMinBalance } = useBankContract();

  const handleChange = e => {
    e.target.parentNode.classList.add("was-validated");
    setMinBalanceUsd(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setMinBalance.send(minBalanceUsd);
  };

  useEffect(() => {
    if (setMinBalance.status) {
      showTransactionToast(setMinBalance.status);
    }
  }, [setMinBalance.TXObjects.length, setMinBalance.status]);

  return (
    <Form onSubmit={handleSubmit}>
      <Flex flexDirection="column">
        <Form.Field label="Minimum Balance (USD)">
          <Form.Input
            type="number"
            min="1"
            required
            width={1}
            onChange={handleChange}
            value={minBalanceUsd}
          />
        </Form.Field>
        <Button type="submit">Change balance</Button>
      </Flex>
    </Form>
  );
};

export default EditMinimumBalance;
