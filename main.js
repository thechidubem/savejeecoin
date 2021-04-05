const SHA256 = require("crypto-js/sha256");

// This is a class.
class Block {
    // This is a constructor.
    constructor(index, timestamp, data, perviousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.perviousHash = perviousHash;
        this.hash = this.calculateHash();
    }

    // This is a method.
    calculateHash() {
        return SHA256(this.index + this.perviousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

// This is a class.
class Blockchain {
    // This is a constructor.
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    // This is a method.
    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }

    // This is a method.
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // This is a method.
    addBlock(newBlock) {
        newBlock.perviousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    // This is a method.
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.perviousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let savjeeCoin = new Blockchain();
savjeeCoin.addBlock(new Block(1, "10/07/2017", { amount: 4 }));
savjeeCoin.addBlock(new Block(2, "12/07/2017", { amount: 10 }));

// console.log("Is blockchain valid? " + savjeeCoin.isChainValid());
// savjeeCoin.chain[1].data = { amount: 100 };
// savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculateHash(); 
// console.log("Is blockchain valid? " + savjeeCoin.isChainValid());

console.log(JSON.stringify(savjeeCoin, null, 4));
console.log("Is blockchain valid? " + savjeeCoin.isChainValid()); // Testing to see if it blockchain is vaild.