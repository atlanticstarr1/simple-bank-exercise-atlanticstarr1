import HDWalletProvider from "truffle-hdwallet-provider";

const mnemonic = ""; // Enter the mnemonic for your rinkeby account (testnet deployment only)

export const networks = {
  development: {
    host: "localhost",
    port: 8545,
    network_id: "*" // Match any network id
  },
  rinkeby: {
    provider: function() {
      return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/[your infura link here]");
    },
    network_id: 4
  }
};
