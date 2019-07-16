<template>
  <div class="home">

    <img alt="Vue logo" src="../assets/logo.png" />

    <HelloWorld msg="Bienvenue à L. R. Métal: App  (418) 878-0230"  v-bind:bindLaSession="laSession" />

    <LeFooter msg="Une Entreprise de HOME inc."/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import LeFooter from "@/components/LeFooter.vue";

export default {
  name: "home",
  data() {
    return { laSession: 'Je viens de HOME'
    }
  },
  components: { 'HelloWorld':HelloWorld, 'LeFooter':LeFooter }
};
</script>
<style scoped>
div{
  border-style: solid;
}
</style>
