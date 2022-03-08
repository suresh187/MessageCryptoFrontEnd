<template>
<div class = "MessageItem">
    <span class="Label"> {{message.hint}}</span>
    <button class="Button" @click="decryptMessage(message.hint, message.studentId)"> decrypt</button>
    <span class="Message"> {{decryptedMessage}}</span>
</div>

</template>

<script>
import axios from "axios"
export default {
  name: 'HelloWorld',
  props: {
    message:{}
  },
   data(){
    return {
      decryptedMessage:''
    }
  },
  methods:{
      decryptMessage(hint, studentId){
                axios.get(`http://localhost:8000/student/${studentId}/decrypt?hint=${hint}`)
         .then((response)=>{
            console.log(response);
            this.decryptedMessage = response.data.decryptedMessage
          }).catch((err)=>{
              console.log(err);
              alert('Message Decryption Failed!!! Contact your Admin')
          });  
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.MessageItem{
    text-align:center;
    width: 100%;
}

.Label{
    /* margin-left: 150px; */
    display: inline-block;
     width: 87px;
     margin-top: 7px;
     margin-bottom: 7px;
     text-align: center;
     padding-left: 60px;
}

.Message{
    padding-left: 120px;
    display: inline-block;
     width: 87px;
     margin-top: 7px;
     margin-bottom: 7px;
     text-align: center;
}

.Button{
    /* margin-left: 150px; */
    display: inline-block;  
    margin-left:100px; 
     margin-top: 7px;
     margin-bottom: 7px;
     text-align: center;
     background-color: #42b983;
}

</style>
