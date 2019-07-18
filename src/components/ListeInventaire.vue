<template>
  <div class="enLigne">
    <h4 v-on:click="changeTitle">hhh{{bindLaSession}}iii</h4>
    <button @click="changeTitle">{{msg}}</button>
    <br>
    <h5>{{ msg }}</h5>
    <!--
            <button name="unBouttonInventaire" @click="getinventaire">Submit Inventaire</button>
            -->
    <!-- v-bind:key="InvenDet.id"-->
    <!-- [InvenDet.ID] -->
    <!-- <Testing/> -->
    <!-- ---->
    bindLaSession={{bindLaSession}}
    <div id="checkboxes">
      <section>
        <h3>(1ere étape) Choisir la matière et sa forme</h3>
        <table class="customTable">
          <thead>
          <tr>
            <th style="background-color: yellow;">Acier</th>
            <th style="background-color: #1565c0;">Aluminium</th>
            <th style="background-color: green;">Stainless Steel</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><input type="radio" id="one" value="ACAN" v-model="picked" @change="changeValue"/><label for="one">Angle</label></td>
            <td><input type="radio" id="two" value="ALAN" v-model="picked" @change="changeValue"/><label for="two">ANGLE</label></td>
            <td><input type="radio" id="three" value="SSAN" v-model="picked" @change="changeValue"/><label for="three">Angle</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="four" value="ACBC" v-model="picked" @change="changeValue"/><label for="four">BARRE CARRÉE</label></td>
            <td><input type="radio" id="five" value="ALBC" v-model="picked" @change="changeValue"/><label for="five">BARRE CARRÉE</label></td>
            <td><input type="radio" id="six" value="SSBC" v-model="picked" @change="changeValue"/><label for="six">BARRE CARRÉE</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="seven" value="ACBR" v-model="picked" @change="changeValue"/><label for="seven">BARRE RONDE</label></td>
            <td><input type="radio" id="eight" value="ALBR" v-model="picked" @change="changeValue"/><label for="eight">BARRE RONDE</label></td>
            <td><input type="radio" id="nine" value="SSBR" v-model="picked" @change="changeValue"/><label for="nine">BARRE RONDE</label></td>
          </tr>
          <tr>

            <td><input type="radio" id="ten" value="ACPL" v-model="picked" @change="changeValue"/><label for="ten">Plat</label></td>
            <td><input type="radio" id="eleven" value="ALPL" v-model="picked" @change="changeValue"/><label for="eleven">Plat</label></td>
            <td><input type="radio" id="twelve" value="SSPL" v-model="picked" @change="changeValue"/><label for="twelve">Plat</label></td>
          </tr>
          <tr>

            <td><input type="radio" id="thirteen" value="ACPU" v-model="picked" @change="changeValue"/><label for="thirteen">POUTRE EN U</label></td>
            <td><input type="radio" id="fourteen" value="ALPU" v-model="picked" @change="changeValue"/><label for="fourteen">POUTRE EN U</label></td>
            <td><input type="radio" id="fifteen" value="SSPU" v-model="picked" @change="changeValue"/><label for="fifteen">_</label></td>
          </tr>
          <tr>

            <td><input type="radio" id="sixteen" value="ACTU" v-model="picked" @change="changeValue"/><label for="sixteen">Tube</label></td>
            <td><input type="radio" id="seventeen" value="ALTU" v-model="picked" @change="changeValue"/><label for="seventeen">TUBE</label></td>
            <td><input type="radio" id="eighteen" value="SSTU" v-model="picked" @change="changeValue"/><label for="eighteen">TUBE</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="nineteen" value="ACTUY" v-model="picked" @change="changeValue"/><label for="nineteen">TUYAU</label></td>
            <td><input type="radio" id="twenty" value="ALTUY" v-model="picked" @change="changeValue"/><label for="twenty">TUYAU</label></td>
            <td><input type="radio" id="twentyone" value="SSTUY" v-model="picked" @change="changeValue"/><label for="twentyone">TUYAU</label></td>
          </tr>
          </tbody>
        </table>
        <span>value: {{picked}}</span>
      </section>
    </div>

    <!-- ---->
    <TitleInventaire :placeholder="well"></TitleInventaire>
    <!--
        <ul class="enLigne">
          <li v-for="InvenDet in InvenDets" v-bind:key="InvenDet.ID">
            !--
            <span class="enColonne">{{ InvenDet.ID }} ::</span>
              <span class="enColonne">{{InvenDet.InPurcId_ExPurcId}} ::</span>
            <span>{{InvenDet.DiminutifMB}}</span>
            <span>{{InvenDet.DiminutifForme}}</span>
            --
        <InventaireAVendre :placeholder="InvenDet"></InventaireAVendre>
        <br> <br>
      </li>
    </ul>
    -->

    <ul class="enLigne">
    <div v-for="InvenDet in InventDisplay" v-bind:key="InvenDet.ID">
      <InventaireAVendre :placeholder="InvenDet" v-bind:bindClientID="bindClientID"></InventaireAVendre>
    </div>
    </ul>

    <br>

  </div>
</template>

<script>
import TitleInventaire from '../components/TitleInventaire.vue'
import InventaireAVendre from '../components/InventaireAVendre.vue'
// import {loginUrl} from '../../views/config'
/* eslint-disable */
// C:\nodejs\metalCart\src\components
import axios from 'axios';
import {apiServeurmssql} from '../../src/views/config.js';

  export default {
  name: 'ListeInventaire',
  components:{ TitleInventaire, InventaireAVendre },
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
      //axios.get(`${apiServeurmssql}getInventaire/`, {params: { id: this.picked, laSession: this.laSession }},
      axios.get(`${apiServeurmssql}getInventaire/`, {params},
        {
          headers: {'x-access-token': localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
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
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
  border: 1px solid blue;
}
a {
  color: #42b983;
}
.enLigne{
  display: flex;
  display: grid;
  margin: 0 0px;
  border: 3px solid green;
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
  border-width: 2px;
  border-color: #ffcc00;
  border-style: solid;
  padding: 3px;
}

table.GeneratedTable thead {
  background-color: #ffcc00;
}
table.customTable {
  width: 100%;
  background-color: #FFFFFF;
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
  padding: 5px;
}

table.customTable thead {
  background-color: #CCCCCC;
}
</style>
