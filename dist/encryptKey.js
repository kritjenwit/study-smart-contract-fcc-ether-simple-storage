"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const fs_extra_1 = __importDefault(require("fs-extra"));
require("dotenv/config");
const main = async () => {
    const wallet = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY);
    const encryptedJsonKey = await wallet.encrypt(process.env.PRIVATE_KEY_PASSWORD, process.env.PRIVATE_KEY);
    console.log(encryptedJsonKey);
    fs_extra_1.default.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
};
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=encryptKey.js.map