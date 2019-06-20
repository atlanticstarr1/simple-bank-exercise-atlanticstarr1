import React, { useEffect } from "react";
import TransactionToastMessages from "./TransactionToastMessages";
import { ToastMessage } from "rimble-ui";

export const showTransactionToast = txStatus => {
  let toastMeta = getTransactionToastMeta(txStatus);

  // Show toast
  window.toastProvider.addMessage(".", toastMeta);
};

const getTransactionToastMeta = txStatus => {
  let transactionToastMeta = {};

  switch (txStatus) {
    case "initialized":
      transactionToastMeta = TransactionToastMessages.initialized;
      break;
    case "started":
      transactionToastMeta = TransactionToastMessages.started;
      break;
    case "pending":
      transactionToastMeta = TransactionToastMessages.pending;
      break;
    case "confirmed":
      transactionToastMeta = TransactionToastMessages.confirmed;
      break;
    case "success":
      transactionToastMeta = TransactionToastMessages.success;
      break;
    case "error":
      transactionToastMeta = TransactionToastMessages.error;
      break;
    default:
      break;
  }

  return transactionToastMeta;
};
