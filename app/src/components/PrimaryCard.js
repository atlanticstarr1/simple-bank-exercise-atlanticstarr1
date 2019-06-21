import React from "react";
import { drizzleReactHooks } from "drizzle-react";
import AdminView from "./AdminView";
import SmartContract from "./SmartContract";
import EnrollAccount from "./EnrollAccount";
import Deposit from "./Deposit";

const PrimaryCard = props => {
  const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
    account: drizzleState.accounts[0]
  }));
  const { account } = drizzleState;

  const { useCacheCall } = drizzleReactHooks.useDrizzle();
  const enrolled = useCacheCall("SimpleBank", "enrolled", account);
  const isOwner = useCacheCall("SimpleBank", "isOwner");

  if (!enrolled) {
    return <EnrollAccount />;
  }

  return (
    <div>
      {isOwner && <AdminView />}
      {/* <SmartContract
        account={props.account}
        transactions={props.transactions}
      /> */}
      <Deposit />
    </div>
  );
};

export default PrimaryCard;
