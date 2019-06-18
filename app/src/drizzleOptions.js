// Import contracts
import Lighthouse from "./contracts/Lighthouse.json";
import SimpleBank from "./contracts/SimpleBank.json";

const options = {
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