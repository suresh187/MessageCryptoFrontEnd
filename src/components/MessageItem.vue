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
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
}
.Label{
  width: 33%;
}
.Message{
  width: 33%;
}
.Button{
  height: 30px;
   background-color: #42b983;
}
/* .Label{

    display: inline-block;
     width: 87px;
     margin-top: 7px;
     margin-bottom: 7px;
     text-align: center;
     padding-left: 60px;
} */
/* 
.Message{
    padding-left: 120px;
    display: inline-block;
     width: 87px;
     margin-top: 7px;
     margin-bottom: 7px;
     text-align: center;
}

.Button{

    display: inline-block;  
    margin-left:100px; 
     margin-top: 7px;
     margin-bottom: 7px;
     text-align: center;
     background-color: #42b983;
} */

</style>
