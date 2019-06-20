import React, { useEffect } from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Heading, Box, Text, Button, Card, Pill } from "rimble-ui";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const PauseContract = () => {
  const { useCacheCall, useCacheSend } = drizzleReactHooks.useDrizzle();
  const pause = useCacheSend("SimpleBank", "pause");
  const unpause = useCacheSend("SimpleBank", "unpause");
  const paused = useCacheCall("SimpleBank", "paused");

  const togglePauseContract = () => {
    paused ? unpause.send() : pause.send();
  };

  useEffect(() => {
    if (pause.status) {
      showTransactionToast(pause.status);
    }
  }, [pause.TXObjects.length, pause.status]);

  useEffect(() => {
    if (unpause.status) {
      showTransactionToast(unpause.status);
    }
  }, [unpause.TXObjects.length, unpause.status]);

  return (
    <Card width={"450px"} mx={"auto"} px={4}>
      <Heading>Circuit Breaker</Heading>
      <Box>
        <Text mb={3}>Pause enrollment, deposits and interest payments.</Text>
        <Pill mb={3} color={paused ? "danger" : "green"}>
          {paused ? "PAUSED" : "UNPAUSED"}
        </Pill>
      </Box>

      <Button
        variant={paused ? "success" : "danger"}
        onClick={togglePauseContract}
      >
        {paused ? "Unpause Contract" : "Pause Contract"}
      </Button>
    </Card>
  );
};
export default PauseContract;
