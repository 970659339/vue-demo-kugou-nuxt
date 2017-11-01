<template>
  <div class="rank-info-content">
    <div class="rank-banner-wrap" :style="{backgroundImage:'url('+ imgurl + ')'}">
      <div class="rank-status container">
        <p>上次更新时间：{{getToday()}}</p>
      </div>
    </div>

    <div class="rank-info-list">
      <mt-cell v-for="(item,index) in songList" :title="item.filename" @click.native="playAudio(index)" :key="index">
        <span class="rank-index"
              :class="{'rank-list-good' : index<3, 'rank-list-first' : index==0, 'rank-list-second' : index==1, 'rank-list-third' : index==2}">{{index + 1}}</span>
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
        updateTime: '',
        opacity: 0
      }
    },
    //通过路由的before钩子解除router-view缓存限制
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
    async asyncData({app, params, store}) {
      const {data} = await app.$axios.get(`/@m.kugou.com/rank/info/?rankid=${params.id}&page=1&json=true`)
      const {info, songs} = data
      const {banner7url, rankname} = info
      const {list} = songs
      store.commit('setHeadTitle', rankname)
      return {
        imgurl: banner7url.replace('{size}', '400'),
        songList: list,
        title: rankname
      }
    },
    methods: {
      getToday() {
        const time = new Date()
        const year = time.getFullYear()
        let month = time.getMonth() + 1
        let date = time.getDate()
        if (month < 10) month = '0' + month
        if (date < 10) date = '0' + date
        return `${year}-${month}-${date}`
      }
    }
  }
</script>

<style>
  .rank-list-good {
    display: inline-block;
    padding: 2px 8px;
    left: 12px !important;
    border-radius: 8px;
    color: #fff;
    margin-top: 3px !important;
  }

  .rank-list-first {
    background-color: #E80000;
  }

  .rank-list-second {
    background-color: #FF7200;
  }

  .rank-list-third {
    background-color: #F8B300;
  }
</style>

