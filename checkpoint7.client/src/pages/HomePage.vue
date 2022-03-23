<template>
<div class="row container-fluid">
  <div class="">
          <button
            data-bs-toggle="modal"
            data-bs-target="#create-event"
            class="btn btn-info "
          >
            Create Event
          </button>
          <button
            @click="filterEvents('sport')"
            class="btn btn-info "
          >
            Sport
          </button>
        </div>
        <Modal id="create-event">
            <template #title>Create Event</template>
            <template #body><CreateEventForm /></template>
          </Modal>
  
  <div v-for="t in towerEvents" :key="t.id" class="col-md-4 p-4 mb-2">
        <TowerEvent :towerEvent="t"/>
</div>
</div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import {towerEventsService} from '../services/TowerEventsService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup(){
    let editable = ref(null)
    onMounted( async() => {
      try {
        await towerEventsService.getAll()
        logger.log('event')
      } catch (error) {
        Pop.toast(error.message, 'error')
        logger.log(error)
      }
    })
    return {
      towerEvents: computed(()=> AppState.towerEvents)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
