<template>
  <div>
    <mt-swipe :auto="5000">
      <mt-swipe-item v-for="(banner, index) in banners" :key="index">
        <a :href="banner.extra.tourl">
          <img :src="banner.imgurl" :title="banner.title">
        </a>
      </mt-swipe-item>
    </mt-swipe>

    <mt-cell v-for="(song, index) in songList" :title="song.filename" @click.native="playAudio(index)" :key="index">
      <img src="~/assets/images/download_icon.png" width="20" height="20">
    </mt-cell>
  </div>
</template>

<script>
  import { PLAY_AUDIO } from '~/mixins/index'

  export default {
    mixins: [PLAY_AUDIO],
    head: {
      title: 'vue-kugou | 新歌'
    },
    data() {
      return {
        banners: [],
        songList: []
      }
    },
    created() {
      this.getSongs()
      this.$store.commit('setHeadNav', 'head-nav1')
    },
    methods: {
      getSongs() {
        this.$axios.get('/@m.kugou.com?json=true').then(({data}) => {
          this.banners = data.banner
          this.songList = data.data
        })
      }
    }
  }
</script>
<style>
  .mint-swipe {
    height: 39vw !important;
  }

  .mint-swipe-indicator {
    width: 12px !important;
    height: 12px !important;
  }

  .mint-swipe-indicators {
    bottom: 5px !important;
  }
</style>
