<template>
  <div class="locations">
    {{error}}
    <button v-on:click="logout">Logout</button>
    <p>Hello, {{userName}}</p>
    <form v-on:submit="submit">
      <input type="search" autocomplete="off" placeholder="Search places" ref="search">
    </form>
    <p>
      {{currentLocation.address}}
      <button v-if="currentLocation.address" v-on:click="favourite(currentLocation)">add</button>
    </p>
    <ul>
      <li v-for="location in userLocations">
        {{location.address}}
        <button v-on:click="unfavourite(location)">remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Locations',
  props: ['userName', 'userLocations', 'updateUser', 'updateLocations', 'io'],
  data() {
    return {
      error: null,
      currentLocation: {},
      ioClient: null,
    };
  },
  created() {
    const self = this;
    if (!self.userName) {
      self.$router.push({ name: 'User' });
    }
    return self.$http.get(`user/${self.userName}`)
      .then(({ body }) => {
        self.ioClient = self.io.client(`${self.io.baseUrl}/${self.userName}`);
        self.updateLocations(body.locations);
        self.ioClient.on('location:add', (location) => {
          self.updateLocations([
            ...self.userLocations,
            location,
          ]);
        });
        self.ioClient.on('location:remove', ({ address }) => {
          self.updateLocations(
            self.userLocations.filter(loc => loc.address !== address),
          );
        });
      })
      .catch(self.logout);
  },
  methods: {
    logout() {
      this.updateUser();
      this.$router.push({ name: 'User' });
      this.ioClient.disconnect();
    },
    submit() {
      const self = this;
      const address = self.$refs.search.value;
      return self.$http.get(`place/${address}`)
        .then(({ body }) => {
          self.currentLocation = body[0] || {};
          self.$refs.search.value = '';
        })
        .catch(({ message }) => {
          self.error = message;
        });
    },
    favourite({ address, lat, lng }) {
      const self = this;
      this.$http.post(`user/${self.userName}/location`, { address, lat, lng })
        .then(() => {
          self.currentLocation = {};
        })
        .catch(({ message }) => {
          self.error = message;
        });
    },
    unfavourite({ address }) {
      const self = this;
      this.$http.delete(`user/${self.userName}/location`, { body: { address } })
        .catch(({ message }) => {
          self.error = message;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
