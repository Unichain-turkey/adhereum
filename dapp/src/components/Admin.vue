<template>
  <div class="container">
    <pending></pending>
  </div>


</template>

<script>

  import Pending from '@/components/Pending.vue'

  export default {
    name: 'Admin',
    components: {
      'pending': Pending
    }
  }

</script>

<style scoped>

</style>
