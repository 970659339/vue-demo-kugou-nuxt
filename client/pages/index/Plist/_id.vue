<template>
  <div class="rank-info-content plist-info">
    <div class="rank-banner-wrap"
         :style="{backgroundImage: `url(${imgUrl})`}">
    </div>

    <div class="plist-desp container">
      <p class="plist-desp-p" :class="{'plist-desp-hide': hideDesp }">{{desp}}</p>
      <img src="~/assets/images/close_icon.png" alt="" @click="toggleDesp" class="plist-desp-icon" v-if="hideDesp">
      <img src="~/assets/images/open_icon.png" alt="" @click="toggleDesp" class="plist-desp-icon" v-else>
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
    head(){
      return {
        title: 'vue-kugou | ' + this.title
      }
    },
    scrollToTop: true,
    data() {
      return {
        hideDesp: true,
        opacity: 0
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.commit('showHead', true)
        window.onscroll = () => {
          vm.opacity = window.pageYOffset / 250
          vm.$store.commit('setHeadStyle', {background: `rgba(43,162,251,${vm.opacity})`})
        }
      })
    },
    beforeRouteLeave(to, from, next) {
      this.$store.commit('showHead', false)
      this.$store.commit('resetHeadStyle')
      window.onscroll = null
      next()
    },
    async asyncData({params, app, store}) {
      const {data} = await app.$axios.get(`/@m.kugou.com/plist/list/${params.id}?json=true`)
      const info = data.info.list
      const list = data.list.list.info
      store.commit('setHeadTitle', info.specialname)
      return {
        songList: list,
        imgUrl: info.imgurl.replace('{size}', '400'),
        desp: info.intro,
        title: info.specialname
      }
    },
    methods: {
      toggleDesp() {
        this.hideDesp = !this.hideDesp
      }
    }
  }
</script>

<style scoped>
  .rank-banner-wrap {
    height: 250px;
    background-size: 100%
  }
</style>

