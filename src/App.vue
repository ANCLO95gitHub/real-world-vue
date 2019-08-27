<template>
  <div id="app">
    <div id="nav">
      <nav>
        <router-link style="color: #f2f2f2" to="/" exact><label>Portail   </label></router-link>
          <span v-if="ib_voir" class="container">
            <label>&nbsp;  &nbsp; &nbsp;&nbsp;</label>
            <router-link to="/login"  ><label>   Créer Compte </label></router-link>
          </span>
        <label>&nbsp;  &nbsp; &nbsp;&nbsp;</label>
          <router-link to="/ListCart" exact><label> ListCart </label></router-link>
        <img alt="Vue logo" src="../src/assets/MyCart.png" />
        <label>&nbsp;  &nbsp; &nbsp;&nbsp;</label>
          <router-link to="/about"><label> Au sujet de   </label></router-link>
        <label>&nbsp;  &nbsp; &nbsp;&nbsp;</label>
          <router-link to="/logout"><label> Sortir</label></router-link>
        <div></div>
      </nav>

    </div>
    <!-- -->
    <router-view />

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      authenticated: false,
      mockAccount: {
        username: 'nraboy',
        password: 'password'
      },
      products: 'Shoes',
      ib_voir: false,
      is_ClientID: ''
    }
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: 'home' })
    }
    this.ib_voir = false;
    this.is_ClientID = this.getCookie('ClientID');
    if (!this.is_ClientID.length >= 4){
      this.ib_voir = true;
    }
    this.ib_voir = true;
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
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
    }

  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<style scoped>
body {
  background-color: #f0f0f0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
#nav {
  font-family: Verdana;
  padding: 5px;
  background:red;
  color: #f2f2f2;
  text-decoration:none;
  visited:#f2f2f2;
  height: 25px;
}

#nav a {
  font-weight: bold;
  color: #f2f2f2;
  visited:#f2f2f2;
}

#nav a.router-link-exact-active {
  color: #42b983;
  visited:#f2f2f2;
}

#nav:hover{
  background-color: red;
}
#nav:visited {
  color: green;
}
router-link{
  color: #f2f2f2;
  text-decoration:none;
  visited:#f2f2f2;
}
label{
  color: #f2f2f2;
}
</style>
