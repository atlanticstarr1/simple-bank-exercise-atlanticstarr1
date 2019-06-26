import React, { useState, useMemo } from "react";
import useBankContract from "../utils/useBankContract";
import { Flex, Box, Text } from "rimble-ui";
import ethToUsd from "../utils/ethToUsd";

const ShowBankBalance = () => {
  const [balUsd, setBalUsd] = useState(0);
  const { oneUsdInEther, bankBalanceEth } = useBankContract();

  const calculateUsd = async () => {
    console.log("calling getbalance");
    const usdPrice = ethToUsd(oneUsdInEther, bankBalanceEth);
    setBalUsd(usdPrice);
  };

  useMemo(calculateUsd, [bankBalanceEth]);

  return (
    <Flex flexDirection={"column"}>
      <Box flex={1}>
        <Text
          fontSize={"2rem"}
          fontWeight={1}
          lineHeight={0.5}
          textAlign={"center"}
          mb={3}
        >
          {bankBalanceEth} ETH
        </Text>
      </Box>
      <Box flex={1}>
        <Text textAlign={"center"}>(~{balUsd} USD)</Text>
      </Box>
    </Flex>
  );
};
export default ShowBankBalance;
