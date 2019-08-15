<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <div v-if="!ib_permission" class="container">
      <label for='uname'><b>No de Client / Customer ID</b></label>
      <input type="text" placeholder="{Entrez... Enter}" name="uname" required v-model="is_ClientID" @dblclick="if_ondblclick(1)" @click.ctrl="if_ondblclick(2)">
      <button type="submit" v-on:click="getClientID">Login</button>
    </div>
    <div v-if="ib_permission">
      <button type="submit" v-on:click="setLogout">Logout</button>
      <h5>[{{is_ClientID}}]</h5>
    </div>
      <!--    <LeHeader />    -->
    <div v-if="ib_permission">
      <ListeInventaire msg='' v-bind:bindLaSession="vlaSession" v-bind:bindClientID="is_ClientID" v-on:changeTitle="updateTitle($event)" />
    </div>
    <!-- ac: ceci s affichera en bas de la page web -->
  </div>
</template>

<script>
import axios from 'axios';
import {apiServeurmssql} from '../../src/views/config.js';
//import LeHeader from "@/components/LeHeader.vue";
import ListeInventaire from "@/components/ListeInventaire";
//import LeFooter from "@/components/LeFooter.vue";
import leDivers from "@/components/divers.vue";
import Board from "@/components/Board.vue";
import {bus} from '../main';

// import LeTesting from "@/components/Testing.vue";
// import TitleInventaire from '@/components/TitleInventaire.vue';
// LeHeader, LeFooter,  ListCart, LeTesting,  TitleInventaire
export default {
  name: "HelloWorld",
  data () {
    return { vlaSession: 'zzz', is_ClientID: '', ib_permission: false };
  },
  components: { ListeInventaire, leDivers, Board },
  props: {
    msg: String,
    bindLaSession: String
  },
  methods: {
    getClientID() {
      console.log('DEBUT getClientID');
      console.log('ib_permission=' + this.ib_permission);
      console.log('getCookie=', this.getCookie('ClientID'));
      console.log('avant this.is_ClientID=', this.is_ClientID);
      console.log('this.is_ClientID.length=', this.is_ClientID.length);
      // this.ib_permission = false;
      // document.cookie = 'ClientID=' + '';
      // document.cookie = 'ClientID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

      console.log( "AVANT getCookie")
      if( this.is_ClientID.length < 1 || this.is_ClientID.length === null ){
        this.is_ClientID = this.getCookie('ClientID');
        console.log('this.getCookie(\'ClientID\')=', this.is_ClientID);
      }
      if (this.is_ClientID.length >= 4){
        this.ib_permission = true;
        bus.$emit('userIdChanged', this.is_ClientID);
        this.$emit('userIdChanged',this.is_ClientID);
        console.log( "AVANT document.cookie=" + document.cookie);
        document.cookie = "ClientID=" + this.is_ClientID;
        console.log( "APRES document.cookie=" + document.cookie);
      } else {
        this.ib_permission = false;
      }
      let params = {
        id: this.is_ClientID,
      };
      axios.get(`${apiServeurmssql}isClientID/`, {params},
        {
          headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      )
        .then(res => {
          if (res.data.status === true) {
            console.log(' res.data.status=' + res.data.status);
            if( this.is_ClientID.length < 1 || this.is_ClientID.length === null ){
              this.is_ClientID = this.getCookie('ClientID');
            }
            console.log('apres this.is_ClientID=', this.is_ClientID);
            // eslint-disable-next-line no-empty
            if (this.is_ClientID.length >= 4){
              this.ib_permission = true;
              bus.$emit('userIdChanged', this.is_ClientID);
              this.$emit('userIdChanged',this.is_ClientID);
              console.log( "AVANT document.cookie=" + document.cookie);
              document.cookie = "ClientID=" + this.is_ClientID;
              console.log( "APRES document.cookie=" + document.cookie);
            } else {
              this.ib_permission = false;
            }
          }else{
            console.log(' res.data.status=' + res.data.status);
            alert( 'Cet usager n est pas inscrit dans le compte.  Vous pouvez vous inscire dans "Créer Compte"')
          }

        });



      console.log( this.ib_permission);
    },
    updateTitle( upTitle ){
      //alert(upTitle);
      this.vLaSession = upTitle;
    },
    scrollToTop() {
      window.scrollTo(0,0);
    },
    getCookie(cname) {
      let name = cname + '=';
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    },
    setLogout(){
      this.ib_permission = false;
      this.is_ClientID = '';
      document.cookie = 'ClientID=' + '';
      document.cookie = 'ClientID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    },
    if_ondblclick(condition){
      //alert('if_ondblclick(){');
      if( condition === 1){
        this.is_ClientID = 'andrec@leclercrobotique.com';
      }
      if( condition === 2){
        this.is_ClientID = 'andre.cloutier.4@ulaval.ca';
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.getCurrentUser;
    }
  },
  async created() {
    console.log('async created() ');
    //this.vlaSession = 'apres HOME, je viens de HelloWorld';
    window.scrollTo(0,0);
    this.scrollToTop();
    this.getClientID();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input{
  width: 200px;
}
</style>
