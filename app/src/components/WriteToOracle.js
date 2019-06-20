import React, { useState, useEffect } from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Flex, Box, Button, Form } from "rimble-ui";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const WriteToOracle = () => {
  const [ethprice, setEthPrice] = useState(0);

  const { useCacheSend, useCacheCall } = drizzleReactHooks.useDrizzle();
  const setData = useCacheSend("Lighthouse", "write");
  const tencenteth = useCacheCall("Lighthouse", "peekData");

  const handleChange = e => {
    // handle form validation
    e.target.parentNode.classList.add("was-validated");
    setEthPrice(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // get random number bet 0 and 1000
    const nonce = Math.floor(Math.random() * 1000);
    // write to contract
    setData.send(ethprice, nonce);
  };

  useEffect(() => {
    if (setData.status) {
      showTransactionToast(setData.status);
    }
  }, [setData.TXObjects.length, setData.status]);

  return (
    <Form onSubmit={handleSubmit} w={1}>
      <Flex>
        {tencenteth && <Box>Rate: {tencenteth.v}</Box>}
        {tencenteth && !tencenteth.b && <Box>Error in reading rate</Box>}
        <Box p={2} w={1 / 2} alignSelf="center" mt={12}>
          <Button type="submit">Update Price</Button>
        </Box>
        <Box p={2} width={1 / 2}>
          <Form.Field label="10 Cents in ETH">
            <Form.Input
              type="number"
              min="1"
              required
              width={1}
              onChange={handleChange}
              value={ethprice}
            />
          </Form.Field>
        </Box>
      </Flex>
    </Form>
  );
};

export default WriteToOracle;
