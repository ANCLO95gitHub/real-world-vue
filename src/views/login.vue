<template>
  <div>
    <div id="login">
      <h1>Leclerc Robotique inc.</h1>
      <h1>Login</h1>
      <input type="text" name="username" v-model="input.username" placeholder="Courriel, Email" />
      <input type="password" name="password" v-model="input.password" placeholder="Téléphone, Phone" />
      <button type="button" v-on:click="login()">Login</button>
    </div>
    <div id="loginGoogle">
      <a href="<GENERATED_GOOGLE_URL>">Login with Google</a>
      <!--
       https://yourwebsite.com/callback?code=a-bunch-of-random-characters
      -->
    </div>
    <br>
    <div>
      <a class="google-btn" href="/auth/google">Google+</a>
    </div>

  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      input: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      if(this.input.username !== "" && this.input.password !== "") {
        if(this.input.username === this.$parent.mockAccount.username && this.input.password === this.$parent.mockAccount.password) {
          this.$emit("authenticated", true);
          this.$router.replace({ name: "secure" });
        } else {
          console.log("The username and / or password is incorrect");
        }
      } else {
        console.log("A username and password must be present");
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
    }
  }
}
</script>

<style scoped>
#login {
  width: 500px;
  border: 3px solid #CCCCCC;
  background-color: #FFFFFF;
  margin: auto;
  margin-top: 100px;
  padding: 20px;
}
.google-btn{
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  padding: 10px;
  background: #ff5353;
}
</style>
