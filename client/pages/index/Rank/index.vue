<template>
  <div class="rank">
    <mt-cell v-for="(item,index) in songList" :title="item.rankname" :to="`/rank/${item.rankid}`" is-link
             :key="index">
      <img slot="icon" :src="item.imgurl.replace('{size}', '400')" width="60" height="60">
    </mt-cell>
  </div>
</template>

<script>
  export default {
    head: {
      title: 'vue-kugou | 排行'
    },
    async asyncData({app, store}){
      store.commit('setHeadNav', 'head-nav2')
      const {data} = await app.$axios.get('/@m.kugou.com/rank/list&json=true')
      return {
        songList: data.rank.list
      }
    }
  }
</script>
<style lang="less">
  .rank {
    .mint-cell-title img {
      margin-right: 10px;
    }

    .mint-cell-wrapper {
      font-size: 16px;
    }
  }
</style>
