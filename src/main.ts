import { ethers } from "ethers";
import fs from "fs-extra";
import "dotenv/config";

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait ...");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);
  console.log(`Contract Address: ${contract.address}`);

  // Get number
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
