<template>
    <body>
      <h4 class ="Header"> User Registeration </h4>
        <div v-if="registerationSuccess" class="alert alert-success AlertBanner" role="alert">
             User registered successfully
        </div>
         <div v-if="registerationeFailure" class="alert alert-danger AlertBanner" role="alert">
             User registersation failed
        </div>
        <div v-if="keyCreationSuccess" class="alert alert-success AlertBanner" role="alert">
             Secure Key generated successfully
        </div>
         <div v-if="keyCreationFailure" class="alert alert-danger AlertBanner" role="alert">
             Secure Key generation failed
        </div>
        <div class="RegisterForm">
            <label class="Label">Enter your first name:</label><br>
            <input class="Input" type="text" v-model="firstName"  placeholder="First Name"   />
            <label class="InputError" v-if="firstNameError  ">Firstname should not be empty</label><br>
            <label class="Label">Enter your last name:</label><br>
            <input class="Input" type="text" v-model="lastName"  placeholder="Last Name"   />
            <label class="InputError" v-if="lastNameError  ">Lastname should not be empty</label><br>
            <label class="Label">Enter your email:</label><br>
            <input class="Input" type="text" v-model="email"  placeholder="E-mail"   />
            <label class="InputError" v-if="emailError ">Email should not be empty</label><br>
            <label class="Label">Enter your password:</label><br>
            <input class="Input" type="password" v-model="password" placeholder="Password"/>
            <label class="InputError" v-if="passwordError">Password should not be empty</label><br>
            <label class="Label">Retype your password:</label><br>
            <input class="Input" type="password" v-model="retypedPassword" placeholder="Retype password"/>
            <label class="InputError" v-if="passwordError">Retyped password should not be empty</label><br>
             <label class="InputError" v-if="passwordMismatchError">Actual and retyped password do not match</label><br>
            
        </div>
        <button class="Button" @click="register"> Register </button>
</body>
</template>
<script>

import { useCookies } from "vue3-cookies";
import axios from "axios"

export default {
  name: 'RegisterUser',
    setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  components: {
  },
  props: {
    msg: String
  }, data(){
    return {
      firstName:'',
      firstNameError:false,
      lastName:'',
      lastNameError:false,
      email:'',
      emailError:false,
      password:'',
      passwordError:false,
      retypedPassword :'',
      retypedPasswordError :false,
      passwordMismatchError:false,
      registerationSuccess:false,
      registerationeFailure:false,
      keyCreationSuccess:false,
      keyCreationFailure:false,
    }
  },
  mounted(){

  },
  methods:{
      register(){
        if(!this.firstName){
            this.firstNameError = true
        }
        if(!this.lastName){
              this.lastNameError = true
        }
        if(!this.email){
              this.emailError = true
        }
        if(!this.password){
              this.passwordError = true
        }
        if(!this.retypedPassword){
              this.retypedPasswordError = true
        }
        if(this.retypedPassword != this.password){
              this.passwordMismatchError = true
              alert('mismatch')
        }
        if(this.firstName && this.lastName && this.email && this.password && !this.passwordMismatchError){
            axios.post('http://localhost:8000/student', {                
                'firstName': this.firstName,
                'lastName': this.lastName,
                'email': this.email,
                'password': this.password
            })
            .then((response)=>{
                this.registerationSuccess= true
                setTimeout(() => {
                this.registerationSuccess = false
                }, 2000)
                console.log(response)
                this.generateKeys(response.data.id)
            })
            .catch( (error) =>{
                this.registerationeFailure = true;
                    setTimeout(() => {
                this.registerationeFailure = false
                }, 3000)
                console.log('error:'+error);                    
            });
        }
      },
    generateKeys(studentId){
         axios.post(`http://localhost:8000/student/${studentId}/key`)
            .then((response)=>{
                console.log(response)
                this.keyCreationSuccess= true
                setTimeout(() => {
                this.keyCreationSuccess = false
                }, 2000)
                 setTimeout(() => {
                this.$router.push({ path: '/login' }) 
                }, 2000)
                 
            })
            .catch( (error) =>{
                this.keyCreationFailure = true;
                    setTimeout(() => {
                this.keyCreationFailure = false
                }, 3000)
                console.log('error:'+error);                    
            });
    }
  }
}
</script>
<style scoped>
.RegisterForm{
    margin: 10px;
}
.Header{
  margin-top:20px;
}
label{
  font-weight:bold;
  float: left;
  margin-top: 20px;
}
.msg2{
  margin-left: 200px;
  margin-top: 20px;
}

.secret{
  width: 200px;
  height:100px  
}
.settings1{
    text-align: left;
    margin-left: 10px;
    margin-right: 10px;
}
.Input{
    width: 100%;
}

.StoreMsg{
  margin-left: 40%;
}
.InputError{
    text-align: left;
    width:100%;
    font-weight:bold;
    color: red;
}
.AlertBanner {
  margin-left: 70%
}
button{
    background-color: #42b983;
}
/* div.settings label       { text-align:right; } */
</style>