<template>
  <div class="singer_list">
    <mt-cell v-for="(item, index) in list" :to="`/singer/info/${item.singerid}`" is-link :title="item.singername" :key="index">
      <img slot="icon" :src="item.imgurl.replace('{size}', '400')" width="60" height="60">
    </mt-cell>
  </div>
</template>

<script>
  export default {
    head () {
      return {
        title: 'vue-kugou | ' + this.title,
      }
    },
    scrollToTop: true,

    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.commit('showHead', true)
        vm.$store.commit('setHeadStyle', {'background': '#2CA2F9'})
      })
    },
    beforeRouteLeave(to, from, next) {
      if(to.fullPath === '/singer') {
        this.$store.commit('showHead', false)
      }
      next()
    },
    async asyncData({app, store, params}) {
      store.commit('setHeadNav', 'head-nav4')
      const {data} = await app.$axios.get(`/@m.kugou.com/singer/list/${params.id}?json=true`)
      const list = data.singers.list.info
      store.commit('setHeadTitle', data.classname)
      app.head.title = data.classname
      return {
        list: list,
        title: data.classname
      }
    }
  }
</script>

<style>
  .singer_list .mint-cell-title img {
    margin-right: 10px
  }
</style>
