<template>
  <div>
    <div  v-if="1" id="login">
      <h1>Leclerc Robotique inc.</h1>
      <h3>Créer Compte</h3>
      <table>
        <tr>
          <td><label>*Courriel: </label></td>
          <td><input type="text" name="Email" id="iEmail" v-model="input.Email" v-on:keyup="if_validerEmail()" placeholder="Courriel, Email" title="Important de respecter le format du courriel"/>abc@def.com
            <p class="p" id="pEmail">Important de respecter le format du courriel</p>
          </td>

        </tr>

        <tr>
          <td><label title="Minimum de 5 lettres et maximum de 10 lettres.">*Mot de passe:</label></td>
          <td><input type="password" name="pwd" v-model="input.pwd1" title="Minimum de 4 lettres et maximum de 10 lettres."/></td>
        </tr>

        <tr>
          <td><label title="Minimum de 5 lettres et maximum de 10 lettres.">*Confirmer: Mot de passe:</label></td>
          <td><input type="password" name="pwd2" v-model="input.pwd2" title="Minimum de 4 lettres et maximum de 10 lettres."/></td>
        </tr>

        <tr>
          <td><label>*Téléphone: </label></td>
          <td><input type="text" name="phone" id="phone" v-model="input.phone" v-on:keyup="if_validerTelephonel()"  placeholder="Téléphone, phone"  title="Important de respecter le format du téléphone" />999-999-9999
            <p class="p" id="idTelephone">Important de respecter le format du téléphone</p>
          </td>
        </tr>
        <tr>
          <td><label>*Adresse de livraison</label></td>
          <td></td>
        </tr>
        <tr>
          <td><label>*Civic: </label></td>
          <td><input type="text" name="address" v-model="input.address" placeholder="adresse, address"  title="numéro civic + nom de la rue" /></td>
        </tr>
        <tr>
          <td><label>*Ville: </label></td>
          <td><input type="text" name="city" v-model="input.city" placeholder="Ville, City" /></td>
        </tr>
        <tr>
          <td><label>*Code Postal: </label></td>
          <td> <input type="text" name="postalcode" v-model="input.postalcode" placeholder="Code Postal, Postal Code" title="Important de respecter le format du Code Postal" @dblclick="if_ondblclick(1)"/>G1G 1G1</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td><a href="#" v-on:click.prevent="login">Login</a></td>
        </tr>
      </table>

      <!--
      <br>
      <input type="password" name="password" v-model="input.password" placeholder="password, password" />
      <br>
      -->
      <button type="button" v-on:click="create()" title="Cliquez ici pour créer votre compte: (elle sera créé une seule fois)">Créer</button>
      <br>
      <input type="text" id="message" name="message" width="148" v-model="message" readonly title="S'il y a une erreur, elle s'affichera ici." />
    </div>
    <div  v-if="!ib_voir"  id="vide">
      <label><h3>Vous êtes déjà inscrit. </h3> </label>
    </div>

    <!--
    <div id="loginGoogle">
    <a href="<GENERATED_GOOGLE_URL>">Login with Google</a>
     https://yourwebsite.com/callback?code=a-bunch-of-random-characters
    </div>
    <br>
    -->
    <!--
  <div>
    <a class="google-btn" href="/auth/google">Google+</a>
  </div>
  -->
  </div>
</template>

<script>
import axios from 'axios';
import {apiServeurmssql} from '../../src/views/config.js';


export default {
  name: 'login',
  data() {
    return {
      input: {
        Email: '',
        phone: '',
        address: '',
        city: '',
        postalcode: '',
        pwd1: '',
        pwd2: ''
      },
      message: '',
      ib_voir: true,
      is_ClientID: ''
    }
  },
  methods: {
    create() {
      if(this.input.Email !== "" && this.input.phone !== "") {
        //alert( this.input.username );
        this.message = "";

        if( !this.validateEmail(this.input.Email)){
          this.message = "Le courriel est non valide.";
          return;
        }else{
          this.message = "";
        }
        if( this.input.pwd1.length < 5 ){
          this.message = "Le mot de passe est trop court.";
          return
        }
        if( this.input.pwd1.length > 10 ){
          this.message = "Le mot de passe est trop long.";
          return
        }
        if( this.input.pwd1 !== this.input.pwd2){
          this.message = "Les mots de passe ne concordent pas.";
          return
        }
        if( !this.validatePhone(this.input.phone)){
          this.message = "Le téléphone est non valide.";
          return;
        }else{
          this.message = "est bon le téléphone";
        }

        if( this.input.postalcode !== ""){
          if( !this.checkPostal(this.input.postalcode)) {
            this.message = "Le code postal est non valide.";
            return;
          }
        }
        this.message = "";
        let params = {
          Email: this.input.Email,
          phone: this.input.phone,
          address: this.input.address,
          city: this.input.city,
          postalcode: this.input.postalcode,
          password: this.input.pwd1,
        };
        axios.post(`${apiServeurmssql}createAccount/`, params,
          {
            headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
          }
        )
          .then(res => {
            console.log(' res.status=' + res.status);
            alert( 'Le compte de [' + this.input.Email + '] est créé')
            // eslint-disable-next-line eqeqeq
            //this.sousTotal = 0.00
            //if (res.data.status === true) {
            //  console.log(' res.data.InvenDet=' + res.data.KartMetaux);
            //  this.kartArray = res.data.KartMetaux
            //}

          })
/*
        if(this.input.username === this.$parent.mockAccount.username && this.input.password === this.$parent.mockAccount.password) {
          this.$emit('authenticated', true);
          this.$router.replace({ name: 'secure' });


        } else {
          console.log('The username and / or password is incorrect');
        }*/
      } else {
        console.log('A username and password must be present');
        this.message = "Le courriel et le téléphone sont obligatoires."
      }
      /// OR
      /***
      this.$store.dispacth('retrieveToken',{
        username: this.username,
        password: this.password,
      }).then(response => {
        this.$router.push({name: 'todo' })
      })
      ***/
    },
    validateEmail(email){
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validatePhone( argPhone ){
      return argPhone.match(/\d/g).length===10;
    },
    checkPostal(postal) {
      let regex = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i);
      if (regex.test(postal))
        return true;
      else return false;
    },
    login() {
      //this.$auth.login();
      alert( "loggin quand");
    },
    if_ondblclick(condition){
      //alert('if_ondblclick(){');
      if( condition === 1){
        this.input.Email = 'andrec@leclercrobotique.com';
        this.input.pwd1 = '12345';
        this.input.pwd2 = '12345';
        this.input.phone = '999-999-9999';
        this.input.address = '5, ave';
        this.input.city = 'ib';
        this.input.postalcode = 'H9H 9H9';
      }
      if( condition === 2){
        this.is_ClientID = 'andre.cloutier.4@ulaval.ca';
      }
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
    if_validerEmail(){
      const patterns={
        telephone: /^\d{10}$/,
        username: /^[a-z\d]{5,12}$/i,
        password: /^[\w@-]{8-20}$/,
        slug: /^[a-z\d-]{8,20}$/,
        email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
        phoneno: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
      };
      let lb_pattern = patterns["email"].test( this.input.Email );
      console.log(patterns["email"].test( this.input.Email ));
      if( lb_pattern ){
        document.getElementById("iEmail").className = 'classEmail';

      }else{
        document.getElementById("iEmail").className = '';
      }

    },
    if_validerTelephonel(){

      const patterns={
        telephone: /^\d{10}$/,
        username: /^[a-z\d]{5,12}$/i,
        password: /^[\w@-]{8-20}$/,
        slug: /^[a-z\d-]{8,20}$/,
        email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
        phoneno: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
      };
      let lb_pattern = patterns["telephone"].test( this.input.phone );
      console.log(patterns["telephone"].test( this.input.phone ));
      //si vrai
      if( lb_pattern ){
        document.getElementById("phone").className = 'classTelephone';
        document.getElementById("idTelephone").style.visibility = "hidden";
      }
      else{
        document.getElementById("idTelephone").className = 'p';
        document.getElementById("phone").className = '';
        document.getElementById("idTelephone").style.visibility = "visible";
      }

    }
  },
  mounted() {

    let recaptchaScript = document.createElement('script');

    recaptchaScript.setAttribute('src', '/vue-authenticate.js');
    document.head.appendChild(recaptchaScript);

    this.ib_voir = true;
    this.is_ClientID = this.getCookie('ClientID');
    if (this.is_ClientID.length >= 4){
      this.ib_voir = false;
    }
  },
  async created() {
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped>

#login {
  width: 500px;
  border: 3px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 25px;
  padding: 20px;
}
.google-btn{
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  padding: 10px;
  background: #ff5353;
}
#message{
  width: 300px;
  background-color: #fcffc1;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
p{
  font-family: arial, sans-serif;
  font-size: 9px;
}
.classTelephone{
  font-family: arial, sans-serif;
  font-size: 14px;
  border-style: solid;
  border-color: #0F0;
}
.classEmail{
  font-family: arial, sans-serif;
  font-size: 14px;
  border-style: solid;
  border-color: #0F0;
}

</style>
