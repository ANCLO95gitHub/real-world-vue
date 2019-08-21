<template>
  <div id="app">
    <div id="nav">
      <nav>
        <router-link to="/" exact>Portail</router-link> |
        <div v-if="!loggedIn">
          <span v-if="ib_voir" class="container">
            <router-link to="/login">Créer Compte</router-link> |
          </span>
          <router-link to="/ListCart" exact>ListCart</router-link> |
          <router-link to="/about">Au sujet de</router-link> |
          <router-link to="/logout">Sortir</router-link>
        </div>
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
    if (this.is_ClientID.length >= 4){
      this.ib_voir = true;
    }
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

<style>
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
  padding: 5px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
