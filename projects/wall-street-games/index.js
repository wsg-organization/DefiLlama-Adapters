const abi = require("./abi.json");
const { sumTokensExport } = require('../helper/unwrapLPs');

const WSG_TOKEN_CONTRACT = '0xEf04804E1e474D3F9B73184D7ef5D786F3Fce930';
const WSG_LOCKED_POOL_CONTRACT = '0x1fBcff4eBaEFc7AC387c286d6e484e871c2991f2';

async function tvl(_, _1, _2, { api }) {
    const stakingBalance = await api.call({
        abi: abi.totalDeposited,
        target: WSG_LOCKED_POOL_CONTRACT,
        params: [],
    });
    api.add(WSG_TOKEN_CONTRACT, stakingBalance)
}

const stakingContracts = [
    "0x1fBcff4eBaEFc7AC387c286d6e484e871c2991f2"
];

module.exports = {
    methodology: 'counts the number of WSG tokens in the locked pool contract.',
    arbitrum: {
        tvl,
        staking: sumTokensExport({ owners: stakingContracts, tokens: [WSG_TOKEN_CONTRACT] })
    }
}; 