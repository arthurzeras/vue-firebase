<template>
  <div id="app">
    <navbar :is-logged="!!user"/>
    <login v-if="!user" @logged="user = $event"/>
  </div>
</template>

<script>
import Login from './components/Login'
import Navbar from './components/Navbar'

export default {
  components: {
    Login,
    Navbar
  },
  data () {
    return {
      user: null
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.$firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = user
        } else {
          this.user = null
        }
      })
    }
  }
}
</script>
