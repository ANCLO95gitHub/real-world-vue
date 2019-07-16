<template>
  <div>
    details DEBUT<br>


    <!-- ---->
    <div id="checkboxes">
      <section>
        <h3>Choisir la matière et sa forme</h3>
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

    <button @click="getpoidsmetaux">getpoidsmetaux</button>
    <button @click="getpoidsmetaux4">getpoidsmetaux4</button>
    <table class="GeneratedTable">
      <thead>
        <tr>
          <th width="67px"> Image</th>
          <th width="65px">ID</th>
          <th width="103px">NomMB</th>
          <th width="103px">Diminutif MB</th>
          <th width="95px">Nom Forme</th>
          <th width="70px">Diminutif Forme</th>
          <th width="70px">ThickDiam</th>
          <th width="70px">OptionX</th>
          <th width="70px">OptionY</th>
          <th width="70px">OptionZ</th>
          <th width="70px">Grade</th>
          <th width="80px">PoidsEnLivre</th>
          <th width="90px">En Lecture</th>
          <th width="50px">M.A.J.</th>
        </tr>
      </thead>
    </table>
    <table class="GeneratedTable">
      <tbody>
        <tr>
          <div v-for="(PoidsDet, index) in PoidsMetaux" v-bind:key="index">
            <td  width="67px">
              <img :src="getPic(PoidsDet.DiminutifMB, PoidsDet.DiminutifForme)" alt=".."/>
            </td>
            <td width="65px">{{index}}</td>
            <td width="103px">{{PoidsDet.NomMB}}</td>
            <td width="103px">{{PoidsDet.DiminutifMB}}</td>
            <td width="95px">{{PoidsDet.NomForme}}</td>
            <td width="70px">{{PoidsDet.DiminutifForme}}</td>
            <td width="80px">{{PoidsDet.ThickDiam}}</td>
            <td width="70px">{{PoidsDet.OptionX}}</td>
            <td width="70px">{{PoidsDet.OptionY}}</td>
            <td width="70px">{{PoidsDet.OptionZ}}</td>
            <td width="80px">{{PoidsDet.Grade}}({{index}})</td>
            <td width="90px">
              <input class="right" type="number" pattern="\d+" name="enPoids" v-model="PoidsDet.PoidsEnLivre" value="0" style="width: 69px;height: 15px;"/></td>
            <td width="90px">{{enPoids}}
              <input type="checkbox" v-model="EnLecture" name="scales" >  <br>
            </td>
            <td width="50px">
              <input
                type="button"
                class="favorite styled"
                id="checkbox"
                v-model="checked"
                value="Mise à jour"
                v-on:click="insertpoidsmetaux(index, EnLecture);"
              />
            </td>

        </div>

        </tr>
      </tbody>
    </table>
    <br>
    <br>
    details FINS
</div>
</template>

<script>
import axios from 'axios';
import {apiServeurmssql} from '../../src/views/config.js';
export default {
  name: 'WeightEditAdmin',
  data () {
    return { msg: 'Welcome to Your WeightEditAdmin.vue', picked: 'ALBC', PoidsMetaux: [], retourPoidsMetaux: [], EnLecture:false}
  },
  methods: {
    getPic(mb, forme) {
      return require("../../src/assets/" + mb + forme + ".jpg");
    },
    getpoidsmetaux () {
      // alert('asdf');
      // eslint-disable-next-line no-undef
      axios.get(`${apiServeurmssql}getPoidsMetaux/`, {params: { id: this.picked }},
    {
      headers: {'x-access-token': localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
    }
    ).then(res => {
      // eslint-disable-next-line eqeqeq
     if (res.data.status === true) {
       //alert( JSON.stringify(res.data.PoidsMetaux));
        console.log(' res.data.PoidsMetaux=' + res.data.PoidsMetaux);
       //console.log(' JSON.stringifyres.data.PoidsMetaux=' + JSON.stringify(res.data.PoidsMetaux.recordset));
       //console.log(' JSON.stringify(res.data.PoidsMetaux.recordset)=' + JSON.parse(res.data.PoidsMetaux.recordset));
       //console.log(' parse ET JSON.stringify(res.data.PoidsMetaux.recordset)=' + JSON.parse(JSON.stringify(res.data.PoidsMetaux.recordset)));
       //console.log(' stringify ET parse ET stringiy=' + JSON.stringify(JSON.parse(JSON.stringify(res.data.PoidsMetaux.recordset))));
       this.PoidsMetaux = res.data.PoidsMetaux;
       //this.PoidsMetaux = res.data.PoidsMetaux.recordset;
       //this.PoidsMetaux = JSON.stringify(res.data.PoidsMetaux);
       //this.PoidsMetaux = JSON.parse(JSON.stringify(res.data.PoidsMetaux.recordset));
       //this.PoidsMetaux = JSON.stringify(JSON.parse(JSON.stringify(res.data.PoidsMetaux.recordset)));
       //alert(this.PoidsMetaux);
       //this.PoidsMetaux = JSON.stringify(JSON.parse(res.data.PoidsMetaux.recordset));
       //this.PoidsMetaux = JSON.parse(res.data.PoidsMetaux.recordset);
     }
     })
   },
    getpoidsmetaux4 () {
      // alert('asdf');  ac: a revoir nom du getpoidsmetaux4
      // eslint-disable-next-line no-undef
      axios.get(`https://serveurmssql.azurewebsites.net/getPoidsMetaux`,
        {
          headers: {'x-access-token': localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      ).then(res => {
        // eslint-disable-next-line eqeqeq
        if (res.data.status === true) {
          //alert( JSON.stringify(res.data.PoidsMetaux));
          console.log(' res.data.PoidsMetaux=' + res.data.PoidsMetaux);
          //console.log(' JSON.stringifyres.data.PoidsMetaux=' + JSON.stringify(res.data.PoidsMetaux.recordset));
          //console.log(' JSON.stringify(res.data.PoidsMetaux.recordset)=' + JSON.parse(res.data.PoidsMetaux.recordset));
          //console.log(' parse ET JSON.stringify(res.data.PoidsMetaux.recordset)=' + JSON.parse(JSON.stringify(res.data.PoidsMetaux.recordset)));
          //console.log(' stringify ET parse ET stringiy=' + JSON.stringify(JSON.parse(JSON.stringify(res.data.PoidsMetaux.recordset))));
          this.PoidsMetaux = res.data.PoidsMetaux;
          //this.PoidsMetaux = res.data.PoidsMetaux.recordset;
          //this.PoidsMetaux = JSON.stringify(res.data.PoidsMetaux);
          //this.PoidsMetaux = JSON.parse(JSON.stringify(res.data.PoidsMetaux.recordset));
          //this.PoidsMetaux = JSON.stringify(JSON.parse(JSON.stringify(res.data.PoidsMetaux.recordset)));
          //alert(this.PoidsMetaux);
          //this.PoidsMetaux = JSON.stringify(JSON.parse(res.data.PoidsMetaux.recordset));
          //this.PoidsMetaux = JSON.parse(res.data.PoidsMetaux.recordset);
        }
      })
    },
   insertpoidsmetaux( index, EnLecture ){
      // alert('dans f()')     return;     alert('index=' +index );
      const formData = new FormData();
      let uneFois = 0;
     alert('index=' +index );
      alert('EnLecture=' +EnLecture );

     //return;

      this.PoidsMetaux.forEach( element =>{
        alert('uneFois=' +uneFois );
        if (uneFois === index) {
          alert(' element.NomMB=' + element.NomMB);
          alert('element.PoidsEnLivre=' +element.PoidsEnLivre );

          formData.append('NomMB', element.NomMB);
          formData.append('DiminutifMB', element.DiminutifMB);
          formData.append('NomForme', element.NomForme);
          formData.append('DiminutifForme', element.DiminutifForme);
          formData.append('ThickDiam', element.ThickDiam);

          formData.append('OptionX', element.OptionX);
          formData.append('OptionY', element.OptionY)
          formData.append('OptionZ', element.OptionZ)
          formData.append('Grade', element.Grade)
          formData.append('PoidsEnLivre', element.PoidsEnLivre);
          formData.append('EnLecture', EnLecture)
      }
        uneFois++;
     })
//return;
     axios.post(`${apiServeurmssql}insertpoidsmetaux/`, formData,   {
         headers: {'x-access-token': localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
       }
     ).then(res => {
       // eslint-disable-next-line eqeqeq
       if (res.data.status === true) {
         console.log(' res.data=' + res.data);
         this.retourPoidsMetaux = res.data;
       }
     })

    },
    changeValue(){
      this.getpoidsmetaux();
    }
  },
  mounted () {
    this.getpoidsmetaux();
}
}
</script>

<style scoped>
img {
  height: 64px;
  width: 64px;
  min-width: 64px;
  max-width: 64px;
}
table.customTable {
  width: 100%;
  background-color: #FFFFFF;
  border-collapse: collapse;
  border-width: 2px;
  border-color: #A9B1F8;
  border-style: groove;
  color: #000000;
}
table.customTable td, table.customTable th {
  border-width: 1px;
  border-color: #A9B1F8;
  border-style: groove;
  padding: 2px;
}
table.customTable thead {
  background-color: #CCCCCC;
}

table.GeneratedTable {
  display: flex;
  width: 100%;
  background-color: #ffffff;
  border-collapse: collapse;
  border-width: 1px;
  border-color: #ffcc00;
  border-style: solid;
  color: #000000;
}
table.GeneratedTable td, table.GeneratedTable th {
  border-width: 1px;
  border-color: #ffcc00;
  border-style: solid;
  padding: 3px;
}
table.GeneratedTable thead {
  background-color: #95a5a6;
}

</style>
