import React from "react";
import useBankContract from "../utils/useBankContract";
import AdminView from "./AdminView";
import EnrollAccount from "./EnrollAccount";
import BankAccount from "./BankAccount";
import ShowTransactions from "./ShowTransactions";
import { Heading } from "rimble-ui";

const BankBlock = () => {
  const { isEnrolled, isOwner } = useBankContract();

  if (!isEnrolled) {
    return <EnrollAccount />;
  }

  return (
    <div>
      {isOwner && <AdminView />}
      <BankAccount />
      <ShowTransactions />
    </div>
  );
};

export default BankBlock;
