<template>
<div>
    details DEBUT  WeightEditAdmin2.vue<br>
    <br><br>
    <table class="customTable">
      <thead>
        <tr>
            <th width="85px">ID</th>
            <th width="107px">NomMB</th>
            <th width="107px">Diminutif MB</th>
            <th width="107px">Nom Forme</th>
            <th width="107px">Diminutif Forme</th>
            <th width="107px">ThickDiam</th>
            <th width="107px">OptionX</th>
            <th width="107px">OptionY</th>
            <th width="107px">OptionZ</th>
            <th width="107px">Grade</th>
            <th width="107px">PoidsEnLivre</th>
            <th width="107px">En Lecture</th>
            <th width="50px">M.A.J.</th>
        </tr>
      </thead>
    </table>
    <table class="customTable">
      <tbody>
        <tr>
          <th width="50px">M.A.J.</th>

        </tr>
        </tbody>
    </table>
    <br>
    <br>
    details FINS
    <button @click="getpoidsmetaux">getpoidsmetaux</button>
    <button @click="enableAddMode" v-if="!addingToDo && !selectedToDo">Add</button>
<!--
  <transition name="fade">
    <ul class="todoes" v-if="todoes && todoes.length">
      <li v-for="todo in todoes" :key="todo.id"
          class="todo-container"
          :class="{selected: todo === selectedToDo}">
        <div class="todo-element">
          <div class="badge" >{{todo.id}}</div>
          <div class="todo-text" @click="onSelect(todo)">
            <div class="name">{{todo.name}}</div>
            <div class="saying">{{todo.saying}}</div>
          </div>
        </div>
        <button class="delete-button" @click="deleteToDo(todo)">Delete</button>
      </li>
    </ul>
  </transition>

  <transition name="fade">
    <ToDoDetail
      v-if="selectedToDo || addingToDo"
      :todo="selectedToDo"
      @unselect="unselect"
      @todoChanged="todoChanged"></ToDoDetail>
  </transition>
  -->
</div>
</template>

<script lang="ts">

//import Vue from 'vue';
import axios from 'axios';
//import { Todo } from './todo';
import {apiServeurmssql} from '../../src/views/config.js';
export default {
  name: 'WeightEditAdmin2',
  data () {
    return { msg: 'Welcome to Your WeightEditAdmin.vue', PoidsMetaux: [], retourPoidsMetaux: [], EnLecture:false}
  },
  methods: {
    getpoidsmetaux () {
      // alert('asdf');
      // eslint-disable-next-line no-undef
      axios.get(`${apiServeurmssql}getInventaire/`,
        {
          headers: {'x-access-token': localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}
        }
      ).then(res => {
        // eslint-disable-next-line eqeqeq
        if (res.data.status === true) {
          alert( JSON.stringify(res.data.PoidsMetaux.recordset));
          console.log(' res.data.PoidsMetaux=' + res.data.PoidsMetaux);
          console.log(' JSON.stringifyres.data.PoidsMetaux=' + JSON.stringify( res.data.PoidsMetaux));
          //console.log(' JSON.stringify(res.data.PoidsMetaux.recordset)=' + JSON.parse(res.data.PoidsMetaux.recordset));
          //console.log(' stringify ET JSON.parse(res.data.PoidsMetaux.recordset)=' + JSON.parse(JSON.stringify(res.data.PoidsMetaux.recordset)));
          this.PoidsMetaux = res.data.PoidsMetaux;
          //this.PoidsMetaux = JSON.stringify(JSON.parse(res.data.PoidsMetaux.recordset));
          //this.PoidsMetaux = JSON.parse(res.data.PoidsMetaux.recordset);
        }
      })
    },
  }
}
  /*
  export default class ToDoList extends Vue{
    //addingTodo = false;
    //selectedToDo: ToDo | null = null;
    //todoes: ToDo[] = <ToDo[]>[];
    enableAddMode() {
      this.addingToDo = true;
      this.selectedToDo = null;
    }
    getToDoes() {
      this.todoes = [];
      this.selectedToDo = null;
      return todoService.getToDoes().then(response => (this.todoes = response.data));
    }
    onSelect(todo: ToDo) {
      this.selectedToDo = todo;
    }
    unselect() {
      this.addingToDo = false;
      this.selectedToDo = null;
    }
  }
  */
</script>

<style scoped>
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
  background-color: #ffffff;
  border-collapse: collapse;
  border-width: 5px;
  border-color: #a9b1f8;
  border-style: groove;
  color: #000000;
}

table.customTable td, table.customTable th {
  border-width: 5px;
  border-color: #a9b1f8;
  border-style: groove;
  padding: 5px;
}
table.customTable thead {
  background-color: #7ea8f8;
}
</style>
