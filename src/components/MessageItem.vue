<template>
<div class = "MessageItem">
    <span> {{message.hint}}</span>
    <button @click="decryptMessage(message.hint, message.studentId)"> decrypt</button>
    <span> {{decryptedMessage}}</span>
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
h3 {
  margin: 40px 0 0;
}
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
.MessageItem{
    display: inline-block;
    padding:20px
}
span{
    padding:10px;
    display: inline-block;
    width: 250px;
}
</style>
