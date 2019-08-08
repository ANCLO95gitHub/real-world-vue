<template>
  <div id="app">
    <div id="nav">
      <nav>
        <router-link to="/" exact>Portail</router-link> |
        <div v-if="!loggedIn">
          <router-link to="/login">Login</router-link> |
          <router-link to="/logout">Logout</router-link> |
          <router-link to="/ListCart" exact>ListCart</router-link> |
          <router-link to="/about">Au sujet de</router-link> |
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
      products: 'Shoes'
    }
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: 'home' })
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
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
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
