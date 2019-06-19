import React from "react";
import { Card } from "rimble-ui";

import TransactionToastUtil from "../utils/TransactionToastUtil";

import SmartContract from "./SmartContract";
import TransactionsCard from "./TransactionsCard";

const PrimaryCard = props => {
  return (
    <div>
      <Card maxWidth={"640px"} px={4} mx={"auto"}>
        <SmartContract
          account={props.account}
          transactions={props.transactions}
        />
      </Card>

      <TransactionsCard transactions={props.transactions} />
      <TransactionToastUtil transactions={props.transactions} />
    </div>
  );
};

export default PrimaryCard;
