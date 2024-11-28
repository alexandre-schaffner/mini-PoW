// Init genesis block
//--------------------------------------------------------------------------
const block = {
  header: {
    number: 0,
    difficulty: 5,
    nonce: 0,
    hash: '',
    prevHash: ''
  },
  data: "Genesis block"
}

// Fraudulent block
//--------------------------------------------------------------------------
// let block = {
//   header: {
//     number: 3,
//     difficulty: 5,
//     nonce: 0,
//     hash: '',
//     prevHash: '00000833199e88fbb299de42946422c09a2619efe43614036896dc3ac1e3acaf'
//   },
//   data: '😈 Fraudulent data'
// }

console.log(
  'Genesis block:',
  block,
  "\n\n--------------------------------------------------------------------------------")

// String containing as much 0's as the difficulty
//--------------------------------------------------------------------------
let lvlString = ""

const hasher = new Bun.CryptoHasher("sha256");
hasher.update(JSON.stringify(block))

while (true) {

  // Filling lvlString with 0's
  //--------------------------------------------------------------------------
  lvlString = new Array(block.header.difficulty + 1).join('0')

  // Searching a valid hash
  //--------------------------------------------------------------------------
  console.log("\n⛏️ Mining...\n")
  while (block.header.hash.substr(0, block.header.difficulty) !== lvlString) {
    block.header.nonce += 1
    block.header.hash = hasher.copy().digest('hex')
    hasher.update(JSON.stringify(block), 'utf-8')
  }

  // Logging
  //--------------------------------------------------------------------------
  console.log(`🎉 Block #${block.header.number} mined !`)
  console.log('Block: ', block)
  console.log("\n------------------------------------------------------------------------------")

  // Setting block for next iteration
  //--------------------------------------------------------------------------
  block.header.number++;
  block.header.nonce = 0
  block.header.prevHash = block.header.hash !== ''
    ? block.header.hash
    : block.header.prevHash;
  block.header.hash = '';
  block.header.difficulty = block.header.number % 5
    ? block.header.difficulty
    : block.header.difficulty + 1;
  block.data = block.header.difficulty > 1
    ? `Block ${block.header.number}`
    : "Genesis block";
}
