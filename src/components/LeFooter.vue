<template>
  <div class="hello" style="background-color: antiquewhite">
    <h5>CopyRight Les Métaux {{msg}}</h5>
    <img src="../../src/assets/logo.png">

    leTitre={{leTitre}}
  </div>
</template>

<script>
import {bus} from '../main';

export default {
  name: 'HelloAgainWithID',
  data () {
    return {
      id: this.$route.params || 'no-id', leTitre: ''
    }
  },
  props: {
    msg: String
  },
  created(){
    bus.$on( 'titleChanged', (data) =>{
      this.leTitre = data;
    } )
  }
}
</script>
<style scoped>
  img{
    height:42px;
    width:42px;
  }
</style>
