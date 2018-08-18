<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-12 text-center" v-if="loading">
        <h2>Wait a sec...</h2>
      </div>
      <div class="col-2" v-for="(file, index) in files" :key="index">
        <img :src="file.url" class="img-thumbnail" v-if="fileType(file) === 'img'">
        <video style="width: 100%" class="img-thumbnail" controls v-else>
          <source :src="file.url">
        </video>
        <button class="btn btn-outline-danger mt-2 btn-block">
          <i class="fas fa-trash"></i> Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      files: [],
      loading: false
    }
  },
  mounted () {
    this.getFiles()
  },
  methods: {
    getFiles () {
      this.loading = true
      const database = this.$firebase.database().ref(`files`)
      database.on('value', snapshot => {
        let data = snapshot.val()
        this.files = []
        for (let index in data) {
          let payload = data[index]

          // Don't show if was deleted
          if (!payload.deleted) {
            payload.id = index
            this.files.push(payload)
          }
        }

        this.files.reverse()

        setTimeout(() => {
          this.loading = false
        }, 500)
      })
    },
    async deleteFile (file) {
      // We will not really delete, but update, inserting a property called 'deleted'
      try {
        if (confirm('Do you really want to delete?')) {
          const dbRef = this.$firebase.database().ref(`files/${file.id}`)
          await dbRef.set({
            name: file.name,
            url: file.url,
            // Logic deletion
            deleted: true
          })

          alert('Successfully deleted')
        }
      } catch (err) {
        alert(err.message)
      }
    },
    fileType (file) {
      if (
        file.name.includes('jpg') ||
        file.name.includes('jpeg') ||
        file.name.includes('png')
      ) {
        return 'img'
      } else {
        return 'video'
      }
    }
  }
}
</script>

<style>

</style>
