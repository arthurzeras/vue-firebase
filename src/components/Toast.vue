<template>
  <div class="alert alert-dismissible fade show alert-toast"
    v-if="toast.visible"
    :class="`alert-${toast.type}`"
  >
    {{ toast.message }}
    <button type="button" class="close">
      <span aria-hidden="true" @click="toast.visible = false">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      toast: {
        visible: false,
        type: 'primary',
        message: 'dasdasd'
      }
    }
  },
  created () {
    this.$root.$on('toast::show', ev => {
      this.toast.visible = true
      this.toast.message = ev.message
      this.toast.type = ev.type || this.toast.type
    })
    this.$root.$on('toast::hide', () => {
      this.toast = {
        visible: false,
        type: 'primary',
        message: 'dasdasd'
      }
    })
  }
}
</script>

<style>
.alert-toast {
  position: fixed !important;
  bottom: 10px;
  left: 10px;
  max-width: 80vw;
}
</style>
