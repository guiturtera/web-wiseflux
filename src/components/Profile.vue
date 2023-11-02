<script>
export default {
  name: 'Profile',
  data() {
    return {
      userField: null
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  watch: {
    currentUser: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.userField = newValue.user;
        } else {
          this.userField = null;
          this.$router.push('/login');
        }
      }
    }
  }
};
</script>

<template>
  <div v-if="currentUser" class="container">
    
    {{userField}}

  </div>
</template>
