
import Patches from 'new-models-contracts/Patches'

const Web3 = require('web3')
const BN = Web3.utils.BN
const ZeroClientProvider = require('web3-provider-engine/zero.js')

class Patches {
  constructor (options) {

    this.Patches = null

    this.pollingInterval = null
    this.account = null
    this.unlocked = false
    this.balanceWei = 0
    this.balance = 0
    this.address = 'REPLACE_WITH_CONTRACT_ADDRESS'
    this.genesisBlock = 0
    this.loading = false
    this.options = {
      readonlyRpcURL: 'https://mainnet.infura.io',
      autoInit: true,
      getPastEvents: false,
      watchFutureEvents: false,
      connectionRetries: 3
    }
    Object.assign(this.options, options)
    if (this.options.autoInit) this.initWeb3()
  }

  // hello world : )
  helloWorld () {
    console.log('hello world!')
  }

  /*
   * Connect
   */

  initWeb3 () {
    return new Promise((resolve, reject) => {

      let web3Provider = false

      // check for metamask
      if (global.web3) {
        web3Provider = global.web3.currentProvider
        // attempt to try again if no web3Provider
      } else if (this.options.connectionRetries > 0){
        this.options.connectionRetries -= 1
        setTimeout(() => {
          this.initWeb3().then(resolve).catch((error) => {
            reject(new Error(error))
          })
        }, 1000)
        // revert to a read only version using infura endpoint
      } else {
        this.readOnly = true
        web3Provider = ZeroClientProvider({
          getAccounts: function(){},
          rpcUrl: this.options.readonlyRpcURL
        })
      }

      if (web3Provider) {
        global.web3 = new Web3(web3Provider)
        this.startChecking()

        if (this.options.getPastEvents) this.getPastEvents()
        if (this.options.watchFutureEvents) this.watchFutureEvents()
      }
    })

  }

  /*
   * Check every second for switching network or switching wallet
   */

  startChecking () {
    if (this.pollingInterval) clearInterval(this.pollingInterval)
    this.getGenesisBlock()
    .then(() => {
      this.pollingInterval = setInterval(this.check.bind(this), 1000)
    })
    .catch((err) => {
      throw new Error(err)
    })
  }

  check () {
    this.checkNetwork()
    .then(this.checkAccount.bind(this))
    .catch((error) => {
      console.error(error)
      throw new Error(error)
    })
  }

  checkNetwork () {
    return global.web3.eth.net.getId((err, netId) => {
      if (err) console.error(err)
      if (!err && this.network !== netId) {
        this.network = netId
        return this.deployContract()
      }
    })
  }

  deployContract () {
    if (!this.address || this.address === 'REPLACE_WITH_CONTRACT_ADDRESS') return new Error('Please provide a contract address')
    this.Patches = new global.web3.eth.Contract(Patches.abi, this.address)
  }

  checkAccount () {
    return global.web3.eth.getAccounts((error, accounts) => {
      if (error) throw new Error(error)
      if (accounts.length && this.account !== accounts[0]) {
        this.unlocked = true
        this.account = accounts[0]
      } else if (!accounts.length) {
        this.unlocked = false
        this.account = null
      }
    })
  }


  /*
   * Not Yet Implemented vvvv
   */

  getGenesisBlock () {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  getPastEvents () {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  watchFutureEvents () {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }




  /*
   *
   * Constant Functions
   *
   */

  name () {
    return this.Patches.methods.name().call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  getApproved (_tokenId) {
    return this.Patches.methods.getApproved(new BN(_tokenId, 10)).call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  totalSupply () {
    return this.Patches.methods.totalSupply().call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  tokenOfOwnerByIndex (_owner, _index) {
    return this.Patches.methods.tokenOfOwnerByIndex(_owner, new BN(_index, 10)).call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  exists (_tokenId) {
    return this.Patches.methods.exists(new BN(_tokenId, 10)).call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  tokenByIndex (_index) {
    return this.Patches.methods.tokenByIndex(new BN(_index, 10)).call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  ownerOf (_tokenId) {
    return this.Patches.methods.ownerOf(new BN(_tokenId, 10)).call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  balanceOf (_owner) {
    return this.Patches.methods.balanceOf(_owner).call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  owner () {
    return this.Patches.methods.owner().call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  symbol () {
    return this.Patches.methods.symbol().call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  isApprovedForAll (_owner, _operator) {
    return this.Patches.methods.isApprovedForAll(_owner, _operator).call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  implementation () {
    return this.Patches.methods.implementation().call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  tokenURI (_tokenId) {
    return this.Patches.methods.tokenURI(new BN(_tokenId, 10)).call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  getController () {
    return this.Patches.methods.getController().call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  getMetadata () {
    return this.Patches.methods.getMetadata().call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  getWallet () {
    return this.Patches.methods.getWallet().call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  getBilly () {
    return this.Patches.methods.getBilly().call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  workExists (_workId) {
    return this.Patches.methods.workExists(new BN(_workId, 10)).call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  workArtist (_workId) {
    return this.Patches.methods.workArtist(new BN(_workId, 10)).call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  workSold (_workId) {
    return this.Patches.methods.workSold(new BN(_workId, 10)).call()
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }

  /*
   *
   * Transaction Functions
   *
   */

  approve (_to, _tokenId) {
    if (!this.account) return Promise.reject(new Error('Unlock Account'))
    return this.Patches.methods.approve(_to, new BN(_tokenId, 10)).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  transferFrom (_from, _to, _tokenId) {
    if (!this.account) return Promise.reject(new Error('Unlock Account'))
    return this.Patches.methods.transferFrom(_from, _to, new BN(_tokenId, 10)).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  safeTransferFrom (_from, _to, _tokenId) {
    if (!this.account) return Promise.reject(new Error('Unlock Account'))
    return this.Patches.methods.safeTransferFrom(_from, _to, new BN(_tokenId, 10)).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  setApprovalForAll (_to, _approved) {
    if (!this.account) return Promise.reject(new Error('Unlock Account'))
    return this.Patches.methods.setApprovalForAll(_to, (bool) _approved).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  safeTransferFrom (_from, _to, _tokenId, _data) {
    if (!this.account) return Promise.reject(new Error('Unlock Account'))
    return this.Patches.methods.safeTransferFrom(_from, _to, new BN(_tokenId, 10), _data).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  transferOwnership (newOwner) {
    if (!this.account) return Promise.reject(new Error('Unlock Account'))
    return this.Patches.methods.transferOwnership(newOwner).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  addWork (_workId, _artist) {
    if (!this.account) return Promise.reject(new Error('Unlock Account'))
    return this.Patches.methods.addWork(new BN(_workId, 10), _artist).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  moveEth (_to, amount) {
    if (!this.account) return Promise.reject(new Error('Unlock Account'))
    return this.Patches.methods.moveEth(_to, new BN(amount, 10)).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  moveToken (amount, _to, token) {
    if (!this.account) return Promise.reject(new Error('Unlock Account'))
    return this.Patches.methods.moveToken(new BN(amount, 10), _to, token).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  approveToken (amount, _to, token) {
    if (!this.account) return Promise.reject(new Error('Unlock Account'))
    return this.Patches.methods.approveToken(new BN(amount, 10), _to, token).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  updateArtistAddress (_workId, _artist) {
    if (!this.account) return Promise.reject(new Error('Unlock Account'))
    return this.Patches.methods.updateArtistAddress(new BN(_workId, 10), _artist).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  updateWalletAddress (_wallet) {
    if (!this.account) return Promise.reject(new Error('Unlock Account'))
    return this.Patches.methods.updateWalletAddress(_wallet).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  updateBillyAddress (_billy) {
    if (!this.account) return Promise.reject(new Error('Unlock Account'))
    return this.Patches.methods.updateBillyAddress(_billy).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  updateControllerAddress (_controller) {
    if (!this.account) return Promise.reject(new Error('Unlock Account'))
    return this.Patches.methods.updateControllerAddress(_controller).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  updateMetadataAddress (_metadata) {
    if (!this.account) return Promise.reject(new Error('Unlock Account'))
    return this.Patches.methods.updateMetadataAddress(_metadata).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  mint (_to, _tokenId) {
    if (!this.account) return Promise.reject(new Error('Unlock Account'))
    return this.Patches.methods.mint(_to, new BN(_tokenId, 10)).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  unmint (_tokenId) {
    if (!this.account) return Promise.reject(new Error('Unlock Account'))
    return this.Patches.methods.unmint(new BN(_tokenId, 10)).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }

  /*
   *
   * Events
   *
   */




}

module.exports = Patches
