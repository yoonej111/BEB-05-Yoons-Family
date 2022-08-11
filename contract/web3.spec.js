require("dotenv/config");
const { totalSupply, getNftTokens, mintNFT } = require("./web3");
const { expect } = require("chai");

describe("web3 test", function () {
    this.timeout(10 * 1000);
    it("totalSupply success case", async function () {
        const count = await totalSupply();
        expect(count > 0).to.be.true;
    });

    it("getNftTokens success case", async function () {
        const result = await getNftTokens();
        expect(result.length > 0).to.be.true;
    });

    it("mintNFT success case", async function () {
        const imgURL =
            "https://postfiles.pstatic.net/MjAyMjAyMTFfMTM5/MDAxNjQ0NTY1MjI3MTA0.c0k_qWw3ZZGK-lHWgOb8yz9Ep60yVmhAvzz_3jpH5Gkg.v0J4igg15744j12K267M6szeInJMa5ZKn4wjRXn4Pwwg.JPEG.yoonej111/20211120_180839.jpg?type=w773";
        const result = await mintNFT(imgURL);
    });
});
