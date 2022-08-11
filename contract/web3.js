const { erc721Abi } = require("./erc721Abi");
const Web3 = require("web3");
const contract_addr = process.env.CONTRACT_ADDR;
const abi = erc721Abi;

const Provider = require("@truffle/hdwallet-provider");
const rpcURL = process.env.RPC_URL; // 원격 이더리움 노드에 접속할 수 있는 주소
const privKey = process.env.PRIV_KEY;
const account = process.env.WALLET_ADDR;

const provider = new Provider(privKey, rpcURL);
const web3 = new Web3(provider);
const myContract = new web3.eth.Contract(abi, contract_addr);

/**
 *
 * @returns
 * @description The totalSupply() function returns the total supply of the tokens.
 */
async function totalSupply() {
    try {
        const result = await myContract.methods
            .totalSupply()
            .call({ from: account });
        console.log(result);
        return result;
    } catch (e) {
        console.log(e);
        return e;
    }
}

/**
 *
 * @returns
 * @description getNftTokens, 유저가 보유하고 있는 NFT 토큰들을 리턴
 */
async function getNftTokens() {
    try {
        const result = await myContract.methods
            .getNftTokens(account)
            .call({ from: account });
        console.log(result);
        return result;
    } catch (e) {
        console.log(e);
        return e;
    }
}

async function mintNFT(imgURL) {
    try {
        const result = await myContract.methods
            .mintNFT(account, imgURL)
            .send({ from: account });
        console.log("~~~", result);
        return result;
    } catch (e) {
        console.log(e);
        return e;
    }
}

module.exports = {
    totalSupply,
    getNftTokens,
    mintNFT,
};

// web3.eth
//     .getBalance(account)
//     .then((bal) => {
//         console.log(`지갑 ${account}의 잔액은... ${bal} wei 입니다.`);
//         return web3.utils.fromWei(bal, "ether"); //eth로 단위 변경
//     })
//     .then((eth) => {
//         console.log(`이더 단위로는 ${eth} ETH 입니다.`);
//     });
