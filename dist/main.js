"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const fs_extra_1 = __importDefault(require("fs-extra"));
require("dotenv/config");
const main = async () => {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const abi = fs_extra_1.default.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
    const binary = fs_extra_1.default.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");
    const contractFactory = new ethers_1.ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying, please wait ...");
    const contract = await contractFactory.deploy();
    await contract.deployTransaction.wait(1);
    console.log(`Contract Address: ${contract.address}`);
    const currentFavoriteNumber = await contract.retrieve();
    console.log(`Currenct favorite number: ${currentFavoriteNumber.toString()}`);
    const transactionResponse = await contract.store("142536");
    await transactionResponse.wait();
    const updatedFavoriteNumber = await contract.retrieve();
    console.log(`Updated favorite number: ${updatedFavoriteNumber.toString()}`);
};
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map