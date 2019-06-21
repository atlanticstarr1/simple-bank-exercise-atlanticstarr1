import React, { useEffect } from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Heading, Box, Text, Button, Card, Blockie } from "rimble-ui";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const EnrollAccount = () => {
  const { useCacheSend } = drizzleReactHooks.useDrizzle();
  const enroll = useCacheSend("SimpleBank", "enroll");

  const enrollAccount = () => {
    enroll.send();
  };

  useEffect(() => {
    if (enroll.status) {
      showTransactionToast(enroll.status);
    }
  }, [enroll.TXObjects.length, enroll.status]);

  return (
    <Card width={"450px"} mx={"auto"} px={4}>
      <Heading>Enroll Account</Heading>
      <Box>
        <Text mb={3}>Make deposits, withdrawals, and earn daily interest.</Text>
      </Box>
      <Button onClick={enrollAccount}>Enroll</Button>
    </Card>
  );
};
export default EnrollAccount;
