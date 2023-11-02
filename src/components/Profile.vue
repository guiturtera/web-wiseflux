<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>

<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.user.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.token.substring(0, 20)}} ... {{currentUser.token.substr(currentUser.token.length - 20)}}
    </p>
    <p>
      <strong>PhoneNumber:</strong>
      {{currentUser.user.phoneNumber}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.user.email}}
    </p>
    <p>
      <strong>Role:</strong>
      {{currentUser.user.role}}
    </p>
  </div>
</template>
