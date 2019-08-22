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

    <label>Voici la liste des items dans les karts des clients.</label>
    <table class="customTable">
      <thead>
      <tr>
        <th width="40px">ID</th>
        <th width="85px">Client</th>
        <th width="200px">Courriel</th>
        <th width="100px">ID de l Item</th>
        <th width="150px">Purchase ID</th>
        <th colspan="1" width="90px">Nom .</th>
        <th width="85px">. piece</th>
        <th width="75px">Longueur</th>
        <th width="75px">Quantité</th>
        <th width="100px">Prix</th>
        <th width="50px">Vendu</th>

        <th v-if="1==2" width="195px">DateTime</th>

        <th width="75px">A retirer</th>
        <th width="40px">IDID</th>
      </tr>
      </thead>
    </table>
    <table class="maTable">
      <tbody>
      <div v-for="akartArray in kartArray" v-bind:key="akartArray.ID">
        <tr>
          <td width="40px">{{akartArray.ID}}</td>
          <td width="85px">{{akartArray.clientID}}</td>
          <td width="200px">{{akartArray.courriel}}</td>
          <td width="100px">{{akartArray.IDID}}</td>
          <td width="150px"> {{akartArray.InPurcId_ExPurcId}}</td>

          <td width="90px">{{akartArray.NomMB}}</td>
          <td width="85px">{{akartArray.NomForme}}</td>

          <td width="75px">{{akartArray.Longueur}}</td>
          <td width="75px">{{akartArray.Quantity}}</td>
          <td width="100px">{{akartArray.prix}}</td>
          <td width="50px">{{akartArray.vendu}}</td>
          <td v-if="1==2" width="195px">{{akartArray.DateTime}}</td>
          <td width="75px">
            <button class="favorite styled" @click="retirerItem(akartArray.IDID)" v-bind:title=lsMessage>Retirer l'Item</button>
          </td>
          <td width="40px">{{akartArray.IDID}}</td>
        </tr>
      </div>
      </tbody>
    </table>
    <br><br><br>
    <label>Voici la liste des items annules du Kart de tous les clients.</label>
    <br>
    <button @click="getKart_Annuler">Get Kart des items annules de tous les clients</button><br>

    <table class="maTable">
      <tbody>
      <div v-for="akartArrayAnnuler in kartArrayAnnuler" v-bind:key="akartArrayAnnuler.ID">
        <tr>
          <td width="40px">{{akartArrayAnnuler.ID}}</td>
          <td width="85px">{{akartArrayAnnuler.clientID}}</td>
          <td width="200px">{{akartArrayAnnuler.courriel}}</td>
          <td width="100px">{{akartArrayAnnuler.IDID}}</td>
          <td width="150px"> {{akartArrayAnnuler.InPurcId_ExPurcId}}</td>

          <td width="90px">{{akartArrayAnnuler.NomMB}}</td>
          <td width="85px">{{akartArrayAnnuler.NomForme}}</td>

          <td width="75px">{{akartArrayAnnuler.Longueur}}</td>
          <td width="75px">{{akartArrayAnnuler.Quantity}}</td>
          <td width="100px">{{akartArrayAnnuler.prix}}</td>
          <td width="50px">{{akartArrayAnnuler.vendu}}</td>
          <td v-if="1==2" width="195px">{{akartArrayAnnuler.DateTime}}</td>
          <td width="75px">
            <button class="favorite styled" @click="retirerItem(akartArrayAnnuler.IDID)" v-bind:title=lsMessage>Retirer l'Item</button>
          </td>
          <td width="40px">{{akartArrayAnnuler.IDID}}</td>
        </tr>
      </div>
      </tbody>
    </table>
    <br><br><br>
ac:ici
    <label>Voici la liste des items vendus du Kart de tous les clients.</label>
    <br>
    <button @click="getKart_Vendus">Get Kart des items vendus de tous les clients</button><br>
    <table class="maTable">
      <tbody>
      <div v-for="akartArrayVendu in kartArrayVendu" v-bind:key="akartArrayVendu.ID">
        <tr class="monTr">
          <td width="40px">{{akartArrayVendu.ID}}</td>
          <td width="85px">{{akartArrayVendu.clientID}}</td>
          <td width="200px">{{akartArrayVendu.courriel}}</td>
          <td width="100px">{{akartArrayVendu.IDID}}</td>
          <td width="150px"> {{akartArrayVendu.InPurcId_ExPurcId}}</td>

          <td width="90px">{{akartArrayVendu.NomMB}}</td>
          <td width="85px">{{akartArrayVendu.NomForme}}</td>

          <td width="75px">{{akartArrayVendu.Longueur}}</td>
          <td width="75px">{{akartArrayVendu.Quantity}}</td>
          <td width="100px">{{akartArrayVendu.prix}}</td>
          <td width="50px">{{akartArrayVendu.vendu}}</td>
          <td v-if="1==2" width="195px">{{akartArrayVendu.DateTime}}</td>
          <td width="75px">
            <button class="favorite styled" @click="retirerItem(akartArrayVendu.IDID)" v-bind:title=lsMessage>Retirer l'Item</button>
          </td>
          <td width="40px">{{akartArrayVendu.IDID}}</td>
        </tr>
      </div>
      </tbody>
    </table>
    <br><br><br>



    <p>
      {{msg}}
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>
    </p>


    <LeFooter msg="Une Entreprise de LR Robotique"/>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router'
import {apiServeurmssql} from '../../src/views/config.js';
import LeFooter from './LeFooter.vue';

import {bus} from '../main';

export default {
  name: 'ListCart',
  data() {
    return { laReponse: '', laReponseParam: '', leLogout: '', kartArray:[], kartArrayAnnuler:[], kartArrayVendu:[], lsMessage: "Pour retirer l'item du Kart", cookieResultat:'vide', laSession: 'zedivz', leTitle: 'vue...', is_getHome: 'emptry' };
  },
  components: { 'LeFooter':LeFooter },
  methods: {
    getKart () {
      console.log('Board.vue DEBUT getKart()  sans arg');
      this.is_ClientID = this.getCookie("ClientID");
       let params = {
        id : 0,
      };
      ///// {params},
      axios.get(`${apiServeurmssql}getkart/`,{params},
        {
          headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      )
        .then(res => {
          // eslint-disable-next-line eqeqeq
          if (res.data.status === true) {
            console.log(' res.data.InvenDet=' + res.data.KartMetaux);
            this.kartArray = res.data.KartMetaux
          }
        })
      console.log('FIN getKart() sans arg');
    },

    getKart_Annuler () {
      console.log('Board.vue DEBUT getKart_Annuler()  sans arg  JE VEUX ICICICICICICICICI');
      this.is_ClientID = this.getCookie("ClientID");
      let params = {
        id : 0,
      };
      ///// {params},
      axios.get(`${apiServeurmssql}getkart_annuler/`,{params},
        {
          headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      )
        .then(res => {
          // eslint-disable-next-line eqeqeq
          if (res.data.status === true) {
            console.log(' res.data.InvenDet=' + res.data.KartMetaux);
            this.kartArrayAnnuler = res.data.KartMetaux
            console.log('FIN getKart_Annuler() sans arg');
          }
        })
    },

    getKart_Vendus () {

      console.log('Board.vue DEBUT getKart_Vendus()  sans arg');
      this.is_ClientID = this.getCookie("ClientID");
      let params = {
        id : 0,
      };
      ///// {params},
      axios.get(`${apiServeurmssql}getkart_vendus/`,{params},
        {
          headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      )
        .then(res => {
          // eslint-disable-next-line eqeqeq
          if (res.data.status === true) {
            console.log(' res.data.InvenDet=' + res.data.KartMetaux);
            this.kartArrayVendu = res.data.KartMetaux
            console.log('FIN getKart_Vendus() sans arg');
          }
        })

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

      console.log( "BOARD.VUE document.cookie=" + this.getCookie("ClientID"));
      //return;
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
    },
    getCookie(cname) {
      let name = cname + "=";
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
    //,    created() {
    //  console.log('async created() ');
    //  this.getKart();    },
  },
  async created() {
    console.log('async created() ');
/////////////////    this.getKart();
    bus.$on("userIdChanged", (data) =>{
      this.is_ClientID = data;
    })
  }

}
</script>

<style scoped>
.about{
  border-style: double;
  height: 170px;
  margin: 1px;
  padding: 1px;
  background-color: #95a5a6;
}
/*
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
*/
.maTable {
  display: flex;
  position: relative;
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 40%;
  margin-left: 10%;
  //border: 2px solid #000;
  display: block;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;

}

.monTr:nth-child(even) {
  background-color: #dddddd;

}

</style>
