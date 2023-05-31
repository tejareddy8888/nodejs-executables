const bip39 = require("bip39");
const ethers = require("ethers");

async function main() {
  let mnemonic = "";
  if (process.argv.indexOf("--mnemonic") > -1) {
    const indexValue = process.argv.indexOf("--mnemonic");
    if (!process.argv[indexValue + 1]) {
        throw new Error("Mnemonic value after flag is empty.");
    }
    mnemonic = process.argv[indexValue + 1];
  } else {
    throw new Error("Mnemonic flag is not given.");
  }
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const hdNode = ethers.utils.HDNode.fromSeed(seed);
  console.log(
    `Derived privateKey for given mnemonic: ${hdNode.privateKey}`
  );
  return;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
