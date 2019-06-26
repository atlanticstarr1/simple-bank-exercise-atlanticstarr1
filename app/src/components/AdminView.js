import React from "react";
import InterestPayment from "./InterestPayment";
import PauseContract from "./PauseContract";
import EditContract from "./EditContract";
import Oracle from "./Oracle";
import ViewAccounts from "./ViewAccounts";

const AdminView = props => {
  return (
    <div>
      <EditContract />
      <InterestPayment />
      <PauseContract />
      <Oracle />
      <ViewAccounts />
    </div>
  );
};

export default AdminView;
