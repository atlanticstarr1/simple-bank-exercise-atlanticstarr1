// convert eth to usd
const ethToUsd = (rate, ethBal) => {
  const usdPrice = parseFloat(ethBal / rate).toFixed(2);
  return usdPrice;
};

export default ethToUsd;
