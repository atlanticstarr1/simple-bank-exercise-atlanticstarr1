import React, { useState, useEffect } from "react";
import { Flex, Button, Form } from "rimble-ui";
import useBankContract from "../utils/useBankContract";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const Withdraw = () => {
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const { account, withdraw, bankBalanceEth } = useBankContract();

  const handleChange = e => {
    e.target.parentNode.classList.add("was-validated");
    setWithdrawAmount(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const result = withdrawAmount * 1e18;
    withdraw.send(result, { from: account });
  };

  useEffect(() => {
    if (withdraw.status) {
      showTransactionToast(withdraw.status);
    }
  }, [withdraw.TXObjects.length, withdraw.status]);

  const disableControl = !(bankBalanceEth > 0);
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Flex flexDirection="column">
          <Form.Field label="Amount (ETH)">
            <Form.Input
              type="number"
              step="any"
              min="0.000000000000000001"
              max={bankBalanceEth}
              width={1}
              required
              onChange={handleChange}
              value={withdrawAmount}
              disabled={disableControl}
              title="Enter amount of ETH to withdraw"
            />
          </Form.Field>
          <Button type="submit" disabled={disableControl}>
            Withdraw
          </Button>
        </Flex>
      </Form>
    </div>
  );
};

export default Withdraw;
