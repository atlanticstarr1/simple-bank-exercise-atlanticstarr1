// Import contracts
import Lighthouse from "./contracts/Lighthouse.json";
import SimpleBank from "./contracts/SimpleBank.json";

const options = {
  polls: {
    accounts: 3000
  },
  syncAlways: true,
  events: {
    SimpleBank: ["InterestPaid"]
  },
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545"
    }
  },
  contracts: [Lighthouse, SimpleBank]
};

export default options;
