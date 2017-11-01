<template>
  <div class="rank-info-content plist-info">
    <div class="rank-banner-wrap" :style="{backgroundImage: `url(${imgurl})`}">
    </div>

    <div class="plist-desp container">
      <p class="plist-desp-p" :class="{'plist-desp-hide': hideDesc }">{{desc}}</p>
      <img src="~/assets/images/close_icon.png" @click="toggleDesc" class="plist-desp-icon" v-if="hideDesc">
      <img src="~/assets/images/open_icon.png" @click="toggleDesc" class="plist-desp-icon" v-else>
    </div>
    <div class="plist-desp-bottom" style="width: 100%;height: 5px;background-color: #f1f1f1"></div>

    <div class="rank-info-list">
      <mt-cell v-for="(item,index) in songList" :title="item.filename" @click.native="playAudio(index)" :key="index">
        <img src="~/assets/images/download_icon.png" width="20" height="20">
      </mt-cell>
    </div>
  </div>
</template>
<script>
  import { PLAY_AUDIO } from '~/mixins/index'

  export default {
    mixins: [PLAY_AUDIO],
    scrollToTop: true,
    head(){
      return {
        title: 'vue-kugou | ' + this.title
      }
    },
    data() {
      return {
        updateTime: '',
        hideDesc: true,
        opacity: 0
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.commit('showHead', true)
        vm.$store.commit('resetHeadStyle')
        window.onscroll = () => {
          vm.opacity = window.pageYOffset / 250
          vm.$store.commit('setHeadStyle', {background: `rgba(43,162,251,${vm.opacity})`})
        }
      })
    },
    beforeRouteLeave(to, from, next) {
      window.onscroll = null
      next()
    },
    async asyncData({app, params, store}){
      store.commit('setHeadNav', 'head-nav4')
      const {data} = await app.$axios.get(`/@m.kugou.com/singer/info/${params.id}&json=true`)
      const info = data.info
      const songList = data.songs.list
      store.commit('setHeadTitle', info.singername)

      return {
        imgurl: info.imgurl.replace('{size}', '400'),
        desc: info.intro,
        songList: songList,
        title: info.singername
      }
    },
    methods: {
      toggleDesc() {
        this.hideDesc = !this.hideDesc
      }
    }
  }
</script>
<style scoped>
  .rank-banner-wrap {
    height: 250px;
  }
</style>
