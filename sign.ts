import { ethers } from "ethers";

const secretKey = "??";
const userAddress = "0x17F407acE786953BeBA62259eE2e08DC9f92BD32";
const message = `This is my address ${userAddress}. I am signing it at 2023-05-01 10:00:00 UTC`;

const main = async (args: string[]): Promise<void> => {
  // load the private key
  const wallet = new ethers.Wallet(secretKey);

  console.log(wallet.address);

  const signature = await wallet.signingKey.sign(
    ethers.keccak256(ethers.toUtf8Bytes(message))
  );
  console.log(signature.compactSerialized);
};

main(process.argv)
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
