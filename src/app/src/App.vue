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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
