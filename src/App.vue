<template>
  <div id="app">
    <toast/>
    <navbar :is-logged="!!user"/>
    <login v-if="!user" @logged="user = $event"/>
    <list v-else/>
    <p>test</p>
  </div>
</template>

<script>
import List from './components/List'
import Toast from './components/Toast'
import Login from './components/Login'
import Navbar from './components/Navbar'

export default {
  components: {
    List,
    Toast,
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
