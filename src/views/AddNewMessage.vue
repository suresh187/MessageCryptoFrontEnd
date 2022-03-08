<template>
  <div class="home">
    <StoreMessage msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import StoreMessage from '@/components/StoreMessage.vue'

export default {
  name: 'Home',
  components: {
    StoreMessage
  }
}
</script>
