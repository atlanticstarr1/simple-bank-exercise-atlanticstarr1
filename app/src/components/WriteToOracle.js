import React, { useState, useEffect } from "react";
import { Flex, Box, Button, Form, Card, Heading, Text } from "rimble-ui";
import useOracle from "../utils/useOracle";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const WriteToOracle = () => {
  const [price, setPrice] = useState(340000000000000);
  const { value, write } = useOracle();

  const handleChange = e => {
    e.target.parentNode.classList.add("was-validated");
    setPrice(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const nonce = Math.floor(Math.random() * 1000);
    write.send(price, nonce);
  };

  useEffect(() => {
    if (write.status) {
      showTransactionToast(write.status);
    }
  }, [write.TXObjects.length, write.status]);

  useEffect(() => {
    setPrice(value);
  }, [value]);

  // START OF DEMO
  // DEMO PURPOSES ONLY - THE ORACLE WILL UPDATE ITS DATA ONCE PER 30 SECONDS. IN REALITY
  // THIS WILL BE A DAY
  useEffect(() => {
    const interval = setInterval(() => {
      const nonce = Math.floor(Math.random() * 1000);
      write.send(price, nonce);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  // END OF DEMO

  const ethprice = parseFloat(value / 1e18).toFixed(5);
  return (
    <div>
      <Box>
        <Text>Ten cents (USD) worth of Ether.</Text>
      </Box>
      <Box my={3}>
        <Text fontSize={"1.5rem"} fontWeight={1} textAlign={"center"}>
          {value} wei
        </Text>
        <Text textAlign={"center"}>(~{ethprice} ETH)</Text>
      </Box>
      <Form onSubmit={handleSubmit}>
        <Flex flexDirection="column">
          <Form.Field label="Price (wei)">
            <Form.Input
              type="number"
              step="any"
              min="1"
              max={1e18}
              required
              width={1}
              onChange={handleChange}
              value={price}
            />
          </Form.Field>
          <Button type="submit">Update price</Button>
        </Flex>
      </Form>
    </div>
  );
};

export default WriteToOracle;
