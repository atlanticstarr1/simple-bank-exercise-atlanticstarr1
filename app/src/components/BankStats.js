import React, { useEffect } from "react";
import {
  Heading,
  Box,
  Text,
  Flex,
  PublicAddress,
  Card,
  Pill,
  QR
} from "rimble-ui";
import NetworkIndicator from "@rimble/network-indicator";
import useBankContract from "../utils/useBankContract";
import ethToUsd from "../utils/ethToUsd";

const BankStats = () => {
  const {
    drizzleState,
    minBalanceEth,
    minBalanceUsd,
    interestRate,
    contractBalanceEth,
    contractAddress,
    oneUsdInEther
  } = useBankContract();

  return (
    <Card mx={"auto"} px={4}>
      <Flex mb={4}>
        <Box flex={1 / 2}>
          <NetworkIndicator
            currentNetwork={drizzleState.web3.networkId}
            requiredNetwork={5777}
          />
        </Box>
        <Box flex={1}>
          <Heading.h4>Welcome to XYZ Bank</Heading.h4>
        </Box>
      </Flex>
      <Flex mb={3}>
        <Box flex={1}>
          <Text>Get paid daily</Text>
          <Pill color="primary">{interestRate}% INTEREST</Pill>
        </Box>
        <Box flex={1}>
          <Text>Minimum deposit</Text>
          <Pill color="primary">
            ${minBalanceUsd} USD (~{minBalanceEth} ETH)
          </Pill>
        </Box>
        <Box flex={1}>
          <Text>Trusted with</Text>
          <Pill color="green">
            ${ethToUsd(oneUsdInEther, contractBalanceEth)} USD (~
            {contractBalanceEth} ETH)
          </Pill>
        </Box>
      </Flex>
      <Flex mr={3}>
        <Box flex={1}>
          <Flex alignItems={"flex-start"}>
            <Flex mr={3}>
              <Flex>
                {contractAddress && (
                  <QR value={contractAddress} size={100} renderAs={"svg"} />
                )}
              </Flex>
            </Flex>
            <Box flex={1}>
              <PublicAddress address={contractAddress} />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};
export default BankStats;
