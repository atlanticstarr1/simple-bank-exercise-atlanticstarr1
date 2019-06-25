import React, { useState, useEffect, useMemo } from "react";
import useBankContract from "../utils/useBankContract";
import { Flex, Heading, Box, Pill, Table, EthAddress, Link } from "rimble-ui";

const ShowTransactions = () => {
  const [time, setTime] = useState(null);
  const { account, allEvents, web3 } = useBankContract();

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

  // const getTransactionTime = async blockNumber => {
  //   return await web3.eth.getBlock(blockNumber).timestamp;
  // };

  // const getTxTime = async () => {
  //   return await Promise.all(
  //     allEvents && allEvents.map(item => getTransactionTime(item.blockNumber))
  //   );
  // };

  // //useMemo(getTxTime, [events]);
  // useEffect(() => {
  //   if (allEvents) {
  //     const data = getTxTime();
  //     console.log(data);
  //   }
  // }, [allEvents]);

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
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {events &&
              events.map(a => (
                <tr key={a.id}>
                  <td>
                    <Link
                      href={"//rinkeby.etherscan.io/tx/" + a.transactionHash}
                      target="_blank"
                    >
                      <EthAddress address={a.transactionHash} truncate={true} />
                    </Link>
                  </td>
                  <td>
                    <Pill color={a.event === "Deposited" ? "primary" : "red"}>
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
                  {/* <td>{time}</td> */}
                </tr>
              ))}
          </tbody>
        </Table>
      </Box>
    </Flex>
  );
};
export default ShowTransactions;
