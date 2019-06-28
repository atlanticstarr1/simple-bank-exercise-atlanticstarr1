import React, { useState, useEffect } from "react";
import { Flex, Box, Button, Form, Card, Heading, Text } from "rimble-ui";
import useOracle from "../utils/useOracle";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const OracleSearcher = () => {
  const [seeker, setSeeker] = useState("");
  const { changeSearcher } = useOracle();

  const handleChange = e => {
    e.target.parentNode.classList.add("was-validated");
    setSeeker(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    changeSearcher.send(seeker);
  };

  useEffect(() => {
    if (changeSearcher.status) {
      showTransactionToast(changeSearcher.status);
    }
  }, [changeSearcher.TXObjects.length, changeSearcher.status]);

  return (
    <>
      <Text>Contract to be alerted when lighhouse data changes.</Text>
      <Form onSubmit={handleSubmit}>
        <Flex flexDirection="column">
          <Form.Field label="Searcher address">
            <Form.Input
              type="text"
              required
              width={1}
              onChange={handleChange}
              value={seeker}
            />
          </Form.Field>
          <Button size={"small"} type="submit">
            Set address
          </Button>
        </Flex>
      </Form>
    </>
  );
};

export default OracleSearcher;
