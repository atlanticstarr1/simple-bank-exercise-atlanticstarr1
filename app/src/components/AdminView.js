import React, { useState } from "react";
import { Flex, Box, Button, Card, Heading } from "rimble-ui";
import InterestPayment from "./InterestPayment";
import PauseContract from "./PauseContract";
import Oracle from "./Oracle";
import ViewAccounts from "./ViewAccounts";
import EditInterestRate from "./EditInterestRate";
import EditMinimumBalance from "./EditMinimumBalance";

const AdminView = props => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showOracle, setShowOracle] = useState(false);

  const toggleBankDashboard = () => {
    setShowAdmin(!showAdmin);
    setShowOracle(false);
  };

  const toggleOracleDashboard = () => {
    setShowOracle(!showOracle);
    setShowAdmin(false);
  };

  return (
    <>
      <Flex>
        <Box mr={2}>
          <Button size="small" onClick={toggleBankDashboard}>
            Bank Admin
          </Button>
        </Box>
        <Box>
          <Button size="small" onClick={toggleOracleDashboard}>
            Oracle Admin
          </Button>
        </Box>
      </Flex>
      {showAdmin && (
        <Card mx={"auto"}>
          <Heading.h4 mb={3}>Bank Admin</Heading.h4>
          <Flex mb={3}>
            <Box flex={1} mr={3}>
              <EditInterestRate />
            </Box>
            <Box flex={1} mr={3}>
              <EditMinimumBalance />
            </Box>
            <Box mr={3}>
              <InterestPayment />
            </Box>
            <Box>
              <PauseContract />
            </Box>
          </Flex>
          <Flex mb={3}>
            <ViewAccounts />
          </Flex>
          <Button.Outline size="small" onClick={toggleBankDashboard}>
            Close
          </Button.Outline>
        </Card>
      )}
      {showOracle && (
        <Card mx={"auto"}>
          <Heading.h4 mb={3}>Oracle Admin</Heading.h4>
          <Flex mb={3}>
            <Oracle />
          </Flex>
          <Button.Outline size="small" onClick={toggleOracleDashboard}>
            Close
          </Button.Outline>
        </Card>
      )}
    </>
  );
};

export default AdminView;
