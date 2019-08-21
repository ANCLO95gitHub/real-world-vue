<template>
  <div class="app">
  <div  v-if="ib_permission">
    <h1>
    <p>...</p>
    </h1>
    <button @click="getKart">Get Kart</button><br>

    <label>Voici la liste de vos items.</label>
    <table class="customTable">
      <thead>
        <tr>
          <th width="40px">ID</th>
          <!--
          <th width="85px">Client</th>
          -->
          <th width="210px">Courriel</th>
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
    <table class="customTable">
      <tbody>
        <div v-for="akartArray in kartArray" v-bind:key="akartArray.ID">
          <tr>
            <td width="40px">{{akartArray.ID}}</td>
            <!--
           <td width="85px">{{akartArray.clientID}}</td>
           -->
           <td width="210px">{{akartArray.courriel}}</td>
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

    <div>
      <table class="maTable">
        <tr class="monTr">
          <td> <label>Sous-Total = </label></td>
          <td><label> {{sousTotal}}$</label></td>
        </tr>
        <tr class="monTr">
          <td><label>TPS = </label></td>
          <td><label> {{laTPS}}$</label></td>
        </tr>
        <tr class="monTr">
          <td><label>TVQ = </label></td>
          <td><label> {{laTVQ}}$</label></td>
        </tr>
        <tr class="monTr">
          <td> <label>Total de = </label></td>
          <td> <label> {{leTotal}}$</label></td>
        </tr>
        <tr class="monTr">
          <td></td>
          <td></td>
        </tr>
        <tr class="monTr">
          <td></td>
          <td>
            <paypal-checkout
              :amount="leTotal"
              currency="CAD"
              env="sandbox"
              v-on:payment-authorized="paymentAuthorized"
              v-on:payment-completed="paymentCompleted"
              v-on:payment-cancelled="paymentCancelled"
              :client="credentials"
            >
            </paypal-checkout>
          </td>
        </tr>
      </table>
    </div>
   <div>
   </div>

   <paypal-simple amount="10.00" currency="USD" :client="credentials"></paypal-simple>
   <paypal-advanced :methods="credentials"></paypal-advanced>

    <LeFooter msg="Une Entreprise de HOME inc."/>
    </div>
      <div  v-if="!ib_permission"  id="vide">
        <label><h3>Vous devez vous logger avant de voir votre kart. </h3> </label>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router'
import {apiServeurmssql} from '../../src/views/config.js';
import LeFooter from './LeFooter.vue';
import PayPal from 'vue-paypal-checkout';
import PayPal2 from './Paypal';
import PayPalCheckout from './PayPalCheckout.vue';

import {bus} from '../main';
//        sandbox: 'Aa9a_yrXSzcTpuZni8FtQkYvk98vs0oTkfwD2UaCpQ8vaJcGUN2g9xBZZ9sqwfXnFxnXmrSQrd8Qr6IH',
//         production: 'EL3O6sJe0CgtMZszBgigMEu1Ja6qXi_OxfscVHTq7--Im8p01ADMaX3S5ChI_szixchfHx4tw9Xm4F-K'
export default {
  name: 'ListCart',
  data() {
    return { ib_permission: false, laReponse: '', laReponseParam: '', leLogout: '', kartArray:[], lsMessage: "Pour retirer l'item du Kart", cookieResultat:'vide', laSession: 'zedivz', leTitle: 'vue...', is_ClientID:'', sousTotal: 0.00, laTPS: 0.00, laTVQ: 0.00, leTotal: 0.00,
      credentials:{
        'sandbox': 'Aa9a_yrXSzcTpuZni8FtQkYvk98vs0oTkfwD2UaCpQ8vaJcGUN2g9xBZZ9sqwfXnFxnXmrSQrd8Qr6IH',
        'production': ''
      },
      amount: "10.00"};
  },
  components: { 'LeFooter':LeFooter, PayPal, 'paypal2':PayPal2, 'paypal-checkout': PayPalCheckout},
  methods: {
    getKart () {
      console.log('DEBUT getKart()  AVEC arg cookie=' + this.getCookie("ClientID") );
      //'x-access-token': localStorage.getItem('token'),
      // http://localhost:1337/getkart/
      // https://serveurmssql.azurewebsites.net/
      // {params: { id: this.leLogout }},
      //axios.get(`https://serveurmssql.azurewebsites.net/getkart/`,
      //axios.get(`http://localhost:1337/getkart/`,
    //alert( "loginUrl=" + apiServeurmssql )
      this.is_ClientID = this.getCookie("ClientID");
      console.log('=>this.is_ClientID', this.is_ClientID )
      let params = {
        id : this.is_ClientID,
      };

      axios.get(`${apiServeurmssql}getkart/`, {params},
        {
          headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      )
        .then(res => {
          // eslint-disable-next-line eqeqeq
          this.sousTotal = 0.00
          if (res.data.status === true) {
            console.log(' res.data.InvenDet=' + res.data.KartMetaux);
            this.kartArray = res.data.KartMetaux
          }
          for( let jj = 0; jj < this.kartArray.length; jj++){
            this.sousTotal += parseFloat(this.kartArray[jj].prix);  //ac: ici looper
          }
          this.sousTotal = this.sousTotal.toFixed(2);
          this.laTPS = (this.sousTotal * 0.05).toFixed(2);
          this.laTVQ = (this.sousTotal * 0.09975).toFixed(2);
          this.leTotal = (parseFloat(this.sousTotal) + parseFloat(this.laTPS) + parseFloat(this.laTVQ)).toFixed(2);
        })
      console.log('FIN getKart() avec arg');
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
    retirerItem(IDID){
      console.log( "DEBUT etirerItem");
      //alert("IDID=" + IDID);
      let dataFollow = { "IDID": IDID };
      console.log( "dataFollow=" + dataFollow.IDID);
      axios.post(`${apiServeurmssql}deletekart/`, dataFollow,
        {
          headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      ).then(res => {
          console.log(' res.status=' + res.status)
        })
      router.push("/");
      //router.push("/ListCart");
      //this.getKart();
      console.log( "FIN retirerItem");
      /////router.push("/");
    },

    changeTitle(){
      //alert('changeTitle(){');
      //this.$emit('changeTitle', 'Vue Wizard');
      this.leTitle = 'Vue sorcierette'
      console.log( this.leTitle );
      bus.$emit('titleChanged', 'Vue Sorciers2');
    },
    getCookie(cname) {
      let name = cname + '=';
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    paymentAuthorized: function (data) {
      console.log( 'paymentAuthorized' );
      console.log(data);
      //alert("IDID=" + IDID);
      let dataFollow = { "IDID": data };
      console.log( "dataFollow=" + dataFollow.IDID);
      axios.post(`${apiServeurmssql}paymentAuthorized/`, dataFollow,
        {
          headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      ).then(res => {
        console.log(' res.status=' + res.status)
      })
      //router.push("/");
      //router.push("/ListCart");
      //this.getKart();
      console.log( "FIN paymentCancelled");

    },
    paymentCompleted: function (data) {
      console.log( 'paymentCompleted' );
      console.log(data);
      //alert("IDID=" + IDID);
      let dataFollow = {
        "IDID": data,
        ClientID : this.is_ClientID,
      };
      console.log( "dataFollow=" + dataFollow.IDID);
      axios.post(`${apiServeurmssql}paymentCompleted/`, dataFollow,
        {
          headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      ).then(res => {
        console.log(' res.status=' + res.status)
      })
      //router.push("/");
      //router.push("/ListCart");
      //this.getKart();
      console.log( "FIN paymentCompleted");

    },
    paymentCancelled: function (data) {
      console.log( 'paymentCancelled' );
      console.log(data);

      //alert("IDID=" + IDID);
      let dataFollow = { "IDID": data };
      console.log( "dataFollow=" + dataFollow.IDID);
      axios.post(`${apiServeurmssql}paymentCancelled/`, dataFollow,
        {
          headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      ).then(res => {
        console.log(' res.status=' + res.status)
      })
      //router.push("/");
      //router.push("/ListCart");
      //this.getKart();
      console.log( "FIN paymentCancelled");

    },
    faireAchat(){
      alert("Alert: faire du code pour achat:  avec PayPal par exemple.")
      console.log('DEBUT  faireAchat()' );
      let dataFollow = { "IDID": this.leTotal };
      //axios.post(`http://localhost:8080/pay/`, dataFollow,
      axios.post(` http://192.168.200.146:8080/pay/`, dataFollow,
        {
          headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      ).then(res => {
        console.log(' res.status=' + res.status)
      })
      console.log('FIN  faireAchat()' );
    },
    faireAchat2(){
      //alert("Alert2: faire du code pour achat:  avec PayPal par exemple.")
      console.log('DEBUT  faireAchat2()' );
      let dataFollow = { "IDID": this.leTotal };
      //  headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}
      //headers: { 'Access-Control-Allow-Origin': '*'}
      //axios.post(`http://localhost:1337/pay/`, dataFollow, {headers: {'Access-Control-Allow-Origin': '*'}} ).then(res => {
      axios.post(`http://localhost:3005/pay/`, dataFollow, {headers: {'Access-Control-Allow-Origin': '*'}} ).then(res => {
        console.log(' res.status=' + res.status)
      })
      console.log('FIN  faireAchat2()' );
    }
    //,    created() {
    //  console.log('async created() ');
    //  this.getKart();    },
  },
  async created() {
    console.log('async created() ');
    this.getKart();
    bus.$on("userIdChanged", (data) =>{
      this.is_ClientID = data;
    })
    console.log('qaz   qaz   this.is_ClientID=', this.is_ClientID );
  },
  mounted(){

    if( this.getCookie('ClientID').length >=4 ) {
      this.ib_permission = true;
    }
    else {
      this.ib_permission = false;
    }



    let recaptchaScript = document.createElement('script');

    recaptchaScript.setAttribute('src','https://unpkg.com/vue');
    document.head.appendChild(recaptchaScript);

    recaptchaScript.setAttribute('src','https://unpkg.com/vue-paypal-checkout@2.0.0/dist/vue-paypal-checkout.min.js');
    document.head.appendChild(recaptchaScript);

    recaptchaScript.setAttribute('src','https://www.paypalobjects.com/api/checkout.js');
    document.head.appendChild(recaptchaScript);

    recaptchaScript.setAttribute('src','https://www.paypal.com/sdk/js?client-id=sb');
    document.head.appendChild(recaptchaScript);
  }
/*
.containing-table {
  display: table;
  width: 100%;
  height: 100px;  for demo only
  border: 1px dotted blue;
}
.centre-align {
  padding: 2px;
  border: 1px dashed gray;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.content {
  width: 50px;
  height: 50px;
  background-color: red;
  display: inline-block;
  vertical-align: top;
}
*/

}
</script>

<style scoped>
.about{
  border-style: double;
  height: 770px;
  margin: 1px;
  padding: 1px;
  background-color: wheat;
}
table.customTable {
  display: flex;
  width: 100%;
  justify-content: left;
  align-items: center;
  background-color: lavender;
  border-collapse: collapse;
  border-width: 5px;
  border-color: #A9B1F8;
  border-style: groove;
  color: #000000;
}

table.customTable td, table.customTable th {
  border-width: 5px;
  border-color: #A9B1F8;
  border-style: groove;
  padding: 1px;
  max-height: 25px;
}

table.customTable thead {
  background-color: #7EA8F8;
}

.maTable {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 20%;
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
