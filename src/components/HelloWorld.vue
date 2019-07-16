<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>[{{vLaSession}}]</h2>
    <!--    <LeHeader />    -->
    <ListeInventaire msg='' v-bind:bindLaSession="vlaSession"  v-on:changeTitle="updateTitle($event)" />

    <!-- ac: ceci s affichera en bas de la page web -->
    <p>
      {{msg}}
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>
    </p>

    <!--
        <nav>
      <router-link to="/listcart">cart</router-link>
    </nav>
      <leDivers />
        <ListCart />
    <LeTesting />
    <TitleInventaire />
    -->
    <!--
    <LeFooter msg="Leclerc Robotique inc."/>
    -->
    <nav>
      <router-link v-if="1==1" to="/TheAdmin">The Admin</router-link> ||
      <router-link v-if="1==1" to="/TheAdmin2">The Admin2</router-link> ||
      <router-link to="/leDivers">Divers</router-link> |
    </nav>
pppppp    bindLaSession={{bindLaSession}}
  </div>
</template>

<script>
//import LeHeader from "@/components/LeHeader.vue";
import ListeInventaire from "@/components/ListeInventaire";
//import LeFooter from "@/components/LeFooter.vue";
//import ListCart from "@/components/ListCart.vue";
import leDivers from "@/components/divers.vue";
// import LeTesting from "@/components/Testing.vue";
// import TitleInventaire from '@/components/TitleInventaire.vue';
// LeHeader, LeFooter,  ListCart, LeTesting,  TitleInventaire
export default {
  name: "HelloWorld",
  data () {
    return { vlaSession: 'zzz' };
  },
  components: { ListeInventaire, leDivers },
  props: {
    msg: String,
    bindLaSession: String
  },
  methods: {
    updateTitle( upTitle ){
      //alert(upTitle);
      this.vLaSession = upTitle;
    }
  },
  computed: {
    user() {
      return this.$store.getters.getCurrentUser;
    }
  },
  async created() {
    console.log('async created() ');
    this.vlaSession = 'apres HOME, je viens de HelloWorld';
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
