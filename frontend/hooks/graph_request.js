const graphKey = secrets.graphKey;
const graphRequest = Functions.makeHttpRequest({
  url: `https://gateway-arbitrum.network.thegraph.com/api/${graphKey}/subgraphs/id/HUZDsRpEVP2AvzDCyzDHtdc64dyDxx8FQjzsmqSg4H3B`,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  data: {
    query: /* GraphQL */ `
      query PoolDayDatas($pool: String!) {
        poolDayDatas(
          first: 3
          orderBy: date
          orderDirection: desc
          where: { pool: $pool }
        ) {
          id
          liquidity
          date
          volumeUSD
          tick
        }
      }
    `,
    variables: {
      pool: poolAddress,
    },
  },
});

const [graphResponse] = await Promise.all([graphRequest]);
let liquidities = [];
if (!graphResponse.error) {
  for (let i = 0; i < 3; i++) {
    liquidities.push(graphResponse.data.data.poolDayDatas[i].liquidity);
  }
} else {
  console.log("graphReponse Error, ", graphResponse);
}

if (liquidities[0] > liquidities[1] && liquidities[0] > liquidities[2]) {
  console.log("liquidity is increasing");
  return Functions.encodeUint256(1);
}
return Functions.encodeUint256(0);
