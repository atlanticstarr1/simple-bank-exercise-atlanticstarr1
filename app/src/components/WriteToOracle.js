import React, { useState, useEffect } from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Flex, Box, Button, Form, Card, Heading, Text, Flash } from "rimble-ui";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const WriteToOracle = () => {
  const [price, setPrice] = useState(0);
  const { useCacheSend, useCacheCall } = drizzleReactHooks.useDrizzle();
  const setData = useCacheSend("Lighthouse", "write");
  const tencenteth = useCacheCall("Lighthouse", "peekData");

  const handleChange = e => {
    e.target.parentNode.classList.add("was-validated");
    setPrice(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const nonce = Math.floor(Math.random() * 1000);
    setData.send(price, nonce);
  };

  useEffect(() => {
    if (setData.status) {
      showTransactionToast(setData.status);
    }
  }, [setData.TXObjects.length, setData.status]);

  useEffect(() => {
    if (tencenteth) {
      setPrice(tencenteth.v);
    }
  }, [tencenteth]);

  return (
    <Card maxWidth={"450px"} px={4} mx={"auto"}>
      <Heading>Oracle</Heading>
      <Box>
        <Text mb={3}>Ten cents (USD) worth of ETH.</Text>
      </Box>
      <Form onSubmit={handleSubmit}>
        <Flex>
          <Box alignSelf="center" mt={12} flex="1">
            <Button type="submit">Update price</Button>
          </Box>
          <Box flex="1">
            <Form.Field label="Price (wei)">
              <Form.Input
                type="number"
                min="1"
                required
                width={1}
                onChange={handleChange}
                value={price}
              />
            </Form.Field>
          </Box>
        </Flex>
      </Form>
      <Flash variant="info">
        Current price: <b>{tencenteth && tencenteth.v}</b> wei
      </Flash>
    </Card>
  );
};

export default WriteToOracle;
