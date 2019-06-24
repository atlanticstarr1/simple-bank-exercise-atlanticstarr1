import React, { useEffect, useState } from "react";
import useBankContract from "../utils/useBankContract";
import { Flex, Button, Box, Modal, Card, Heading, Text } from "rimble-ui";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const CloseAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { account, closeAccount } = useBankContract();

  const handleClose = e => {
    e.preventDefault();
    closeAccount.send({ from: account });
  };

  const show = e => {
    e.preventDefault();
    setIsOpen(true);
  };

  const hide = e => {
    e.preventDefault();
    setIsOpen(false);
  };

  useEffect(() => {
    if (closeAccount.status) {
      showTransactionToast(closeAccount.status);
    }
  }, [closeAccount.TXObjects.length, closeAccount.status]);

  return (
    <>
      <Button
        variant="danger"
        onClick={show}
        icon="Cancel"
        iconpos="right"
        mr={3}
      >
        Close account
      </Button>
      <Modal isOpen={isOpen}>
        <Card width={"420px"} p={0}>
          <Box p={4} mb={3}>
            <Heading.h3>Confirm Action</Heading.h3>
            <Text>Are you sure you want to close this account?</Text>
          </Box>

          <Flex
            px={4}
            py={3}
            borderTop={1}
            borderColor={"#E8E8E8"}
            justifyContent={"flex-end"}
          >
            <Button.Outline onClick={hide}>Cancel</Button.Outline>
            <Button ml={3} onClick={handleClose}>
              Confirm
            </Button>
          </Flex>
        </Card>
      </Modal>
    </>
  );
};
export default CloseAccount;
