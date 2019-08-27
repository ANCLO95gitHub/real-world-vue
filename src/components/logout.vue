<template>
<div>
  <label>La session a fermé votre loggin</label>

</div>
</template>

<script>
export default {
  name: "logout",
  mounted(){
    document.cookie = 'ClientID=' + '';
    document.cookie = 'ClientID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
  }

}
</script>

<style scoped>

</style>
