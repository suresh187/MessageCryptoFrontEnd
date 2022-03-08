<template>
  <div class="home">
    <RegisterUser/>
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterUser from '@/components/RegisterUser.vue'

export default {
  name: 'RegisterUserView',
  components: {
    RegisterUser
  }
}
</script>
