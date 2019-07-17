<template>
  <div class="about">
    Dans ListCart
    <h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ali...</p>
    </h1>
    leTitle={{leTitle}}<br>
    <button @click="getHome">The getHome</button>
    <label>{{is_getHome}}</label>
    <br>

    <button @click="getCookieResultat">The Cookie</button>
    <label>{{cookieResultat}}</label><br>
    <label>{{laSession}}</label>
    <br><br>
    <button @click="pipeMsSQLtoMongo">pipeMsSQLtoMongo</button>
    <br><br>
    <button @click="getWhoAmI">getWhoAmI</button>
    {{laReponse}}<br><br>
    <button @click="setWhoAmI">setWhoAmI</button>
    {{laReponseParam}}<br><br>
    <button @click="setLogout">setLogout</button><br>
    {{leLogout}}
    <button @click="getKart">Get Kart</button><br>

    <label>Voici la liste de vos items.</label>
    <table class="customTable">
      <thead>
        <tr>
          <th width="40px">ID</th>
        </tr>
      </thead>
    </table>
    <table class="customTable">
      <tbody>
          <tr>
            <td width="40px">{{lsMessage}}</td>

          </tr>
      </tbody>
    </table>
    <div>
      <button @click="faireAchat">Faire l'Achat</button><br>
    </div>
    <LeFooter msg="Une Entreprise de HOME inc."/>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router'
import {apiServeurmssql} from '../../src/views/config.js';
import LeFooter from "@/components/LeFooter.vue";

import {bus} from '../main';

export default {
  name: 'ListCart',
  data() {
    return { laReponse: '', laReponseParam: '', leLogout: '', kartArray:[], lsMessage: "Pour retirer l'item du Kart", cookieResultat:'vide', laSession: 'zedivz', leTitle: 'vue...', is_getHome: 'emptry' };
  },
  components: { 'LeFooter':LeFooter },
  methods: {
    getKart () {
      console.log('DEBUT getKart()  sans arg');

    },



    getWhoAmI(){
      axios.get(`${apiServeurmssql}getWhoAmI`,
        {
          headers: {'x-access-token': localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      ).then(res => {
        // eslint-disable-next-line eqeqeq
        this.laReponse = res.data.reponse;
        if (res.data.status === true) {
          console.log(' res.data.PoidsMetaux=' + res.data.PoidsMetaux);
        }
        this.laSession = JSON.stringify(res.data.laSession.session);
      })
    },
    setWhoAmI(){
      axios.get(`${apiServeurmssql}setWhoAmI/321`,
        {
          headers: {'x-access-token': localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      ).then(res => {
        // eslint-disable-next-line eqeqeq
        this.laReponseParam = res.data.reponse;
        if (res.data.status !== true) {
          console.log(' res.data.reponse=' + res.data.reponse);
        }

      })
    },
    setLogout(){
      //ac: a reviser
      axios.get(`${apiServeurmssql}logout`,
        {
          headers: {'x-access-token': localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      ).then(res => {
        // eslint-disable-next-line eqeqeq
        router.push("/");
        let repon = res.data;
        repon = 'On sortira'
        this.leLogout = repon;

      })
    },
    faireAchat(){
      alert("Alert: faire du code pour achat:  avec PayPal par exemple.")
    },
    retirerItem(IDID){
      //alert("IDID=" + IDID);
      let dataFollow = { "IDID": IDID };
      console.log( "dataFoloow=" + dataFollow.IDID);
      axios.post(`${apiServeurmssql}deletekart/`, dataFollow,
        {
          headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}
          }
      ).then(res => {
          console.log(' res.status=' + res.status)
        })
      this.getKart();
      console.log( "FIN etirerItem");
      /////router.push("/");
    },
    pipeMsSQLtoMongo(){
      console.log( "pipeMsSQLtoMongo=");
      let dataFollow = { "IDID": 123 };
      axios.post(`${apiServeurmssql}pipeMsSQLtoMongo/`, dataFollow,
        {
          headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      ).then(res => {
        console.log(' res.status=' + res.status);
      });

    },
    getHome(){
      axios.get(`${apiServeurmssql}`,
        {
          headers: {'x-access-token': localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      ).then(res => {
        // eslint-disable-next-line eqeqeq
        //router.push("/");
        let repon = res.data;
        this.is_getHome = repon;

      })
    },
    getCookieResultat(){
      //let dataFollow = { "IDID": 123 };
      axios.get(`${apiServeurmssql}getCookieResultat/${this.laSession}`,
        {
          headers: {'x-access-token': localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      ).then(res => {
        // eslint-disable-next-line eqeqeq
        //router.push("/");
        let repon = res.data;
        this.cookieResultat = repon;
        this.changeTitle();
      })
    },
    changeTitle(){
      //alert('changeTitle(){');
      //this.$emit('changeTitle', 'Vue Wizard');
      this.leTitle = 'Vue sorcierette'
      console.log( this.leTitle );
      bus.$emit('titleChanged', 'Vue Sorciers2');
    }
    //,    created() {
    //  console.log('async created() ');
    //  this.getKart();    },
  },
  async created() {
    console.log('async created() ');
    this.getKart();
  }

}
</script>

<style scoped>
.about{
  border-style: double;
  height: 770px;
  margin: 1px;
  padding: 1px;
  background-color: #95a5a6;
}
table.customTable {
  display: flex;
  width: 100%;
  justify-content: left;
  align-items: center;
  background-color: lavender;
  border-collapse: collapse;
  border-width: 5px;
  border-color: #a9b1f8;
  border-style: groove;
  color: #000000;
}

table.customTable td, table.customTable th {
  border-width: 5px;
  border-color: #a9b1f8;
  border-style: groove;
  padding: 1px;
  max-height: 25px;
}

table.customTable thead {
  background-color: #7ea8f8;
}



</style>
