<template>
  <div>
    <div id="paypal-button-container"></div>
    <div v-if="success" class="alert alert-success">
      <strong>Success!</strong> Payment successfuly done
    </div>
    <div v-if="error" class="alert alert-danger">
      <strong>Ooops!</strong>  something went wrong
    </div>
  </div>
</template>
