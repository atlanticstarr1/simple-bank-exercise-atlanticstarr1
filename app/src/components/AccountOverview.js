import React from "react";
import { Flex, Box, Text, Blockie, QR, PublicAddress } from "rimble-ui";

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
        <Flex border={1} borderColor={"moon-gray"} p={1}>
          <QR value={props.account} size={100} renderAs={"svg"} />
        </Flex>
      </Flex>
      <Box>
        <PublicAddress address={props.account} />
        <Text fontSize={1} color={props.accountBalanceLow ? "red" : "mid-gray"}>
          Balance: {roundedBalance} ETH
        </Text>
      </Box>
    </Flex>
  );
};

export default AccountOverview;
