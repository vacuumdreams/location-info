<template>
  <div class="locations">
    <p v-if="error" class="error">
      {{error}}
      <button v-on:click="dismissError">
        <svg class="icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close"></use>
        </svg>
      </button>
    </p>
    <header>
      <div class="inner">
        <button v-on:click="logout">
          <svg class="icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#logout"></use>
          </svg>
        </button>
        <p>Hello, {{userName}}</p>
      </div>
    </header>
    <p>Your saved locations:</p>
    <div class="favourites">
      <ul>
        <li v-for="location in userLocations">
          {{location.address}}
          <button v-on:click="unfavourite(location)">
            <svg class="icon">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close"></use>
            </svg>
          </button>
        </li>
      </ul>
    </div>
    <div class="search">
      <form v-on:submit="search">
        <input type="search" autocomplete="off" placeholder="Search places" ref="search">
      </form>
      <p>
        {{currentLocation.address}}
        <button v-if="currentLocation.address" v-on:click="favourite(currentLocation)">
          <svg class="icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#favourite-full"></use>
          </svg>
        </button>
      </p>
    </div>
    <gmap-map
      ref="locationsMap"
      v-if="map.center"
      :center="map.center"
      :zoom="13"
    >
      <gmap-marker
        :key="index"
        v-for="(marker, index) in map.markers"
        :position="marker.position"
        :clickable="true"
        :draggable="false"
        @click="map.center=marker.position"
      />
    </gmap-map>
  </div>
</template>

<script>
// const getMapBounds = (locations) => {
//   // eslint-disable-next-line
//   const bound = new google.maps.LatLngBounds();
//   locations.forEach(({ lat, lng }) => {
//     // eslint-disable-next-line
//     bound.extend(new google.maps.LatLng(lat, lng));
//   });
//   return bound;
// };

export default {
  name: 'Locations',
  props: ['userName', 'userLocations', 'updateUser', 'updateLocations', 'io'],
  data() {
    return {
      error: null,
      currentLocation: {},
      ioClient: null,
      map: {
        center: null,
        markers: [],
      },
    };
  },
  created() {
    const self = this;

    if (!self.userName) {
      self.$router.push({ name: 'User' });
    }
    return self.$http.get(`user/${self.userName}`)
      .then(({ body }) => {
        self.ioClient = self.io.client(`${self.io.baseUrl}/${body.name}`);
        self.setMapCenter(body.locations[body.locations.length - 1]);
        self.updatePlaces(body.locations.reverse());
        self.subscribe(self.ioClient);
      })
      .catch(self.logout);
  },
  methods: {
    logout() {
      this.updateUser();
      this.$router.push({ name: 'User' });
      this.ioClient.disconnect();
    },
    dismissError() {
      this.error = null;
    },
    search() {
      const self = this;
      const address = self.$refs.search.value;
      return self.$http.get(`place/${address}`)
        .then(({ body }) => {
          self.currentLocation = body[0] || {};
          self.$refs.search.value = '';
          self.setMapCenter(body[0]);
        })
        .catch(({ message }) => {
          self.error = message;
        });
    },
    subscribe(client) {
      const self = this;
      client.on('location:add', (location) => {
        self.updatePlaces([
          location,
          ...self.userLocations,
        ]);
      });
      client.on('location:remove', ({ address }) => {
        self.updatePlaces(
          self.userLocations.filter(loc => loc.address !== address),
        );
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
    setMapCenter(location) {
      this.map.center = location ? {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng),
      } : null;
    },
    updateMap(locations) {
      this.map.markers = locations.map(({ lat, lng }) => ({
        position: {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        },
      }));
    },
    updatePlaces(locations) {
      this.updateLocations(locations);
      this.updateMap(locations);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vue-map-container {
    padding-bottom: 61.8%;
  }

  @media screen and (min-width: 800px) {
    .vue-map-container {
      padding-bottom: 0%;
      height: 400px;
    }
  }

  .error {
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    padding: 1em;
    width: 100%;
    background-color: #FF4B3B;
    color: #f2f2f2;
  }

  header {
    background-color: #efefef;
    margin-bottom: 2em;
  }

  header p {
    margin: 0;
  }

  header .inner {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    padding: 0.5em 1em;
    max-width: 800px;
    margin: auto;
  }

  .favourites {
    max-width: 800px;
    margin: auto; 
    list-style-type: none;
    padding: 0 1em;
    margin-bottom: 3em;
  }

  .favourites ul {
    border: 1px solid #dedede;
    border-bottom: none;
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .favourites li {
    border-bottom: 1px solid #dedede;
    height: 1.5rem;
  }

  .favourites button,
  .search p button {
    float: right;
  }

  .search {
    max-width: 800px;
    margin: auto;
    padding: 0.5em 1em;
  }

  .search p {
    margin: 0;
    height: 1.5rem;
    border: 1px solid #dedede;
    border-top: none;
  }
</style>
