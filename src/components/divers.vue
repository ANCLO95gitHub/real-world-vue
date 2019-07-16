<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a>
        </li>
      <li>
        <a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"                    target="_blank"                    rel="noopener"            >eslint</a>
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a>
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a>
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a>
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener" >awesome-vue</a>
      </li>
    </ul>

    TESTING TABLEAU
    <ul>
      <li>
        <table class="tg">
          <tr>
            <th class="tg-baqh">dfd</th>
            <th class="tg-0lax">ht</th>
          </tr>
          <tr>
            <td class="tg-0lax">rt</td>
            <td class="tg-0lax">jy</td>
          </tr>
        </table>

      </li>
    </ul>
    <ul>
      <li>
        <table class="GeneratedTable">
          <thead>
            <tr>
              <th>Header</th>
              <th>Header</th>
              <th>Header</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
            <tr>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
            <tr>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
          </tbody>
        </table>
      </li>
    </ul>
    <div id="checkboxes">
      <section>
        <h3>Choisir la matière et sa forme</h3>
        <input type="radio" id="one" value="ACTU" v-model="picked" @change="changeValue"/><label for="one">ACTU, Acier Tube</label> <br />
        <input type="radio" id="two" value="ACAN" v-model="picked" @change="changeValue" /><label for="two">ACAN, Acier Angle</label> <br />
        <input type="radio" id="three" value="ALAN" v-model="picked" @change="changeValue"/><label for="three">ALAN, Aluminium Angle</label>
        <br />

        <span>value: {{picked}}</span>
      </section>
    </div>
    <ul>
      <li>
        <section>
        <table class="customTable">
          <thead>
          <tr>
            <th>Acier</th>
            <th>Aluminium</th>
            <th>Stainless Steel</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><input type="radio" id="one" value="ACAN" v-model="picked" @change="changeValue"/><label for="one">Angle</label></td>
            <td><input type="radio" id="two" value="ALAN" v-model="picked" @change="changeValue"/><label for="two">ANGLE</label></td>
            <td><input type="radio" id="three" value="SSAN" v-model="picked" @change="changeValue"/><label for="three">Angle</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="four" value="ACBC" v-model="picked" @change="changeValue"/><label for="four">BARRE CARRÉE</label></td>
            <td><input type="radio" id="five" value="ALBC" v-model="picked" @change="changeValue"/><label for="five">BARRE CARRÉE</label></td>
            <td><input type="radio" id="six" value="SSBC" v-model="picked" @change="changeValue"/><label for="six">BARRE CARRÉE</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="seven" value="ACBR" v-model="picked" @change="changeValue"/><label for="seven">BARRE RONDE</label></td>
            <td><input type="radio" id="eight" value="ALBR" v-model="picked" @change="changeValue"/><label for="eight">BARRE RONDE</label></td>
            <td><input type="radio" id="nine" value="SSBR" v-model="picked" @change="changeValue"/><label for="nine">BARRE RONDE</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="ten" value="ACPL" v-model="picked" @change="changeValue"/><label for="ten">Plat</label></td>
            <td><input type="radio" id="eleven" value="ALPL" v-model="picked" @change="changeValue"/><label for="eleven">Plat</label></td>
            <td><input type="radio" id="twelve" value="SSPL" v-model="picked" @change="changeValue"/><label for="twelve">Plat</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="thirteen" value="ACPU" v-model="picked" @change="changeValue"/><label for="thirteen">POUTRE EN U</label></td>
            <td><input type="radio" id="fourteen" value="ALPU" v-model="picked" @change="changeValue"/><label for="fourteen">POUTRE EN U</label></td>
            <td><input type="radio" id="fifteen" value="SSPU" v-model="picked" @change="changeValue"/><label for="fifteen">_</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="sixteen" value="ACTU" v-model="picked" @change="changeValue"/><label for="sixteen">Tube</label></td>
            <td><input type="radio" id="seventeen" value="ALTU" v-model="picked" @change="changeValue"/><label for="seventeen">TUBE</label></td>
            <td><input type="radio" id="eighteen" value="SSTU" v-model="picked" @change="changeValue"/><label for="eighteen">TUBE</label></td>
          </tr>
          <tr>
            <td><input type="radio" id="nineteen" value="ACTUY" v-model="picked" @change="changeValue"/><label for="nineteen">TUYAU</label></td>
            <td><input type="radio" id="twenty" value="ALTUY" v-model="picked" @change="changeValue"/><label for="twenty">TUYAU</label></td>
            <td><input type="radio" id="twentyone" value="SSTUY" v-model="picked" @change="changeValue"/><label for="twentyone">TUYAU</label></td>
          </tr>
          </tbody>
        </table>
        </section>
      </li>
    </ul>
    <ul>
      <li>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "divers",
  props: {
    msg: String
  },  data () {
    return { picked: 'z'
    }
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
.tg {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-baqh{text-align:center;vertical-align:top}
.tg .tg-0lax{text-align:left;vertical-align:top}

table.GeneratedTable {
  width: 100%;
  background-color: #ffffff;
  border-collapse: collapse;
  border-width: 2px;
  border-color: #ffcc00;
  border-style: solid;
  color: #000000;
}

table.GeneratedTable td, table.GeneratedTable th {
  border-width: 2px;
  border-color: #ffcc00;
  border-style: solid;
  padding: 3px;
}

table.GeneratedTable thead {
  background-color: #ffcc00;
}
table.customTable {
  width: 100%;
  background-color: #FFFFFF;
  border-collapse: collapse;
  border-width: 5px;
  border-color: #A9B1F8;
  border-style: groove;
  color: #000000;
}

table.customTable td, table.customTable th {
  border-width: 5px;
  border-color: #A9B1F8;
  border-style: groove;
  padding: 5px;
}

table.customTable thead {
  background-color: #7EA8F8;
}
</style>
