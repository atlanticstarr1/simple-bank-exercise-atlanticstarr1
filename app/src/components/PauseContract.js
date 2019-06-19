import React from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Flex, Box, Text, Button, Card, Pill } from "rimble-ui";

const PauseContract = () => {
  const { useCacheCall, useCacheSend } = drizzleReactHooks.useDrizzle();
  const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
    account: drizzleState.accounts[0]
  }));
  const pause = useCacheSend("SimpleBank", "pause");
  const unpause = useCacheSend("SimpleBank", "unpause");
  const paused = useCacheCall("SimpleBank", "paused");

  // pause the contract
  const pauseContract = () => {
    const { send, TXObjects } = pause;
    send();
  };

  // unpause the contract
  const unpauseContract = () => {
    const { send, TXObjects } = unpause;
    send();
  };

  return (
    <Card maxWidth={"640px"} px={4} mx={"auto"}>
      <Text fontWeight={3} my={3}>
        Pause Contract
      </Text>
      <Flex alignItems={"flex-start"} pb={3}>
        <Box>
          <Pill color={paused ? "danger" : "green"}>
            {paused ? "CONTRACT PAUSED" : "CONTRACT NOT PAUSED"}
          </Pill>
        </Box>
      </Flex>
      <Flex flexDirection={"row"}>
        <Button
          variant="danger"
          size="small"
          onClick={pauseContract}
          mr={1}
          disabled={paused}
        >
          PAUSE CONTRACT
        </Button>
        <Button.Outline
          variant="green"
          size="small"
          onClick={unpauseContract}
          disabled={!paused}
        >
          UNPAUSE CONTRACT
        </Button.Outline>
      </Flex>
    </Card>
  );
};
export default PauseContract;
