<template>
  <div id="app">
    <Locked v-if="locked"/>
    <AppScaffold v-if="!locked && !addGuest"  :key="key"/>
  </div>
</template>

<script>
import AppScaffold from './components/AppScaffold.vue';
import Locked from './components/Locked.vue';
import { EventBus } from './main.js';

export default {
  name: 'app',
  components: {
    AppScaffold,
    Locked
  },
  data() {
    return {
      key: 1,
      locked: true,
      addGuest: false,
    }
  },
  created (){
    EventBus.$on('addedComplaint', num => {
      this.key += num;
      this.addGuest = false;
    });
    EventBus.$on('toggleLock', val => {
      this.locked = val;
    });
    EventBus.$on('refreshList', num => {
      this.key += num;
    });
    document.title = "Portal - CFA"
  }
}
</script>

<style>

:root{
  --cfa-red: #dd0033;
  --cfa-gray: #5b6770;
  --cfa-darkRed: #af272f;
  --cfa-darkBlue: #004f71;
  --cfa-blue: #3eb1c8;
  --cfa-yellow: #ffb549;
  --cfa-lightYellow: #f5e1a4;
  --cfa-darkGreen: #00635b;
  --cfa-green: #249e6b;
  --cfa-purple: #5d3754;
  --cfa-mauve: #994878;
  --cfa-peach: #fa9370;
  --cfa-pink: #f8c1b8;
  --cfa-tan: #f5e3cc;

  --light: #f2f2f2;
  --dark: #1a1a1a;
}

*{
  margin: 0px;
  padding: 0px;
}

body{
  background-color: var(--light);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
}

#app-body{
  padding: 150px 50px 100px 50px; 
}

button{
  -webkit-appearance: none;
  border: none;
}

a{
  all: unset;
}
a:visited{
  color: unset;
}
</style>
