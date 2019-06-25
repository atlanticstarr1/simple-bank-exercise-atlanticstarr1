import React from "react";
import useBankContract from "../utils/useBankContract";
import { Flex, Heading, Box, Pill, Table, EthAddress } from "rimble-ui";

const ShowTransactions = () => {
  const {
    account,
    allEvents,
    interestRate,
    bankBalanceEth
  } = useBankContract();

  let accountDeposits =
    allEvents &&
    allEvents.filter(
      a =>
        (a.returnValues.accountAddress === account ||
          a.event === "InterestPaid") &&
        (a.event !== "Enrolled" && a.event !== "ClosedAccount")
    );

  const calculateValue = a => {
    // calculate interest paid
    const dailyInterest = interestRate && 1 + interestRate / 36500;
    const interestPaid =
      bankBalanceEth && bankBalanceEth - bankBalanceEth / dailyInterest;

    if (a.event == "InterestPaid") {
      return parseFloat(interestPaid).toFixed(10);
    } else {
      return parseFloat(a.returnValues[1] / 1e18).toFixed(2);
    }
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
            {accountDeposits &&
              accountDeposits.map(a => (
                <tr key={a.id}>
                  <td>
                    <EthAddress address={a.transactionHash} truncate={true} />
                  </td>
                  <td>
                    <Pill
                      color={
                        a.event == "InterestPaid"
                          ? "green"
                          : a.event == "Deposited"
                          ? "primary"
                          : "red"
                      }
                    >
                      {a.event}
                    </Pill>
                  </td>
                  {/* <td>
                <EthAddress address={a.returnValues[0]} truncate={true} />
              </td> */}
                  <td>{calculateValue(a)} ETH</td>
                  <td>
                    <EthAddress
                      address={
                        a.event === "Deposited"
                          ? a.address
                          : a.event === "Withdrawn"
                          ? a.returnValues[0]
                          : account
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
