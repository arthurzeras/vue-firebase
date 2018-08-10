<template>
  <div id="login">
    <form class="form-login" @submit.prevent="submit()">
      <h1 class="h3 mb-3 font-weight-normal">Welcome!</h1>
      <input
        required
        autofocus
        type="email"
        v-model="email"
        id="inputEmail"
        placeholder="E-mail"
        class="form-control form-control-lg"
      >
      <input
        required
        type="password"
        v-model="password"
        id="inputPassword"
        placeholder="Password"
        class="form-control form-control-lg"
      >
      <button type="submit" class="btn btn-lg btn-primary btn-block">
        Login
      </button>

      <div class="text-center mt-5 text-danger" v-if="error.show">
        {{ error.message }}
      </div>

      <div class="progress mt-5" v-if="loading">
        <div
          role="progressbar"
          style="width: 100%"
          class="progress-bar progress-bar-striped progress-bar-animated"
        ></div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      loading: false,
      error: {
        show: false,
        message: ''
      }
    }
  },
  methods: {
    submit () {
      this.show = false
      this.loading = true
      this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          window.uid = data.user.uid
          this.$emit('logged', data.user)
        })
        .catch(err => {
          window.uid = null
          this.$emit('logged', null)
          this.error.show = true
          this.error.message = err.message
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .form-login {
    background-color: #f5f5f5;
    padding: 30px 15px;
    width: 30%;
    #inputEmail {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      margin-bottom: -1px;
    }
    #inputPassword {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      margin-bottom: 15px;
    }
  }
}

@media (max-width: 575.98px) {
  #login .form-login {
    width: 100%;
    height: 100%;
  }
}
</style>
