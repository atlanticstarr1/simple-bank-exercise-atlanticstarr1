import React, { useState, useEffect } from "react";
import { Flex, Box, Card, Heading } from "rimble-ui";
import WriteToOracle from "./WriteToOracle";
import OracleSearcher from "./OracleSearcher";

const Oracle = () => {
  return (
    <Card maxWidth={"640px"} px={4} mx={"auto"}>
      <Heading.h4>Oracle</Heading.h4>
      <Flex flexDirection={"column"}>
        <Box flex={1}>
          <WriteToOracle />
        </Box>
        <Box flex={1}>
          <OracleSearcher />
        </Box>
      </Flex>
    </Card>
  );
};

export default Oracle;
