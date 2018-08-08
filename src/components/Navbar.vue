<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Vue Firebase</a>
    <button class="navbar-toggler">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" v-if="isLogged">
      <div class="navbar-nav ml-auto">
        <button class="btn btn-outline-light mr-3">
          <i class="fas fa-plus"></i>
        </button>
        <button class="btn btn btn-outline-danger" @click="logout()"
        >
          <i class="fas fa-power-off"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    isLogged: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    logout () {
      this.$firebase.auth().signOut()
        .then(() => {
          window.uid = null
        })
    }
  }
}
</script>
