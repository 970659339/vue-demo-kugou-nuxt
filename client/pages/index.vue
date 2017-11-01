<template>
  <div id="app">
    <IHead/>
    <div class="main">
      <nuxt-child />
    </div>
    <Player/>
    <DetailPlayer/>
  </div>
</template>

<script>
  import IHead from '~/components/header/Head'
  import Player from '~/components/Player'
  import DetailPlayer from '~/components/DetailPlayer'

  export default {
    components: {
      IHead, Player, DetailPlayer
    },
    created(){
      const routeName = this.$route.name
      if(routeName === 'index') {
        this.$router.push('/newSongs')
      }
    }
  }
</script>

