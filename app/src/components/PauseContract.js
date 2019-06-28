import React, { useEffect } from "react";
import { Heading, Box, Text, Button, Card, Flex, Pill } from "rimble-ui";
import useBankContract from "../utils/useBankContract";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const PauseContract = () => {
  const { isPaused, pauseContract, unpauseContract } = useBankContract();

  const togglePauseContract = () => {
    isPaused ? unpauseContract.send() : pauseContract.send();
  };

  useEffect(() => {
    if (pauseContract.status) {
      showTransactionToast(pauseContract.status);
    }
  }, [pauseContract.TXObjects.length, pauseContract.status]);

  useEffect(() => {
    if (unpauseContract.status) {
      showTransactionToast(unpauseContract.status);
    }
  }, [unpauseContract.TXObjects.length, unpauseContract.status]);

  return (
    <Flex flexDirection="column">
      <Box mb={3}>
        <Text fontSize={"14px"} fontWeight={600} mb={3}>
          Circuit Breaker
        </Text>
        <Pill color={isPaused ? "danger" : "green"} mb={2}>
          {isPaused ? "DISABLED" : "ACTIVE"}
        </Pill>
      </Box>
      <Box>
        <Button
          variant={!isPaused && "danger"}
          onClick={togglePauseContract}
          size={"small"}
        >
          {isPaused ? "Unpause Contract" : "Pause Contract"}
        </Button>
      </Box>
    </Flex>
  );
};
export default PauseContract;
