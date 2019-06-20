import React from "react";
import { Card, ToastMessage } from "rimble-ui";
import AdminView from "./AdminView";
import SmartContract from "./SmartContract";

const PrimaryCard = props => {
  return (
    <div>
      <AdminView />
      <Card maxWidth={"640px"} px={4} mx={"auto"}>
        <SmartContract
          account={props.account}
          transactions={props.transactions}
        />
      </Card>

      <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
    </div>
  );
};

export default PrimaryCard;
