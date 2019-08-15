<template>
  <div class="list" v-theme="'wide'">
    <table class="customTable">
      <tbody>
        <tr v-rainbow>
          <td class="cimg" >
            <img :src="getPic(place_holder.DiminutifMB, place_holder.DiminutifForme)" alt=".."/>
          </td>
          <td  width="200px">
            {{ place_holder.DescriptionCourte }}<br />{{
            place_holder.DescriptionLongue
            }}
          </td>

          <td v-if="place_holder.ID>0" width="50px">
            {{place_holder.ID}}
          </td>
          <td v-else width="50px" style="border:0px;"></td>

          <td v-if="place_holder.ID>0" width="60px">
            {{place_holder.Montant}}$
          </td>
          <td v-else width="60px" style="border:0px;"></td>

          <td v-if="place_holder.ID>0" width="90px">
            <label>{{place_holder.OptionZ}}" <br> (*Poids) </label>
          </td>
          <td v-else width="90px" style="border:0px;"></td>

          <td v-if="place_holder.ID>0" width="50px" v-rainbow>
            <label  style="min-width:110px;max-width:110px;border: 1px solid grey" for="place_holder.NomForme">
              {{place_holder.NomForme}}
            </label>
          </td>
          <td v-else width="50px" style="border:0px;"></td>

          <td v-if="place_holder.ID>0" width="107px">
        <!--
        <select class="right" required style="width: 107px; float: right;" onchange="this.nextElementSibling.value=this.value">
          <option class="right" value="" ></option>
          <option class="right" value="1" >1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="24">24</option>
      </select>
        -->
            <input id="idLongueur" autofocus class="right" type="number" pattern="\d+" name="enpouce" v-model="laLongueur" @input="validerChamps(place_holder.Montant,place_holder.OptionZ,laQuantity)" />
          </td>
          <td v-else width="107px" style="border:0px;"></td>

          <td v-if="place_holder.ID>0" width="75px">
            <input id="idQuantity" class="right" type="number" pattern="\d+" name="enQty" v-model="laQuantity" @input="validerChamps(place_holder.Montant,place_holder.OptionZ,laQuantity)" value="1"  />
          </td>
          <td v-else width="75px" style="border:0px;"></td>

          <td v-if="place_holder.ID>0" width="75px">
            {{ lePrix }}$
          </td>
          <td v-else width="75px" style="border:0px;"></td>

          <td v-if="place_holder.ID>0" >
          <!--
          <input
                  type="button"
                  class="favorite styled"
                  id="button"
                  v-model="button"
                  value="Ajouter au Cart"
                  @onclick="validerChamps"
          />
        <label>{{ laQuantity }}</label> -->
            <button class="favorite styled" @click="validerButton(place_holder.Montant,place_holder.OptionZ,laQuantity, place_holder.ID, place_holder.InPurcId_ExPurcId, laLongueur)" v-bind:title=lsMessageTel>Ajouter ((418) 878-0230)</button>
            <br>
            <label>{{ lsMessageQty }}</label>
          </td>
          <td v-else width="75px" style="border:0px;"></td>

          <td v-if="place_holder.ID>0" width="107px">
            {{place_holder.InPurcId_ExPurcId}}
          </td>
          <td v-else width="17px" style="border:0px;"></td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from 'axios';
import {apiServeurmssql} from '../../src/views/config.js';
export default {

  name: "InventaireAVendre",
  data() {
    return { laLongueur: 0, checked: "Ajouter au Cart", laQuantity:"0", lsMessageQty: '', lePrix: 0.00, lsMessageTel: 'Pour acheter l item, contacter le ((418) 878-0230).  (site web en construction)', valider: false, is_ClientID:'' };
  },
  methods: {
    getPic(mb, forme) {
      return require("../../src/assets/" + mb + forme + ".jpg");
    },
    validerChamps(montant, OptionZ, quantity){
      console.log('validerChamps(montant, OptionZ, quantity)');
      console.log('OptionZ=' + OptionZ);
      console.log('this.laLongueur=' + this.laLongueur);
      console.log('this.laQuantity=' + this.laQuantity);
      //alert('work !Number.isInteger(this.laLongueur=' + Number.isInteger(+this.laLongueur));
      //alert('work in progress 222  place_holder.OptionZ=' + OptionZ);
      this.lsMessageQty="";
      this.lePrix  = 0.00;
      this.valider = false;

      if(this.laLongueur < 1 || !Number.isInteger(+this.laLongueur)){
        this.lsMessageQty= "S.v.p., Entrez une longueur désiré. ";
        return;
      }
      if(this.laQuantity < 1  || !Number.isInteger(+this.laQuantity)){
        this.lsMessageQty += "S.v.p., Entrez une quantité.";
        return;
      }
      if( (this.laLongueur * this.laQuantity) > OptionZ){
        this.lsMessageQty = "La longueur maximum est de " + OptionZ + " pouces. Vous avez pris :" + (this.laLongueur * this.laQuantity ) + " pouces.";
        return;
      }
      this.lsMessageQty = this.laQuantity + " morceau(x) de " + this.laLongueur + " pouce(s) d'un total de :"  + (this.laLongueur * this.laQuantity) + " pouce(s)."

      // Number.isInteger(123) //true
      let division = (montant / OptionZ * +this.laLongueur) * +this.laQuantity;
      //alert('division=' + division.toFixed(2) );
      this.lePrix = division.toFixed(2);
      this.valider = true;
    },
    validerButton(montant, OptionZ, quantity, IDID, ExPurcId, laLongueur){

      this.validerChamps(montant, OptionZ, quantity);

      console.log('quantity=', quantity );


      if( this.valider ){
        const formData = new FormData();
        console.log('AVANT formData.append  ExPurcId=' + ExPurcId);
        formData.append('clientID', this.is_ClientID);
        formData.append('ExPurcId', ExPurcId);  //place_holder.InPurcId_ExPurcId
        console.log('this.bindClientID=' + this.bindClientID);
        this.is_ClientID = this.getCookie("ClientID");
        console.log('this.is_ClientID=' + this.is_ClientID);
        let dataFollow = {'clientID': this.is_ClientID, 'courriel': this.is_ClientID, 'IDID': IDID , 'ExPurcId': ExPurcId, 'laLongueur': laLongueur, 'Quantity': quantity, 'prix': this.lePrix, 'OptionZ': OptionZ };
        console.log('dataFollow=', dataFollow );
        //console.log('localStorage.getItem(\'token\')=' + localStorage.getItem('token'));
        //for( let jj = 1; jj <= quantity; jj++){
        //      axios.post(`http://localhost:1337/postkart/`, dataFollow,
        //axios.post(`https://serveurmssql.azurewebsites.net/postkart/`, {params: { id: this.picked}},
        // 'x-access-token': localStorage.getItem('token'),
        ///axios.post(`https://serveurmssql.azurewebsites.net/postkart/`, dataFollow,
        //let titi= loginUrl.apiServeurmssql;
        //axios.post(`http://localhost:1337/postkart/`, dataFollow,

        axios.post(`${apiServeurmssql}postkart/`, dataFollow,
          {
            headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Content-Type': 'application/json'}
          }
        ).then(res => {
          console.log(' res.status=' + res.status);
        });
      //}
         /* axios.post(`${apiServeurmssql}postkart/`, {'clientID': this.is_ClientID} ).then(res => {
          console.log(' res.status=' + res.status);
        }); */
      //this.$router.replace({ name: 'ListCart' })
      }
      //this.$http.post('http://localhost:8080/Login');
      //   `https://serveurmssql.azurewebsites.net/getInventaire/`
      //    let titi = apiServer;
      /*if( this.valider ){
        //window.open('http://localhost:8080/Login');
        console.log( 'if( this.valider ){')
        axios.post('http://localhost:8080/login', {body: { username: this.checked}}).then( res => {
          console.dir(res);
        }).catch(e => {
          console.dir(e);
        })
      }*/
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
    //window.scrollTo(0,document.body.scrollHeight);
    //console.log('this.bindClientID=' + this.bindClientID);
    this.is_ClientID = this.bindClientID;
    //console.log('this.is_ClientID=' + this.is_ClientID);
  },
  props: {place_holder: Object, bindClientID: String}
};
</script>

<style lang="scss" scoped>
@import "../styles/typography.scss";
@import "../styles/color.scss";

.flex-container {
  display: flex;
  background-color: #95a5a6;
  height: 100px;
  padding: 1px;
  border-style: double;
}
.flex-container > div {
  background-color: #95a5a6;
  height: 60px;
  margin: 3px;
  padding: 1px;
  font-size: 20px;
  flex: 0 0 55px;
}
.img-responsive {
  display: block;
  width: auto;
  max-height: 100%;
  margin: auto;
  max-width: 75px;
}
.tracks {
  display: flex;
  flex-direction: column;
  .tracks-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 5px 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid $main-color;
  }
}
.list {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100px;
  .track {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 155px;
    text-indent: 30px;
    border: 5px solid red;
    border-bottom: 1px solid $main-color;
    justify-content: space-between;
    span {
      width: 350px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:nth-of-type(even) {
      background-color: $main-color;
      span {
        color: $secondary-color;
      }
    }
    &:nth-of-type(odd) {
      background-color: white;
      span {
        color: $main-color;
      }
    }
    .button {
      margin-right: 5px;
    }
  }
}
.styled {
  border: 0;
  line-height: 2.5;
  padding: 0 20px;
  font-size: 1rem;
  text-align: center;
  color: #fff;
  text-shadow: 1px 1px 1px #000;
  border-radius: 10px;
  background-color: rgba(220, 0, 0, 1);
  background-image: linear-gradient(
    to top left,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.2) 30%,
    rgba(0, 0, 0, 0)
  );
  box-shadow: inset 2px 2px 3px rgba(255, 255, 255, 0.6),
    inset -2px -2px 3px rgba(0, 0, 0, 0.6);
}

.styled:hover {
  background-color: rgba(255, 0, 0, 1);
}

.styled:active {
  box-shadow: inset -2px -2px 3px rgba(255, 255, 255, 0.6),
    inset 2px 2px 3px rgba(0, 0, 0, 0.6);
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
  background-color: #95a5a6;
}
.right { text-align: right; height: 20px }
select { width: 100px; text-align-last:center; }


#idLongueur{
  width: 69px;
  height: 15px;
  margin-right: 19px;
  margin-top: -7px;
  border-width: 3px;
  float: right;
}

#idQuantity{
  width: 69px;
  height: 15px;
  margin-top: -7px;
  border-width: 3px;

}
img{
  height: 50px;
  width: 50px;
  max-width: 50px;
  max-height: 50px;
  border-style: none;
}

.cimg{
  max-width: 50px;
  max-height: 54px;
  min-width: 50px;
  max-height: 50px;
}
</style>
