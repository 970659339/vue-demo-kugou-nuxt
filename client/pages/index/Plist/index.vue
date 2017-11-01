<template>
  <div class="plist">
    <mt-cell v-for="(item,index) in list" :title="item.specialname" is-link
             :label="String(item.playcount)" :to="`/plist/${item.specialid}`" :key="index">
      <img slot="icon" :src="item.imgurl.replace('{size}', '400')" width="60" height="60">
    </mt-cell>
  </div>
</template>

<script>
  export default {
    head(){
      return {
        title: 'vue-kugou | 歌单'
      }
    },
    async asyncData({app, store}){
      store.commit('setHeadNav', 'head-nav3')
      const {data} = await app.$axios.get('/@m.kugou.com/plist/index&json=true')
      return {
        list: data.plist.list.info
      }
    }
  }
</script>

