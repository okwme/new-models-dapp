
export const workIdFromTokenId = function (tokenId) {
  return ((tokenId - (tokenId % 100)) / 100) + 1
}

export const editionFromTokenId = function (tokenId) {
  let workId = workIdFromTokenId(tokenId)
  return tokenId - ((workId - 1) * 100)
}

export const getNetwork = function (networkId) {
  switch (networkId) {
    case (3) :
      return 'Ropsten'
    case (4) :
      return 'Rinkeby'
    case (47):
      return 'Kovan'
    case (1):
      return 'Mainnet'
    default:
      console.log('unknown network id: ' + networkId)
      return 'unknown'
  }
}
