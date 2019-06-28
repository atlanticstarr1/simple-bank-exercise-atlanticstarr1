import React, { useEffect } from "react";
import { Box, Text, Button, Card, Flex, Pill, Heading } from "rimble-ui";
import useBankContract from "../utils/useBankContract";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const PayInterest = () => {
  const { account, payInterest } = useBankContract();

  const handlePayInterest = () => {
    payInterest.send({ from: account });
    // window.toastProvider.addMessage("Processing payment...", {
    //   secondaryMessage: "Check progress on Etherscan",
    //   variant: "processing"
    // });
  };

  useEffect(() => {
    if (payInterest.status) {
      showTransactionToast(payInterest.status);
    }
  }, [payInterest.TXObjects.length, payInterest.status]);

  return (
    <Flex flexDirection="column">
      <Box mb={3}>
        <Text fontSize={"14px"} fontWeight={600} mb={3}>
          Pay Interest
        </Text>
        {/* <Pill color={payingInterest ? "green" : "danger"} mb={2}>
          {payingInterest ? "ACTIVE" : "NOT ACTIVE"}
        </Pill> */}
      </Box>
      <Box>
        <Button onClick={handlePayInterest} size={"small"}>
          Pay interest
        </Button>
      </Box>
    </Flex>
  );
};
export default PayInterest;
