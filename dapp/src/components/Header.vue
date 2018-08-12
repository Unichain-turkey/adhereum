<template>
  <div>

    <nav class="navbar sticky-top navbar-light bg-light">
      <router-link class="navbar-brand" to="/">
        Adhereum
      </router-link>
      <router-link class="navbar-brand" to="/admin">
            Admin
          </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>

</style>
