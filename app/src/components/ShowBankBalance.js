import React, { useState, useMemo } from "react";
import { drizzleReactHooks } from "drizzle-react";
import useBankContract from "../utils/useBankContract";
import { Flex, Box, Text } from "rimble-ui";

const ShowBankBalance = () => {
  const [balanceEth, setBalanceEth] = useState(0);
  const {
    account,
    minBalanceEth,
    minBalanceUsd,
    transactions
  } = useBankContract();
  const { drizzle } = drizzleReactHooks.useDrizzle();

  // memo funcion
  const getBalance = async () => {
    console.log("calling getbalance");
    let bal1 = await drizzle.contracts.SimpleBank.methods
      .getBalance()
      .call({ from: account });
    bal1 = parseFloat(bal1 / 1e18).toFixed(18);
    setBalanceEth(bal1);
  };

  useMemo(getBalance, [account, transactions]);

  // calculate usd equivalent
  const oneUsdInEther = minBalanceEth / minBalanceUsd;
  const usdPrice = parseFloat(balanceEth / oneUsdInEther).toFixed(2);

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
          {balanceEth} ETH
        </Text>
      </Box>
      <Box flex={1}>
        <Text textAlign={"center"}>(~{usdPrice} USD)</Text>
      </Box>
    </Flex>
  );
};
export default ShowBankBalance;
