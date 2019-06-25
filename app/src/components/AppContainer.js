import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  ToastMessage,
  MetaMaskButton
} from "rimble-ui";
import ConnectWallet from "./ConnectWallet";

const AppContainer = () => {
  const [connect, setConnect] = useState(false);
  const connectWallet = () => setConnect(true);

  const renderContent = () => {
    if (connect) {
      return <ConnectWallet />;
    } else {
      return (
        <Box>
          <MetaMaskButton onClick={connectWallet} width={1 / 2} my={4}>
            Connect with MetaMask
          </MetaMaskButton>
        </Box>
      );
    }
  };

  return (
    <Box maxWidth={"800px"} mx={"auto"} p={3}>
      <Flex>
        <Heading.h2 mr={3}>
          <span role="img" aria-label="Waving hand">
            👋
          </span>
        </Heading.h2>
        <Text>
          Welcome to my bank. You can deposit ether, make withrawals anytime and
          best of all, earn daily interest on deposits. You only need a minimum
          balance of 1 USD. Connect your wallet to get started.
        </Text>
      </Flex>
      {renderContent()}
      <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
    </Box>
  );
};

export default AppContainer;
