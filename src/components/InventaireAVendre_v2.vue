<template>
  <div>
    <table class="customTable">

        <tr>
          <td id="td1" >
            <img :src="getPic(place_holder.DiminutifMB, place_holder.DiminutifForme)" alt=".."/>
          </td>
          <td id="td2" >
            {{ place_holder.DescriptionCourte }}<br />{{
            place_holder.DescriptionLongue
            }}
          </td>

          <td id="td3" >
            {{place_holder.ID}}
          </td>


          <td id="td4">
            {{place_holder.Montant}}
          </td>


          <td id="td5">
            <label>{{place_holder.OptionZ}}" zaq</label>
          </td>

          <td v-if="place_holder.ID>0" width="50px">
            <label  style="min-width:110px;max-width:110px;border: 1px solid grey" for="place_holder.NomForme">
              {{place_holder.NomForme}}
            </label>
          </td>
          <td v-else width="50px" style="border:0px;"></td>

          <td v-if="place_holder.ID>0" width="107px">
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

          <td v-if="place_holder.ID>0" width="105px">
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
            <!--  class="favorite styled" -->
            <button @click="validerButton(place_holder.Montant,place_holder.OptionZ,laQuantity, place_holder.ID, place_holder.InPurcId_ExPurcId, laLongueur)" v-bind:title=lsMessageTel>Ajouter</button>
            <br>
            <label width="105px">{{ lsMessageQty }}</label>
          </td>
          <td v-else width="75px" style="border:0px;"></td>

          <td v-if="place_holder.ID>0" width="107px">
            {{place_holder.InPurcId_ExPurcId}}
          </td>
          <td v-else width="17px" style="border:0px;"></td>
      </tr>

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
        this.lsMessageQty= "Entrez longueur";//S.v.p., Entrez une longueur désiré.
        return;
      }
      if(this.laQuantity < 1  || !Number.isInteger(+this.laQuantity)){
        this.lsMessageQty += "Entrez quantité"; //S.v.p.,Entrez une quantité .
        return;
      }
      if( (this.laLongueur * this.laQuantity) > OptionZ){
        this.lsMessageQty = "La longueur maximum est de " + OptionZ + " pouces. Vous avez pris :" + (this.laLongueur * this.laQuantity ) + " pouces.";
        return;
      }
      if( 1 === 2 ){
        this.lsMessageQty = this.laQuantity + " morceau(x) de " + this.laLongueur + " pouce(s) d'un total de :"  + (this.laLongueur * this.laQuantity) + " pouce(s)."
      }
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

<style scoped>

.styled {
  font-family: Verdana;
  border: 1px;
  line-height: 2.5;
  padding: 0 20px;
  font-size: 11px;
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

.customTable {
  width: 100%;
  background-color: #FFFFFF;
  border-collapse: collapse;
  border-width: 10px;
  border-color: #A9B1F8;
  border-style: groove;
  color: #000000;
  font-family: Verdana;
  font-size: 11px;
}
.customTable tr {
  border-width: 1px;
  border-color: #A9B1F8;
  border-style: groove;
  padding: 0px;
  margin: 0px;
  align: center;
}
.customTable td {
  border-width: 0px;
  border-color: #A9B1F8;
  border-style: groove;
  padding: 0px;
  margin: 0px;
  align: left;
}
#td1{
  width: 55px;

}
#td2{
  width: 200px;

}
#td3{
  width: 50px;
}
td4{
  width: 60px;
}
td5{
  width: 90px;
}

#idLongueur{
  width: 69px;
  height: 15px;
  margin-right: 19px;
  margin-top: -7px;
  border-width: 3px;
  float: right;
  font-family: Verdana;
  font-size: 11px;
}

#idQuantity{
  width: 69px;
  height: 15px;
  margin-top: -7px;
  border-width: 3px;
  font-family: Verdana;
  font-size: 11px;

}
img{
  height: 45px;
  width: 50px;
  max-width: 50px;
  max-height: 45px;
  border-style: none;
  border-width: 0px;
  border-style: groove;

}

.cimg{
  max-width: 50px;
  max-height: 54px;
  min-width: 50px;
  min-height: 50px;
  left: 190px;
  position: absolute;
}
</style>
