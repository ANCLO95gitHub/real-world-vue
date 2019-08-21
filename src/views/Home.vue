<template>
  <div class="home">

    <img alt="Vue logo" src="../assets/logo.png" />

    <HelloWorld msg="Bienvenue à L. R. Métal: App  (418) 878-0230" v-bind:bindLaSession="laSession" v-on:userIdChanged="if_userIdChanged($event)"/>

    <LeFooter msg="Une Entreprise de Leclerc Robotique inc."/>
    <nav>
      <router-link v-if="1==1" to="/TheAdmin">The Admin</router-link> ||
      <router-link v-if="1==1" to="/TheAdmin2">The Admin2</router-link> ||
      <router-link to="/leDivers">Divers</router-link> |
      <router-link to="/Testing">Testing</router-link> |
      <router-link to="/Board">Tableau de Bord</router-link> |
    </nav>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import LeFooter from '@/components/LeFooter.vue';
import {bus} from '../main';
export default {
  name: "home",
  data() {
    return { laSession: ' ',  is_ClientID: ''
    }
  },
  methods: {
    if_userIdChanged(data){
      this.is_ClientID = data;
      console.log( "Home.vue   this.is_ClientID=", this.is_ClientID);
      this.$emit('userIdChanged',this.is_ClientID);
      bus.$emit('userIdChanged', this.is_ClientID);
    }
  },
  created(){
    window.scrollTo(0, document.body.scrollHeight);
  },
  components: { 'HelloWorld':HelloWorld, 'LeFooter':LeFooter}
};
</script>
<style scoped>
div{
  border-style: solid;
}
</style>
