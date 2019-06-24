import React from "react";
import InterestPayment from "./InterestPayment";
import PauseContract from "./PauseContract";
import EditContract from "./EditContract";
import Oracle from "./Oracle";

const AdminView = props => {
  return (
    <div>
      <EditContract />
      <InterestPayment />
      <PauseContract />
      <Oracle />
    </div>
  );
};

export default AdminView;
