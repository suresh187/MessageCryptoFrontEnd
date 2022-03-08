<template>
    <body>
    <div v-if="storageSuccess" class="alert alert-success AlertBanner" role="alert">
        Message stored successfully
    </div>
    <div v-if="storageFailure" class="alert alert-danger AlertBanner" role="alert">
        Message storage failed
    </div>
    <div >
        <header>
            <h3>Add a new message</h3>
        </header>
        <form class="settings1" >
            <div class="msg">
            <label>Enter your message:</label><br>
            <textarea class="secret" type="text" v-model="message"  placeholder="Message"   />
            <label class="InputError" v-if="messageError">Message should not be empty</label><br>
            </div>
            <div class="msg1">
            <label>Enter your hint:</label><br>
            <input class="hint" type="text" v-model="hint" placeholder="Hint"/>
            <label class="InputError" v-if="hintError">Hint should not be empty</label><br>
            </div>
            <div class="msg2">
            <button type="button" class="StoreMsg" @click="encryptData"> Store Message </button>
            </div>  
        </form>
    </div>

</body>
</template>
<script>
import axios from "axios"
import { useCookies } from "vue3-cookies";

export default {
  name: 'StoreMessage',
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
      hint:'',
      message:'',
      allMessages:[],
      messageError:false,
      hintError:false,
      storageSuccess:false,
      storageFailure:false,
      logInComplete:false
    }
  },
  mounted(){
        this.logInComplete = this.$store.state.loggedIn
        this.checkLogInComplete()
  },
  methods:{
    encryptData(){
      if (!this.message){
        this.messageError = true
      }else{
        this.messageError = false
      }
      if (!this.hint){
        this.hintError = true
      }else{
        this.hintError = false
      }

      if(!this.hintError && !this.messageError){
        const studentId = this.cookies.get("studentId");
        axios.post(`http://localhost:8000/student/${studentId}/encrypt`, {
            message: this.message,
            hint: this.hint
          })
          .then(()=>{
            this.storageSuccess = true;
            setTimeout(() => {
              this.storageSuccess = false
            }, 3000)
            })  
          .catch( (error) =>{
           this.storageFailure = true;
            setTimeout(() => {
              this.storageFailure = false
            }, 3000)
            console.log('error:'+error);
          });
      }


    },
    checkLogInComplete(){
      if(!this.logInComplete){
        this.$router.push({ path: '/login' })
      }
    }
  }
}
</script>
<style scoped>
label{
  font-weight:bold;
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
.secret{
     width:100%
}
.hint{
    width:100%
}
.StoreMsg{
  margin-left: 40%;
}
.InputError{
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