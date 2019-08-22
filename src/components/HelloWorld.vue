<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <div v-if="!ib_permission" class="container">
      <table>
        <tr>
          <td>
            <label for='uname'><b>Courriel / Email</b></label>
          </td>
          <td>
            <input type="text" id="iEmail" placeholder="..." name="uname" required v-model="is_ClientID" @dblclick="if_ondblclick(1)" @click.ctrl="if_ondblclick(2)" v-on:keyup="if_validerEmail()">
          </td>
        </tr>
        <tr>
          <td>
            <label><b>Mot de Passe</b></label>
          </td>
          <td>
            <input type="password" name="pwd" v-model="pwd1" title="Minimum et maximum.">
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button type="submit" v-on:click="getClientID">Login</button>
            <button type="submit" v-on:click="setLogout">Logout</button>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
      </table>

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
    return { vlaSession: '', is_ClientID: '', ib_permission: false, pwd1: '', pwd2:'', is_cookie:''};
  },
  components: { ListeInventaire, leDivers, Board },
  props: {
    msg: String,
    bindLaSession: String
  },
  methods: {
    getClientID() {
      console.log('DEBUT getClientID');
      this.is_cookie = this.getCookie('ClientID');
      if (this.is_cookie.length >= 4){
        console.log('OUI un cookie et est:', this.is_cookie);
        this.is_ClientID = this.is_cookie;
      }

      if( this.is_ClientID.length < 1 || this.is_ClientID.length === null ){
        this.is_ClientID = this.getCookie('ClientID');
        console.log('this.getCookie(\'ClientID\')=', this.is_ClientID);
      }
      if (this.is_ClientID.length >= 4){
        this.ib_permission = true;
        //bus.$emit('userIdChanged', this.is_ClientID);
        //this.$emit('userIdChanged',this.is_ClientID);
        console.log( "AVANT document.cookie=" + document.cookie);
        document.cookie = "ClientID=" + this.is_ClientID;
        //Cookies.set( "ClientID=", this.is_ClientID );
        console.log( "APRES document.cookie=" + document.cookie);
      }
      else {
        this.ib_permission = false;
        return;
      }
      if( this.pwd2 === '') {
        this.pwd2 = this.pwd1;
      }
      this.pwd1 = '';
      let params = {
        id: this.is_ClientID,
        password: this.pwd2
      };

      axios.get(`${apiServeurmssql}isClientID/`, {params},
        {
          headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      )
        .then(res => {
          if (res.data.status === true) {
            if( this.is_ClientID.length < 1 || this.is_ClientID.length === null ){
              this.is_ClientID = this.getCookie('ClientID');
            }
            // eslint-disable-next-line no-empty
            if (this.is_ClientID.length >= 4){
              //bus.$emit('userIdChanged', this.is_ClientID);
              //this.$emit('userIdChanged',this.is_ClientID);
              console.log( "AVANT document.cookie=" + document.cookie);
              document.cookie = "ClientID=" + this.is_ClientID;
              console.log( "APRES document.cookie=" + document.cookie);
              this.ib_permission = true;
            } else {
              this.ib_permission = false;
            }
          }else{
            console.log(' res.data.status=' + res.data.status);
           // this.ib_permission = false;
            //alert( 'Cet usager n est pas inscrit dans le compte.  Vous pouvez vous inscire dans "Créer Compte"')
          }

        });


//this.ib_permission = false;//ac:temp
      console.log( 'this.ib_permission ===', this.ib_permission);
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
      this.is_ClientID = '';
      this.ib_permission = false;
      this.pwd1 = '';
      this.pwd2 = '';
      document.cookie = 'ClientID=' + '';
      document.cookie = 'ClientID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    },
    ///ac:tempo
    if_ondblclick(condition){
      //alert('if_ondblclick(){');
      if( condition === 1){
        this.is_ClientID = 'andrec@leclercrobotique.com';
      }
      if( condition === 2){
        this.is_ClientID = 'andre.cloutier.4@ulaval.ca';
      }
    },
    if_validerEmail(){
      const patterns={
        telephone: /^\d{10}$/,
        username: /^[a-z\d]{5,12}$/i,
        password: /^[\w@-]{8-20}$/,
        slug: /^[a-z\d-]{8,20}$/,
        email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
        phoneno: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
      };
      let lb_pattern = patterns["email"].test( this.is_ClientID );
      console.log(patterns["email"].test( this.is_ClientID ));
      if( lb_pattern ){
        document.getElementById("iEmail").className = 'classEmail';
        //document.getElementById("pEmail").display = "none";
        document.getElementById("pEmail").style.visibility = "hidden";
      }else{
        document.getElementById("iEmail").className = '';
        document.getElementById("pEmail").style.visibility = "visible";
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
h2 {
  margin: 10px 0 0;
}
h3 {
  margin: 20px 0 0;
}
h5 {
  margin: 20px 0 0;
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
table {
  position: relative;
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 40%;
  margin-left: 30%
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #dddddd;
}
.classEmail{
  font-family: arial, sans-serif;
  font-size: 14px;
  border-style: solid;
  border-color: #0F0;
}
</style>
