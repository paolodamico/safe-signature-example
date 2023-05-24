import { ethers } from "ethers";

const CONTRACT_ABI = [
  "function checkSignatures (bytes32 dataHash, bytes memory data, bytes memory signatures) public view",
];

const userAddress = "0x17F407acE786953BeBA62259eE2e08DC9f92BD32";
const message = `This is my address ${userAddress}. I am signing it at 2023-05-01 10:00:00 UTC`;
const signature =
  "0x0e75ec83c9a35d02191cb6e72d515312b943f8ba3b87bdcb6037ca1f1bbd6b021c4280fbacd042037bbb0dd3155e58dca4cdddd1cded40cd8c0f4f5086638bc01b";

const main = async (args: string[]): Promise<void> => {
  console.log(args);
  const provider = new ethers.AlchemyProvider(
    "matic",
    process.env.ALCHEMY_API_KEY
  );

  console.log(ethers.keccak256(ethers.toUtf8Bytes(message)));

  const contract = new ethers.Contract(userAddress, CONTRACT_ABI, provider);
  const output = await contract.checkSignatures(
    ethers.keccak256(ethers.toUtf8Bytes(message)),
    ethers.toUtf8Bytes(message),
    signature
  );
  console.log(output);
};

main(process.argv)
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
