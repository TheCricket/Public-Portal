<template>
    <div id="container">
        <img src="../assets/cfalogo_white.png"/>
        <input type="password" v-model="pin"/>
        <button @click="login">Login</button>
    </div>
</template>

<script>
import * as backend from '../backend/Firestore.js'
import { EventBus } from '@/main';


export default {
    name: 'Locked',
    data(){
        return {
            pin: null,
        }
    },
    methods: {
        async login(){
            await backend.login(this.pin).then(
                function(value){
                    if(value){
                        EventBus.$emit('toggleLock', false);
                    } else {
                        window.alert("Locked");
                        // leave locked 
                        // show error
                    }
                }
            );
            this.$router.replace("/complaints");
        }
    }
}
</script>

<style scoped>

#container{
    background: rgb(221,0,51);
    background: radial-gradient(circle, rgba(221,0,51,1) 0%, rgba(175,39,47,1) 100%);
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
}

img{
    padding-bottom: 20px;
}

input{
    background-color: var(--light);
    border-radius: 50px;
    border: none;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 18pt;
    text-align: center;
    letter-spacing: 2px;
    color: var(--cfa-gray)
}

button{
    padding: 10px 20px;
    background-color: var(--cfa-green);
    border: none;
    border-radius: 50px;
    color: white;
    font-size: 12pt;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
}

</style>