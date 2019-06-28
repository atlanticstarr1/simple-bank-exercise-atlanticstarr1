import React from "react";
import { Flex, Box } from "rimble-ui";
import WriteToOracle from "./WriteToOracle";
import OracleSearcher from "./OracleSearcher";

const Oracle = () => {
  return (
    <Flex>
      <Box flex={1 / 2} mr={3}>
        <WriteToOracle />
      </Box>
      <Box flex={1}>
        <OracleSearcher />
      </Box>
    </Flex>
  );
};

export default Oracle;
