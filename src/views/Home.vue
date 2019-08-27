<template>
  <div class="home">

    <img alt="Vue logo" src="../assets/logo.png" />

    <HelloWorld msg="Bienvenue à L. R. Métal: App  (418) 878-0230" v-bind:bindLaSession="laSession" v-on:userIdChanged="if_userIdChanged($event)"/>

    <!--
    <LeFooter msg="Une Entreprise de Leclerc Robotique inc."/>
    -->
    <nav v-if="ib_admin">
      <div v-if="0">
        <router-link v-if="1==1" to="/TheAdmin">The Admin</router-link> ||
       <router-link v-if="1==1" to="/TheAdmin2">The Admin2</router-link> ||
       <router-link to="/leDivers">Divers</router-link> |
       <router-link to="/Testing">Testing</router-link> |
      </div>
      <router-link to="/Board">Tableau de Bord</router-link>
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
    return { laSession: ' ',  is_ClientID: '', ib_admin: false }
  },
  methods: {
    if_userIdChanged(data){
      //this.is_ClientID = data;
      console.log( "Home.vue   this.is_ClientID=", this.is_ClientID);
      this.$emit('userIdChanged',this.is_ClientID);
      bus.$emit('userIdChanged', this.is_ClientID);
    },
    getCookie(cname) {
      let name = cname + '=';
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  },
  created(){
    window.scrollTo(0, document.body.scrollHeight);
    //ac:ici
    ///  get cookie and who
    this.is_ClientID = this.getCookie("ClientID");
    if( this.is_ClientID === 'andrec@leclercrobotique.com'){
      this.ib_admin = true;
    }

  },
  mounted(){
    this.is_ClientID = this.getCookie("ClientID");
    if( this.is_ClientID === 'andrec@leclercrobotique.com'  || this.is_ClientID.toLowerCase() === 'ascal.leclerc@leclercrobotique.com'){
      this.ib_admin = true;
    }
  },
  components: { 'HelloWorld':HelloWorld, 'LeFooter':LeFooter}
};
</script>
<style scoped>
div{
  border-style: none;
}

</style>
