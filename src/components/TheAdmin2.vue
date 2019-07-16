<template>
  <div>


    <h4>The Admin2</h4>
    <LeHeader></LeHeader>
    <WeightEditAdmin2></WeightEditAdmin2>



  </div>
</template>

<script>
import WeightEditAdmin from '@/components/WeightEditAdmin.vue';
import WeightEditAdmin2 from '@/components/WeightEditAdmin2.vue';
export default {
  name: "TheAdmin",
    components: {  WeightEditAdmin2 }
}
</script>

<style scoped>

</style>
