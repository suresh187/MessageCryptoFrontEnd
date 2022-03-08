<template>
  <div id="nav" class="Nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/addNewMessage">Add New Message</router-link> 
    <button class="Login" @click="login" type="button">{{logInLabel}}</button>
  </div>
      <div class="Header">
        <h3> Data Locker</h3>
        <div class="Banner">
            <h4>Your data is secure with us!!!</h4>
        </div>
    </div>
  <router-view/>

</template>



<script>
import { useCookies } from "vue3-cookies";

export default {
  name: 'Header',
  data(){
    return {
        logInLabel:'Log-in'
    }
  },
    setup() {
        const { cookies } = useCookies();
        return { cookies };
     },
     created(){
        this.emitter.on('LogInstatus', (msg)=>{
            console.log("Loginstatus:"+msg);
            this.logInLabel = 'Your Profile'
        });
        this.emitter.on('LogOutstatus', (msg)=>{
             console.log("Loginstatus:"+msg);
             this.logInLabel = 'Log-in'
         });
     },
    methods:{
        login(){
            this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style scoped>
.Header{
   background-color: #42b983;
    padding:8px
}
.Banner{
    display:inline-flex
}
.Nav{
    margin-left: 140px;
}
</style>