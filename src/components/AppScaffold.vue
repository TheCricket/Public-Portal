<template>
    <div id="AppScaffold">

        <Header/>
        <div id="content">
            <div id="sidebar" v-if="isAdmin">
                <router-link to="/complaints">
                    <li>
                        Guest Complaints
                    </li>
                </router-link>
                <router-link to="/stats">
                    <li>
                        Stats
                    </li>
                </router-link>
                <router-link to="/admin" v-show="false">
                    <li>
                        User Admin
                    </li>
                </router-link>
                <div v-show="false">
                    <h4>
                        Logged in as Adam
                    </h4>
                    <a href="#" id="edit">Edit User</a>
                    <a href="#" id="log-out">Log Out</a>
                </div>
                <p>Version 2.0</p>
            </div>
            
            <div id="body">
                <router-view></router-view>
                <!--<GuestComplaints
                    v-if="(complaints /*&& resolvedComplaints*/)"
                    :key="key"
                    :complaints="complaints.unresolved"
                    :resolvedComplaints="complaints.resolved"
                />-->
            </div>

        </div>
    </div>
</template>

<script>    
import Header from './Header.vue'
//import GuestComplaints from './GuestComplaints.vue'
const backend = require('../backend/Firestore');
//import { EventBus } from '@/main';
//import VueRouter from 'vue-router'


export default {
    name: 'AppScaffold',
    components: {
        Header,
        //GuestComplaints,
    },
    data () {
        return {
            loading: true,
            complaints: null,
            resolvedComplaints: null,
            isAdmin: backend.isAdmin,
            key: 1
        }
    },
    /*created () {
        this.getComplaints();
    },
    methods: {
        getComplaints(){
            backend.getComplaints();
            this.complaints = backend.complaints;
//            this.complaints = backend.getUnresolvedComplaints();
//            this.resolvedComplaints = backend.getResolvedComplaints();
        }
    }*/
}
</script>

<style scoped>

#log-out{
    color: var(--cfa-red);
    text-decoration: none;
    font-size: 10pt;
}

#edit{
    color: var(--cfa-darkBlue);
    margin: 6px 0px;
    text-decoration: none;
    font-size: 10pt;
}


#AppScaffold{
    background-color: var(--cfa-light);
}

#content{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

#sidebar{
    display: flex;
    flex-direction: column;
    padding: 10px 40px;
}
#sidebar li{
    padding: 10px 10px;
    width: 100%;
    border-radius: 20px;
    font-size: 16px;
    list-style: none;
    font-weight: bold;
    margin-bottom: 20px;
    background-color: white;
    width: 200px;
}
#sidebar li:hover{
    background-color: var(--cfa-blue);
}
.router-link-active li{
    background-color: var(--cfa-darkBlue) !important;
    color: white;
    box-shadow: 2px 2px 5px rgba(0,79,113,0.2);
}
#body{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0px 50px;
    width: 100%
}

/* Small Screens */
@media only screen and (max-width: 600px) {
    #content{
        padding: 50px 10px;
    }
}

.loading{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20vh;
}

</style>
