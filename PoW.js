const { createHash } = require('crypto')

let hash = createHash('sha256')
let data = "Alex"

hash.update(data)
console.log("----------------------------------------------------------------")
for (let lvl = 1; true; lvl++) {
    let lvlString = ""
    let nonce = 0
    console.log("Data:", data)
    console.log("0 bits: ", lvl)
    for (let i = 0; i < lvl; i++) {
        lvlString = lvlString + "0"
    }
    console.log("Mining...\n")
    while (hash.copy().digest('hex').substr(0, lvl) !== lvlString) {
        hash = createHash('sha256')
        nonce += 1
        hash.update(data + nonce, 'utf-8')
    }
    console.log("One solution:", data + nonce)
    data = hash.copy().digest('hex')
    console.log("Hash:", data, "\nNonce value:", nonce)
    console.log("----------------------------------------------------------------\n")
}