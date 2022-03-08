<template>
    <div v-if="loginFailure" class="alert alert-danger AlertBanner" role="alert">
        Login failed
    </div>
    <div v-if="this.$store.state.loggedIn">
        <div>
            <table>
                <tr>
                    <th>Label</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>First Name</td>
                    <td>{{this.firstName}}</td>
                </tr>
                <tr>
                    <td>Last Name</td>
                    <td>{{this.lastName}}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{{this.email}}</td>
                </tr>
            </table>
        </div>
         <button  class="SignOut Button" @click="logout"> Sign-out </button>
    </div >
    <div v-else>
        <div class="LoginForm">
            <label class="Label">Enter your email:</label><br>
            <input class="UserName" type="text" v-model="email"  placeholder="E-mail"   />
            <label class="InputError" v-if="emailError  ">Username should not be empty</label><br>
            <label class="Label">Enter your password:</label><br>
            <input class="password" type="password" v-model="password" placeholder="Password"/>
            <label class="InputError" v-if="passwordError">Password should not be empty</label><br>
        </div>
        <button class="Button" @click="login"> Sign-in </button>
    </div>


</template>

<script>
import axios from "axios"
import { useCookies } from "vue3-cookies";

export default {
  name: 'Login',
    setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  components: {
    
  },
  props: {
  }, data(){
    return {
        email: '',
        password:'',
        firstName : '',
        lastName:'',
        emailError:false,
        passwordError:false,
        loginFailure:false,
        loginSuccess:false,
        allMessages:[],
    }
  },

  mounted(){
     this.loginSuccess = this.$store.state.loggedIn
     if(this.loginSuccess){
         const info = this.$store.state.userInfo
         console.log(info)
         const infoarray = info.split('*')
         console.log(infoarray)
         this.firstName = infoarray[0]
         this.lastName = infoarray[1]
         this.email = infoarray[2]
     }
  },

  methods:{
    login(){
        if(!this.email){
        this.emailError= true
        }
        if(!this.password){
            this.passwordError= true
        }
        if(!this.emailError && !this.passwordError){
            axios.post('http://localhost:8000/login', {
                        'email':this.email,
                        'password':this.password
                        })
                    .then((response)=>{
                        this.cookies.set("studentId", response.data.id);
                        this.loginSuccess= true
                        this.emitter.emit('LogInstatus', 'finished')
                        this.$store.commit('confirmLogin')
                        this.$store.commit('setUserInfo', response.data.firstName+'*'+response.data.lastName+'*'+response.data.email)
                        this.$router.push({ path: '/' })                       
                    })
                    .catch(error=>{
                        this.loginFailure = true;
                        console.log(error);
                    });   
            }  
               
    },
    logout(){
        this.cookies.remove("studentId");
        this.emitter.emit('LogOutstatus', 'finished')
        this.$store.commit('confirmLogout')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
header{
   background-color: #42b983;
    padding:8px
}
.Label{
  width: 100%;
  text-align: left;
  font-weight:bold;
}
.UserName{
    width:100%
}
.password{
    width:100%
}
.LoginForm{
    margin: 10px;
}
.InputError{
  color: red;
  text-align: left;
  width:100%;
  font-weight:bold;
}
table{
    margin:50px;
    margin-left: auto;
    margin-right: auto;
}
th{
     text-align:left;
}
tr{
    width: 150px;
    margin:50px;
     text-align:left;
}
td{
    width: 150px;
    margin:50px;
    text-align:left;
}
.SignOut{
    float: right;
    margin:30px
}
.Button{
      background-color: #42b983;
}
</style>
