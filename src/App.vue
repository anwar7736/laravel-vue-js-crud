<template>
  <div>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      
    <li>
      <router-link to="/about/1">About</router-link>
    </li>
    <li>
      <router-link to="/contact">Contact</router-link>
    </li>
    </ul>
    <router-view></router-view>
  </div>
  
</template>
<script>
  export default {
    
  }
</script>
<style scoped>

</style>