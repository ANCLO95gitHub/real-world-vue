<template>
  <div>
    {{rien}}
    <div class="float_right">
      <!--
      <span>
        <input class="search-input" type="text" :place_holder=''>
      </span>

      <span>
        <button class="btn waves-effect waves-light blue darken-3" id="btn_search" type="submit">Rechercher</button>
      </span>
            -->
    </div>

    <h1 v-if="1==2">1</h1>
    <table class="customTable">
      <thead>
        <tr>
          <th width='55px' title='Image à titre informatif seulement'>Image</th>
          <th width="200px">Dimension et Description de l'item</th>
          <th width="50px">ID</th>
          <th width="60px">Prix de l'Item</th>
          <th width="90px" title="Calcul du poids à définir...">Longueur et Poids (lbs.)</th>
          <th width="50px">
            Forme
          </th>
          <th width="107px" title="Inscrivez votre longueur en pouces">Cliquer la flèche<br>
            ou inscrivez la longueur</th>
          <th width="75px">Quantité</th>
          <th width="75px">Prix</th>
          <th>à déplacer dans le kart</th>
          <th width="107px"> Stock Number</th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'TitleInventaire',
  data () {
    return {rien: ''}
  },
  props: {
    place_holder: {
      type: String,
      required: false,
      default: 'Search'
    }
  }
}
</script>

<style scoped>
  .flex-title {
    display: flex;
    background-color: red;
    height: 70px;
    margin: 5px;
    padding: 3px;
    border-style: double;
  }
  .flex-title > div {
    background-color: red;
    color: white;
    height: 60px;
    widht: 120px;
    margin: 3px;
    padding: 3px;
    font-size: 18px;
    flex: 0 0 55px;
  }
  .float_right{
    display: flex;
    float:bottom;
  }

  table.customTable {
    width: 100%;
    background-color: #FFFFFF;
    border-collapse: collapse;
    border-width: 5px;
    border-color: #A9B1F8;
    border-style: groove;
    color: #000000;
    table-layout: fixed;
  }

  table.customTable td, table.customTable th {
    border-width: 5px;
    border-color: #A9B1F8;
    border-style: groove;
    padding: 5px;
  }

  table.customTable thead {
    background-color: #95a5a6;
  }
</style>
