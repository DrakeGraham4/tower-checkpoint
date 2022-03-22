<template>
    <form class="row d-flex" @submit.prevent="createEvent">
    <div class="col-12 mb-3 form-group">
      <label for="Event Name" class="form-label">Event Name</label>
      <input
        v-model="towerEvent.name"
        required
        type="text"
        name=""
        id=""
        class="form-control"
        placeholder="Event Name..."
        aria-describedby="helpId"
      />
    </div>
    <div class="col-12 mb-3">
      <label for="Event Description" class="form-label">Description</label>
      <input
        v-model="towerEvent.description"
        required
        type="textarea"
        name=""
        id=""
        class="form-control"
        placeholder="Description..."
        aria-describedby="helpId"
      />
    </div>
    <div class="col-4 offset-10">
      <button class="btn btn-info">Create</button>
    </div>
  </form>
        


    
</template>


<script>
export default {
    setup(){
        return {}
    }
}
</script>


<style lang="scss" scoped>

</style>