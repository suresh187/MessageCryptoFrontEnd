<template>

  <div class="Root">
    <div>
      <p class="StoredMsg"> Your stored messages</p>
    </div>
    <div class="Holding">
      <div class="Heading">
        <label class="Hint"> Hint </label>
        <label> Action </label>
        <label class="Message"> Message </label>
      </div>
      <div class= "Row" v-for="item in allMessages" :key="item.id">
        <MessageItem :message = "item"></MessageItem>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import MessageItem from "./MessageItem.vue"
// import Header from "./Header.vue"
import { useCookies } from "vue3-cookies";

export default {
  name: 'HelloWorld',
    setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  components: {
    MessageItem,
  },
  props: {
    msg: String
  }, data(){
    return {
      logInComplete:false,
      allMessages:[],
    }
  },
  created(){
  },  
  mounted(){
    this.logInComplete = this.$store.state.loggedIn
    this.checkLogInComplete()
    this.getData()
  },

  methods:{
    getData(){
      const studentId = this.cookies.get("studentId");
      axios.get(`http://localhost:8000/student/${studentId}/messages`)
         .then((response)=>{
            let messages = response.data.messages;
            this.allMessages = messages
            this.allMessages = this.allMessages.map(item =>({...item, studentId:studentId}))
          });         
    },
    checkLogInComplete(){
      if(!this.logInComplete){
        this.$router.push({ path: '/login' })
      }
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
.StoredMsg{
  font-weight: bold;
  text-align: center;
  width:100%;
  padding-top: 10px;

}
.Holding{
  margin:10px;
}
.Heading{
  display: flex;
  justify-content: space-between;
}
.Row:nth-child(even) {background-color: #f2f2f2;} 

label{
    /* display: inline-block; */
  /* margin-left: 108px; */
}
.Hint{
  margin-left: 16%;
}
.Message{
  margin-right: 14%;
}
</style>
