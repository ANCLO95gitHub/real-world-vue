<template>
  <div class="leHeader">
    <div>
      <h1> <router-link to="/">Les Métaux {{ id }}  (Développement en Cours) {{products}}</router-link> </h1>
      <label v-model="products" v-bind="products"></label>
    </div>
    <div class="leCart">
      <!--
      <a class="" href="/listcart"><img class="img-responsive" src="../../src/assets/shoppingCartPetit.png"/></a>
      -->
      <div>
        <router-link to="/listcart">
          <img
            class="img-responsive"
            src="../../src/assets/shoppingCartPetit.png"
            alt=""
          />Cart</router-link
        >
        <span class="badge"> {{ nbrItems }} </span> <span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloAgainWithID',
  data() {
    return { id: this.$route.params || 'no-id', nbrItems: 0 }
  }
}
</script>
<style scoped>
.leHeader {
  display: flex;
  font-min-size: 14px;
  border: 5px solid blue;
  font-size: 16px;
  font-weight: bold;
  font-family: Helvetica, Arial, sans-serif;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 140px;
  background-color: #475;
  overflow: scroll;
}
.leCart {
  directon: rtl;
  display: flex;
  justify-content: flex-end;
}
router-link {
  padding: 5px;
  text-decoration: none;
  background: #fff;
  border-radius: 3px;
  color: rgb(0, 110, 255);
  font-weight: bold;
  margin-right: 15px;
}
.box {
  direction: rtl;
  display: flex;
  justify-content: flex-end;
}
.badge {
  display: flex;
  background-color: #1565c0;
  justify-content: space-between;
  font-min-size: 8px;
  font-size: 20px;
}
div {
  display: flex;
  justify-content: space-between;
  font-min-size: 8px;
  font-size: 20px;
}
</style>
