import React from "react";
import { Flex, Box, Text, QR, PublicAddress } from "rimble-ui";

const AccountOverview = props => {
  const trimEth = eth => {
    eth = parseFloat(eth);
    eth = eth * 10000;
    eth = Math.round(eth);
    eth = eth / 10000;
    eth = eth.toFixed(18);

    return eth;
  };

  const roundedBalance = trimEth(props.accountBalance);
  return (
    <Flex alignItems={"flex-start"}>
      <Flex mr={3}>
        <Flex>
          <QR value={props.account} size={100} renderAs={"svg"} />
        </Flex>
      </Flex>
      <Box flex={1} mt={3}>
        <PublicAddress address={props.account} />
        {/* <Text
          fontSize={"2rem"}
          fontWeight={1}
          lineHeight={0.5}
          mb={3}
          color={props.accountBalanceLow ? "red" : "mid-gray"}
        >
          {roundedBalance} ETH
        </Text> */}
      </Box>
    </Flex>
  );
};

export default AccountOverview;
