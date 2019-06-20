import React from "react";
import InterestPayment from "./InterestPayment";
import PauseContract from "./PauseContract";
import EditContract from "./EditContract";
import WriteToOracle from "./WriteToOracle";

const AdminView = props => {
  return (
    <div>
      <EditContract />
      <InterestPayment />
      <PauseContract />
      <WriteToOracle />
    </div>
  );
};

export default AdminView;
