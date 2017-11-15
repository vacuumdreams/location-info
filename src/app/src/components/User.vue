<template>
  <div class="user-name">
    <form v-on:submit="submit">
      <input type="text" placeholder="Your name" ref="user">
    </form>
  </div>
</template>

<script>
const onSuccess = self => ({ body }) => {
  self.updateUser(body.name);
  self.$router.push({ name: 'UserLocations' });
};

export default {
  name: 'User',
  props: ['userName', 'userLocations', 'updateUser'],
  data() {
    return {
      firstTime: false,
    };
  },
  created() {
    if (this.userName) {
      this.$router.push({ name: 'UserLocations' });
    }
  },
  methods: {
    submit() {
      const self = this;
      const name = this.$refs.user.value;
      return self.$http.get(`user/${name}`)
        .then(onSuccess(self))
        .catch(() => {
          self.firstTime = true;
          self.$http.post('user', { name })
            .then(onSuccess(self));
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  form {
    max-width: 800px;
    margin: auto;
    padding: 0.5em 1em;
  }
</style>
