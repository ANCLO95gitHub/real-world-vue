<template>
  <div>
    <div id="login">
      <h1>Leclerc Robotique inc.</h1>
      <h3>Créer Compte</h3>
      <table>
        <tr>
          <td><label>Courriel: </label></td>
          <td><input type="text" name="Email" v-model="input.Email" placeholder="Courriel, Email" title="Important de respecter le format du courriel"/>abc@def.ghi</td>
        </tr>
        <tr>
          <td><label>Téléphone: </label></td>
          <td><input type="text" name="phone" v-model="input.phone" placeholder="Téléphone, phone"  title="Important de respecter le format du téléphone" />999-999-9999</td>
        </tr>
        <tr>
          <td><label>Adresse de livraison</label><br></td>
          <td></td>
        </tr>
        <tr>
          <td><label>Civic: </label></td>
          <td><input type="text" name="address" v-model="input.address" placeholder="adresse, address"  title="numéro civic + nom de la rue" /></td>
        </tr>
        <tr>
          <td><label>Ville: </label></td>
          <td><input type="text" name="city" v-model="input.city" placeholder="Ville, City" /></td>
        </tr>
        <tr>
          <td><label>Code Postal: </label></td>
          <td> <input type="text" name="postalcode" v-model="input.postalcode" placeholder="Code Postal, Postal Code" title="Important de respecter le format du Code Postal" />G1G 1G1</td>
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
        password: ''
      },
      message: ''
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
        if( !this.validatePhone(this.input.phone)){
          this.message = "Le téléphone est non valide.";
          return;
        }else{
          this.message = "";
        }

        if( this.input.postalcode !== ""){
          if( !this.checkPostal(this.input.postalcode)) {
            this.message = "Le code postal est non valide.";
            return;
          }
        }
        return;
        this.message = "";
        let params = {
          Email: this.input.Email,
          phone: this.input.phone,
          address: this.input.address,
          city: this.input.city,
          postalcode: this.input.postalcode,
          password: this.input.password,
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
    }
  },
  mounted() {

    let recaptchaScript = document.createElement('script');

    recaptchaScript.setAttribute('src', '/vue-authenticate.js');
    document.head.appendChild(recaptchaScript);
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
</style>
