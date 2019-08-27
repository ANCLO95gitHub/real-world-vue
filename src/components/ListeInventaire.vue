<template>
  <div class="enLigne">
    <h4 v-on:click="changeTitle">{{bindLaSession}}</h4>
    <h5>{{ msg }}</h5>

    <!-- ---->
    <!-- ---->
    <!-- ---->
    <!-- ---->
    <div class="container">
    <div id="menuGauche">
      <section>
        <h4>(1ere étape) Choisir la matière et sa forme</h4>
        <table class="customTable">
          <thead>
          <tr>
            <th style="background-color: yellow;">Acier</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><input type="radio" id="one" value="ACAN" v-model="picked" @change="changeValue"/><label for="one">Angle</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="four" value="ACBC" v-model="picked" @change="changeValue"/><label for="four">BARRE CARRÉE</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="seven" value="ACBR" v-model="picked" @change="changeValue"/><label for="seven">BARRE RONDE</label></td>
          </tr>

          <tr>
            <td><input type="radio" id="thirteen" value="ACPU" v-model="picked" @change="changeValue"/><label for="thirteen">POUTRE EN U</label></td>
          </tr>
          <tr>

            <td><input type="radio" id="sixteen" value="ACTU" v-model="picked" @change="changeValue"/><label for="sixteen">Tube</label></td>

          </tr>
          <tr>
            <td><input type="radio" id="nineteen" value="ACTUY" v-model="picked" @change="changeValue"/><label for="nineteen">TUYAU</label></td>
          </tr>

          <tr>
            <th style="background-color: #1565c0;">Aluminium</th>
          </tr>
          <tr>
            <td><input type="radio" id="two" value="ALAN" v-model="picked" @change="changeValue"/><label for="two">ANGLE</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="five" value="ALBC" v-model="picked" @change="changeValue"/><label for="five">BARRE CARRÉE</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="eight" value="ALBR" v-model="picked" @change="changeValue"/><label for="eight">BARRE RONDE</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="fourteen" value="ALPU" v-model="picked" @change="changeValue"/><label for="fourteen">POUTRE EN U</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="seventeen" value="ALTU" v-model="picked" @change="changeValue"/><label for="seventeen">TUBE</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="twenty" value="ALTUY" v-model="picked" @change="changeValue"/><label for="twenty">TUYAU</label></td>
          </tr>


          <tr>
            <th style="background-color: green;">Stainless Steel</th>
          </tr>
          <tr>
            <td><input type="radio" id="three" value="SSAN" v-model="picked" @change="changeValue"/><label for="three">Angle</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="six" value="SSBC" v-model="picked" @change="changeValue"/><label for="six">BARRE CARRÉE</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="nine" value="SSBR" v-model="picked" @change="changeValue"/><label for="nine">BARRE RONDE</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="eighteen" value="SSTU" v-model="picked" @change="changeValue"/><label for="eighteen">TUBE</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="twentyone" value="SSTUY" v-model="picked" @change="changeValue"/><label for="twentyone">TUYAU</label></td>
          </tr>

          <tr>
          </tr>
          </tbody>
        </table>
        <span>value: {{picked}}</span>
      </section>
    </div>
    <!-- ---->
    <!-- ---->
    <!-- ---->

    <!-- ---->
    <div class="flex-item">
      <TitleInventaire :place_holder="well"></TitleInventaire>

      <div class="flex-item" v-for="InvenDet in InventDisplay" v-bind:key="InvenDet.ID">
        <InventaireAVendre :place_holder="InvenDet" v-bind:bindClientID="bindClientID"></InventaireAVendre>
      </div>
    </div>
  </div>
    <!--
        <ul class="enLigne">
          <li v-for="InvenDet in InvenDets" v-bind:key="InvenDet.ID">
            !--
            <span class="enColonne">{{ InvenDet.ID }} ::</span>
              <span class="enColonne">{{InvenDet.InPurcId_ExPurcId}} ::</span>
            <span>{{InvenDet.DiminutifMB}}</span>
            <span>{{InvenDet.DiminutifForme}}</span>
            --
        <InventaireAVendre :place_holder="InvenDet"></InventaireAVendre>
        <br> <br>
      </li>
    </ul>
    -->
    <div v-if="0">
    <ul class="enLigne">
    <div v-for="InvenDet in InventDisplay" v-bind:key="InvenDet.ID">
      <InventaireAVendre_v2 :place_holder="InvenDet" v-bind:bindClientID="bindClientID"></InventaireAVendre_v2>
    </div>
    </ul>
    </div>


  </div>
</template>

<script>
import TitleInventaire from '../components/TitleInventaire.vue'
import InventaireAVendre from '../components/InventaireAVendre.vue'
import InventaireAVendre_v2 from '../components/InventaireAVendre_v2.vue'
// import {loginUrl} from '../../views/config'
/* eslint-disable */
// C:\nodejs\metalCart\src\components
import axios from 'axios';
import {apiServeurmssql} from '../../src/views/config.js';

  export default {
  name: 'ListeInventaire',
  components:{ TitleInventaire, InventaireAVendre, InventaireAVendre_v2 },
  data () {
    return {
      well: 'Welcome to Your Vue.js App', InvenDets: [], InventDisplay: [], picked: 'ACAN', lesParams: '', formData: {InPurcId_ExPurcId : 'a', checked: false, checked2: false, What: 'What', selectedUser: '', laSession: 'videur' }
    }
  },
  props: {
      msg: String,  bindLaSession: String, bindClientID: String
    },
  methods: {
    getinventaire () {
      this.InventDisplay = [];
      // alert('asdf');
      // eslint-disable-next-line no-undef
      //axios.get(`https://serveurmssql.azurewebsites.net/getInventaire/`, {params: { id: this.picked}},
      //axios.get(`http://localhost:1337/getInventaire/`, {params: { id: this.picked }},
      this.laSession = 'videur';
      let params = {
        id : this.picked,
        laSession: this.laSession
      };
      console.log(params);
      // headers: {'x-access-token': localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
      //axios.get(`${apiServeurmssql}getInventaire/`, {params: { id: this.picked, laSession: this.laSession }},
      axios.get(`${apiServeurmssql}getInventaire/`, {params},
        {
          headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      )
        .then(res => {
          // eslint-disable-next-line eqeqeq
          if (res.data.status === true) {
            console.log(' res.data.InvenDet=' + res.data.InvenDet);
            this.InvenDets = res.data.InvenDet
            //alert(this.InvenDets[0].InPurcId_ExPurcId);
            //return;
            let ls_DescriptionCourte = '';
            let lt_tuple1;
            let lt_tuple2
            if( this.InvenDets.length > 0){
              ls_DescriptionCourte = this.InvenDets[0].DescriptionCourte;
              lt_tuple1 = new Object();
              //lt_tuple1 = this.InvenDets[0]
              lt_tuple1.DiminutifMB = this.InvenDets[0].DiminutifMB;
              lt_tuple1.DiminutifForme = this.InvenDets[0].DiminutifForme;
              lt_tuple1.DescriptionCourte = this.InvenDets[0].DescriptionCourte;
              lt_tuple1.DescriptionLongue = this.InvenDets[0].DescriptionLongue;
              //lt_tuple1.Montant = 1234;
              this.InventDisplay.push(lt_tuple1);

              lt_tuple2 = new Object();
              lt_tuple2.ID = this.InvenDets[0].ID;
              lt_tuple2.InPurcId_ExPurcId = this.InvenDets[0].InPurcId_ExPurcId;
              lt_tuple2.ExPurcId = this.InvenDets[0].ExPurcId;
              console.log(' this.InvenDets[0].Montant ' + this.InvenDets[0].Montant );
              lt_tuple2.Montant = this.InvenDets[0].Montant;
              lt_tuple2.OptionZ = this.InvenDets[0].OptionZ;
              lt_tuple2.NomForme = this.InvenDets[0].NomForme;
              lt_tuple2.DiminutifMB =  'vi';
              lt_tuple2.DiminutifForme = 'der';
              //alert( lt_tuple1.Montant);
              //alert( lt_tuple2.Montant);
              this.InventDisplay.push( lt_tuple2 );

            }
            for( let ii = 1; ii < this.InvenDets.length; ii++){
              if( this.InvenDets[ii].DescriptionCourte === ls_DescriptionCourte){
                //this.InvenDets[ii].DescriptionCourte = 'vider';
                //this.InvenDets[ii].DescriptionLongue = 'vider';
                //ac: ici
                lt_tuple2 = new Object();
                //lt_tuple1 = this.InvenDets[ii]
                lt_tuple2.ID = this.InvenDets[ii].ID;
                lt_tuple2.DiminutifMB = this.InvenDets[ii].DiminutifMB;
                lt_tuple2.DiminutifForme = this.InvenDets[ii].DiminutifForme;
                //lt_tuple2.DescriptionCourte = this.InvenDets[ii].DescriptionCourte;
                //lt_tuple2.DescriptionLongue = this.InvenDets[ii].DescriptionLongue;
                lt_tuple2.Montant = this.InvenDets[ii].Montant;
                lt_tuple2.NomForme = this.InvenDets[ii].NomForme;
                lt_tuple2.DiminutifMB = 'vi';
                lt_tuple2.DiminutifForme = 'der';
                this.InventDisplay.push( lt_tuple2 );

              }else{
                ls_DescriptionCourte = this.InvenDets[ii].DescriptionCourte;
                lt_tuple1 = new Object();
                lt_tuple1.DiminutifMB = this.InvenDets[ii].DiminutifMB;
                lt_tuple1.DiminutifForme = this.InvenDets[ii].DiminutifForme;
                lt_tuple1.DescriptionCourte = this.InvenDets[ii].DescriptionCourte;
                lt_tuple1.DescriptionLongue = this.InvenDets[ii].DescriptionLongue;
                lt_tuple1.Montant = 1234;
                this.InventDisplay.push(lt_tuple1);
                lt_tuple2 = new Object();
                lt_tuple2.ID = this.InvenDets[0].ID;
                lt_tuple2.InPurcId_ExPurcId = this.InvenDets[0].InPurcId_ExPurcId;
                lt_tuple2.ExPurcId = this.InvenDets[0].ExPurcId;
                console.log(' this.InvenDets[0].Montant ' + this.InvenDets[0].Montant );
                lt_tuple2.Montant = this.InvenDets[0].Montant;
                lt_tuple2.OptionZ = this.InvenDets[0].OptionZ;
                lt_tuple2.NomForme = this.InvenDets[0].NomForme;
                lt_tuple2.DiminutifMB =  'vi';
                lt_tuple2.DiminutifForme = 'der';
                //alert( lt_tuple1.Montant);
                //alert( lt_tuple2.Montant);
                this.InventDisplay.push( lt_tuple2 );
  /*
                lt_tuple2 = this.InvenDets[ii]
                lt_tuple2.Montant = 4321;
                lt_tuple2.DiminutifMB = 'vi';
                lt_tuple2.DiminutifForme = 'der';
                //alert( lt_tuple1.Montant);
                //alert( lt_tuple2.Montant);
                this.InventDisplay.push( lt_tuple2 );
                //alert( this.InventDisplay[0].ID );
                this.InventDisplay[ii].Montant = '';
*/
                //alert( this.InventDisplay[1].ID );
                //this.InventDisplay[ii + 1].DiminutifMB = 'vi';
                //this.InventDisplay[ii + 1].DiminutifForme = 'der';
              }
            }

          }
        })
    },
    changeValue(){
      //alert("changeValue(value){ value=" + this.picked);
      this.getinventaire();
      //this.lesParams = `{params: { id: 'ACTU' }}`;
      //if( value === "0"){
      //  color = "ACTU";
      //}

    },
    changeTitle(){
      //alert('changeTitle(){');
      this.$emit('changeTitle', 'Vue Wizard');
    }
  },

  mounted () {
    this.getinventaire();

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
h4 {
  margin: 10px 0 0;
}
h5 {
  margin: 10px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
  border: 0px solid blue;
}
a {
  color: #42b983;
}
.enLigne{
  display: flex;
  display: grid;
  margin: 0 0px;
  border: 0px solid green;
  margin: 0px;
}
.enColonne{
  display: flex;
  display: inline-block;
  margin: 0 10px;
  border: 1px solid blue;
}
.flex-title {
  display: flex;
  background-color: grey;
  height: 70px;
  padding: 5px;
  padding: 3px;
  border-style: double;
  border: 1px solid blue;
}
.flex-title > div {
  background-color: red;
  color: white;
  height: 60px;
  margin: 3px;
  padding: 3px;
  font-size: 18px;
  flex: 0 0 55px;
  border: 1px solid blue;
}
#checkboxes input{
  display: inline-block;
  margin-right: 10px;
}
#checkboxes label{
  display: inline-block;
}

table.GeneratedTable {
  width: 100%;
  background-color: #ffffff;
  border-collapse: collapse;
  border-width: 2px;
  border-color: #ffcc00;
  border-style: solid;
  color: #000000;
}

table.GeneratedTable td, table.GeneratedTable th {
  border-width: 1px;
  border-color: #ffcc00;
  border-style: solid;
  padding: 1px;
}

table.GeneratedTable thead {
  background-color: #ffcc00;
}
table.customTable {
  width: 175px;
  background-color: #FFFFFF;
  border-collapse: collapse;
  border-width: 1px;
  border-color: #A9B1F8;
  border-style: groove;
  color: #000000;
}

table.customTable td, table.customTable th {
  border-width: 1px;
  border-color: #A9B1F8;
  border-style: groove;
  padding: 5px;
}

table.customTable thead {
  background-color: #CCCCCC;
}
#menuGauche{
  width: 400px;
  font-family: Verdana;
  font-size: 11px;
}
.container{
  display: flex;
  height: 650px;
}
.flex-item{
  flex-grow: 1;
}
</style>
