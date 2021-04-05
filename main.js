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
}

let savjeeCoin = new Blockchain();
savjeeCoin.addBlock(new Block(1, "10/07/2017", { amount: 4 }));
savjeeCoin.addBlock(new Block(2, "12/07/2017", { amount: 10 }));

console.log(JSON.stringify(savjeeCoin, null, 4));