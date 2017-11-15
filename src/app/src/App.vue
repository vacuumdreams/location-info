<template>
  <div id="app">
    <img src="http://ready.euratechnologies.com/wp-content/uploads/2016/03/pingflow-logo-300x175.png">
    <router-view
      :userName="name"
      :userLocations="locations"
      :updateUser="updateUser"
      :updateLocations="updateLocations"
      :io="io"
    />
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      name: localStorage.getItem('user'),
      locations: [],
      io: this.$parent.$options.io,
    };
  },
  methods: {
    updateUser(name = null) {
      if (name) {
        localStorage.setItem('user', name);
      } else {
        localStorage.clear();
      }
      this.name = name;
    },
    updateLocations(locations) {
      this.locations = locations;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-size: 16px;
}

input {
  border: 1px solid #dedede;
  border-radius: 0px;
  padding: 0.5em 1em;
  width: 100%;
  font-size: 1em;
}

button {
  background-color: #dedede;
  border: none;
  border-radius: 0px;
  padding: 0.5em 1em;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #d1d1d1;
}

svg.icon {
  width: 1em;
  height: 1em;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
