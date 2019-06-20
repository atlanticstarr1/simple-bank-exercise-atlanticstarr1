const getTransaction = txObject => {
  const receipt =
    txObject[txObject.length - 1] && txObject[txObject.length - 1].receipt;
  return receipt;
};

export default getTransaction;
