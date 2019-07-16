<template>
  <div>
    <h4>Section administratif</h4>
    <h5>Editer Les Poids des pieces de Métaux</h5>
    <WeightEditAdmin></WeightEditAdmin>

  </div>
</template>

<script>
import WeightEditAdmin from '@/components/WeightEditAdmin.vue';
import WeightEditAdmin2 from '@/components/WeightEditAdmin2.vue';
export default {
  name: "TheAdmin",
    components: { WeightEditAdmin }
}
</script>

<style scoped>

</style>
