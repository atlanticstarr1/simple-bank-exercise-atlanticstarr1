import React, { useState } from "react";
import { Flex, Box, Button, MetaMaskButton } from "rimble-ui";
import InterestPayment from "./InterestPayment";
import PauseContract from "./PauseContract";
import EditContract from "./EditContract";
import Oracle from "./Oracle";
import ViewAccounts from "./ViewAccounts";

const AdminView1 = props => {
  const [showInterest, setShowInterest] = useState(false);
  const [showStopInterest, setShowStopInterest] = useState(false);
  const [showMinBalance, setShowMinBalance] = useState(false);
  const [showStopContract, setShowStopContract] = useState(false);
  const [showOracle, setShowOracle] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const toggleShowInterest = () => {
    setShowInterest(!showInterest);
  };

  const toggleShowMinBalance = () => {
    setShowMinBalance(!showMinBalance);
  };

  const toggleStopContract = () => {
    setShowStopContract(!showStopContract);
  };

  const toggleShowStopInterest = () => {
    setShowStopInterest(!showStopInterest);
  };

  const toggleShowOracle = () => {
    setShowOracle(!showOracle);
  };

  const toggleShowAccounts = () => {
    setShowAccounts(!showAccounts);
  };

  const toggleAdminDashboard = () => {
    setShowAdmin(!showAdmin);
  };

  return (
    <Flex>
      <Box flex={1}>
        {!showAdmin && (
          <Button onClick={toggleAdminDashboard}>Admin Dashboard</Button>
        )}
      </Box>
      {showAdmin && <Box>ADMIN DASHBOARD</Box>}
      {showInterest && <EditContract handleClick={toggleShowInterest} />}
      {showStopInterest && <InterestPayment />}
      {showStopContract && <PauseContract />}
      {showOracle && <Oracle />}
      {showAccounts && <ViewAccounts />}
    </Flex>
  );
};

export default AdminView1;
