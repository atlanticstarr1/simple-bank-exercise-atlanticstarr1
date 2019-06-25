import React from "react";
import useBankContract from "../utils/useBankContract";
import { Flex, Heading, Box, Pill, Table, EthAddress } from "rimble-ui";

const ShowTransactions = () => {
  const { account, allEvents } = useBankContract();

  let events =
    allEvents &&
    allEvents.filter(
      a =>
        a.returnValues.accountAddress === account &&
        (a.event !== "Enrolled" && a.event !== "ClosedAccount")
    );

  const calculateValue = a => {
    return parseFloat(a.returnValues[1] / 1e18).toFixed(2);
  };

  return (
    <Flex flexDirection={"column"}>
      <Box flex={1} my={2}>
        <Heading.h4>History</Heading.h4>
      </Box>
      <Box flex={1}>
        <Table>
          <thead>
            <tr>
              <th>Tx Hash</th>
              <th>Event</th>
              <th>Value</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {events &&
              events.map(a => (
                <tr key={a.id}>
                  <td>
                    <EthAddress address={a.transactionHash} truncate={true} />
                  </td>
                  <td>
                    <Pill color={a.event == "Deposited" ? "primary" : "red"}>
                      {a.event}
                    </Pill>
                  </td>
                  <td>{calculateValue(a)} ETH</td>
                  <td>
                    <EthAddress
                      address={
                        a.event === "Deposited" ? a.address : a.returnValues[0]
                      }
                      truncate={true}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Box>
    </Flex>
  );
};
export default ShowTransactions;
