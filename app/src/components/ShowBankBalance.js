import React, { useEffect, useState, useMemo } from "react";
import { drizzleReactHooks } from "drizzle-react";
import useBankContract from "../utils/useBankContract";
import { Flex, Box, Text, Icon } from "rimble-ui";

const ShowBankBalance = () => {
  const [balanceEth, setBalanceEth] = useState(0);
  const {
    bankBalanceEth,
    account,
    minBalanceEth,
    minBalanceUsd
  } = useBankContract();
  const { drizzle, useCacheCall } = drizzleReactHooks.useDrizzle();

  // todo: check on drizzle's latest release to reuse useCacheCall
  // const balanceEth = useCacheCall("SimpleBank", "getBalance", {
  //   from: account
  // });

  const getBalance = async () => {
    let bal1 = await drizzle.contracts.SimpleBank.methods
      .getBalance()
      .call({ from: account });
    bal1 = parseFloat(bal1 / 1e18).toFixed(18);
    setBalanceEth(bal1);
  };

  // keep an eye to prevent infinite re-renders
  useEffect(() => {
    getBalance();
    return () => {
      console.log("cleaning up");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, bankBalanceEth]);

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
