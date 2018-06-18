<template>
  <div>
    <template v-if="account === admin && admin">
      <form enctype="multipart/form-data" class="submitForm" @submit.prevent="submitAddWork" >
        <div>
          <input type="text" placeholder="artist address" v-model="artist" >
        </div>
        <div>
          <input type="number" placeholder="series number" step="1" v-model="workId">
        </div>
         <div>
          <input ref="file" type="file" v-on:change="imageChanged">
        </div>
        <div>
          <img v-if="showImage" :src="cloud + workId">
        </div>
         <div>
          <input type="password" v-model="password" placeholder="password">
        </div>
        <div>
          <input type="text" readonly v-model="hash" placeholder="image hash">
        </div>
         <div>
          <input type="submit">
        </div>
      </form>
      <div class="reservations" >
        <form @submit.prevent="submitReserved(work.workId)" v-for="work in works" :key="work.workId">
          <h2>WorkId: {{work.workId}}</h2>
          <input v-if="!claimed(work.workId)" type="submit" value="claim reserved">
          {{workPatches[work.workId-1].length}} Registered
          <br>
          <br>
          <code>{{work.workHash}}</code>
          <img :src="cloud + work.workId">
        </form>
      </div>
      </template>
      <template v-else>
        <h2>Sorry bud</h2>
      </template>
    </div>
</template>

<script>
import utils from 'web3-utils'
import {arrayBufferToBlob, blobToBase64String} from 'blob-util'
import axios from 'axios'
import {mapActions, mapState, mapGetters} from 'vuex'
export default {

  name: 'Admin',

  data () {
    return {
      password: null,
      workId: null,
      artist: null,
      image: null,
      hash: null,
      showImage: false,
      cloud: 'https://res.cloudinary.com/dszcbwdrl/image/upload/'
    }
  },
  computed: {
    ...mapState(['works', 'Patches', 'account', 'admin', 'patches']),
    ...mapGetters(['workPatches'])
  },
  mounted () {
    this.workId = this.works.length + 1
  },
  watch: {
    works () {
      this.workId = this.works.length + 1
    }
  },
  methods: {
    ...mapActions(['addWork', 'queryWorks', 'reserved']),
    async imageChanged (e) {
      this.showImage = false
      console.log(e.target.files[0])
      if (e.target.files.length) {
        try {
          var file = e.target.files[0]

          var fileReader = new FileReader()
          fileReader.onloadend = async (e) => {
            var arrayBuffer = e.target.result
            let response = await axios.post('/cloudinary', {password: this.password, workId: this.workId})
            console.log(response)

            let blob = arrayBufferToBlob(arrayBuffer, file.type)
            let base64 = await blobToBase64String(blob)

            let soldityHash = await utils.soliditySha3(base64)
            this.hash = soldityHash

            await axios.post('https://api.cloudinary.com/v1_1/dszcbwdrl/auto/upload', {
              file: 'data:' + file.type + ';base64,' + base64,
              api_key: '447929525935753',
              public_id: response.data.workId + '',
              timestamp: response.data.timestamp,
              invalidate: true,
              signature: response.data.signature
            })
            this.showImage = true
          }
          fileReader.readAsArrayBuffer(file)
        } catch (error) {
          console.log(error)
        }
      } else {
        this.hash = null
      }
    },
    claimed (workId) {
      return this.workPatches && this.workPatches[workId - 1].patches.length === 10
    },
    submitAddWork () {
      if (!this.workId || !this.artist || !this.hash) {
        alert('please fill out all fields')
        return
      }
      this.addWork({workId: this.workId, artist: this.artist, hash: this.hash}).then(() => {
        this.resetForm()
      }).catch((error) => {
        console.log(error)
      })
    },
    submitReserved (workId) {
      this.reserved(workId)
    }
  }
}

</script>

<style lang="scss">
.submitForm {
  padding:20px;
  input {
    margin: 5px;
    padding: 3px;
    font-size: 1.2em;
    width: 480px;
  }
}
.reservations {
  text-align: left;
  form {
    background-color: rgba(255, 255, 255,0.6);
    color: black;
    position:relative;
    width: 300px;
    height: 300px;
    padding: 20px;
    margin: 3px;
    border: 1px solid black;
    display: inline-block;
    code {
      max-width:100%;
      word-wrap: break-word;
    }
  }
  img {
    max-width: 100%;
    position:absolute;
    top:0px;
    left:0px;
    width:300px;
    max-height:300px;
    z-index: -1;
  }
}
</style>
