import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import mitt from 'mitt'
import { createStore } from 'vuex'
    const store = createStore({
        state () {
        return {
            loggedIn: false,
            userInfo:''
        }
        },
        mutations: {
        confirmLogin (state) {
            state.loggedIn = true
        },
        confirmLogout(state){
            state.loggedIn = false
        },
        setUserInfo (state, info) {
            state.userInfo = info
        }
        }
    })
    const app = createApp(App);
    const emitter = mitt()
    app.config.globalProperties.emitter = emitter
    app.use(router)
    app.use(store)
    app.mount('#app')
// createApp(App).use(router).mount('#app')