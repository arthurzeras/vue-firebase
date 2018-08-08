<template>
  <div>
    <button class="btn btn-outline-light mr-3"
      @click="$refs.inputFile.click()"
    >
      <i class="fas fa-plus"></i>
    </button>
    <input
      hidden
      type="file"
      ref="inputFile"
      multiple="false"
      class="input-file"
      @change="addFile($event)"
    >
  </div>
</template>

<script>
export default {
  methods: {
    fileExtension (file) {
      let reversed = file.name.split('').reverse().join('')
      reversed = reversed.split('.')[0]
      return reversed.split('').reverse().join('')
    },
    addFile (ev) {
      const ext = this.fileExtension(ev.target.files[0])
      const type = ev.target.files[0].type
      const file = new File([ev.target.files[0]], `${new Date().getTime()}.${ext}`, { type })
      this.$emit('file', file)

      this.$root.$emit('toast::show', {
        message: `Wait, Sending ${file.name}...`
      })

      let storage = this.$firebase.storage().ref()
      let fileRef = storage.child(`files/${file.name}`)

      fileRef.put(file)
        .then(snapshot => {
          snapshot.ref.getDownloadURL()
            .then(url => {
              let database = this.$firebase.database().ref(`files/`)
              database.push({ url, name: file.name })
              this.$emit('fileOk', file)
              this.$root.$emit('toast::show', {
                type: 'success',
                message: 'File uploaded with success!'
              })
              setTimeout(() => {
                this.$root.$emit('toast::hide')
              }, 2000)
            })
            .catch(err => {
              alert(err.message)
            })
        })
        .catch(err => {
          alert(err.message)
        })

      this.$refs.inputFile.value = null
    }
  }
}
</script>

<style>

</style>
