<template>

    <div class="card selectable" style="width: 18rem;">
  <img :src="towerEvent.coverImg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">{{towerEvent.name}}</h5>
    <p class="card-text text-uppercase">{{towerEvent.type}}</p>
    <p class="card-text">{{new Date(towerEvent.startDate).toLocaleString()}}</p>
    <p class="card-text">{{towerEvent.location}}</p>
    <div v-if="towerEvent.capacity" class="text-end"> <p class="card-text">{{towerEvent.capacity}} spots left</p> </div>
    <!-- NOTE add more v-ifs, depending on whether the event is canceled, or if there is no capacity -->
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

</template>


<script>
export default {
    props: {
        towerEvent: {
            type: Object,
            required: true,
        },
    },
    setup(){
        return {}
    }
}
</script>


<style lang="scss" scoped>

</style>