const { createHash } = require('crypto')

// Init genesis block
//--------------------------------------------------------------------------
let data = { tx: "Genesis block", nonce: 0, difficulty: 1, hash: '', prevHash: '' }

console.log("Genesis block:", data)

// String containing as much 0's as the difficulty
//--------------------------------------------------------------------------
let lvlString = ""

let hash = createHash('sha256')
hash.update(JSON.stringify(data))

for (let lvl = 1; true; lvl++) {
    // Setting nonce, difficulty & previous hash
    //--------------------------------------------------------------------------
    data.nonce = 0
    data.prevHash = data.hash
    data.hash = ''
    data.difficulty = lvl
    data.tx = data.difficulty > 1 ? "Block " + lvl : "Genesis block"

    // Filling lvlString with 0's
    //--------------------------------------------------------------------------
    lvlString = new Array(lvl + 1).join('0')


    // Searching a valid hash
    //--------------------------------------------------------------------------
    console.log("\nMining...\n")
    while (data.hash.substr(0, lvl) !== lvlString) {
        data.nonce += 1
        data.hash = hash.copy().digest('hex')
        hash.update(JSON.stringify(data), 'utf-8')
    }

    // Logging
    //--------------------------------------------------------------------------
    console.log("Block:", data)
    console.log("\n------------------------------------------------------------------------------")
}
