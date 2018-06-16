
export const workIdFromTokenId = function (tokenId) {
  return ((tokenId - (tokenId % 100)) / 100) + 1
}

export const editionFromTokenId = function (tokenId) {
  let workId = workIdFromTokenId(tokenId)
  return tokenId - ((workId - 1) * 100)
}
