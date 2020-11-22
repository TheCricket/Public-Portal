<template>
    <div id="guest-complaints">
        <router-view></router-view>
        <Filters/>
        <h2>Results:</h2>
        <Complaint v-for="i in complaints.unresolved"
            :key="i.id"
            :resolved="i.resolved"
            :name="i.name"
            :date="i.date"
            :transNum="i.transNumber"
            :teamMember="i.teamMember"
            :description="i.description"
            :items="i.items"
        />
        <div @click="toggleResolved">
            <h4>Resolved Complaints</h4>
            <svg v-bind:class="{ rotate: showResolved }" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 5l-6.5 7L1 5" stroke="currentColor" stroke-linecap="square"/>
            </svg>
        </div>
        <div v-show="showResolved">
            <Complaint v-for="i in complaints.resolved" 
                
                :key="i.id"
                :resolved="i.resolved"
                :expired="i.expired"
                :name="i.name"
                :date="i.date"
                :transNum="i.transNumber"
                :teamMember="i.teamMember"
                :description="i.description"
                :items="i.items"
            />
        </div>
    </div>
</template>

<script>
import Complaint from './Complaint.vue';
import Filters from './Filters.vue'

const backend = require('../backend/Firestore');
//import { EventBus } from '@/main';


export default {
    name: 'GuestComplaints',
//    props: [
//        'complaints',
//        'resolvedComplaints',
//    ],
    components: {
        Complaint,
        Filters
    },
    data()  {
        return {
            showResolved: false,
            items: [],
            complaints: null,
            resolvedComplaints: null,
        }
    },
    methods: {
        toggleResolved(){
            this.showResolved = !this.showResolved;
        },
        getComplaints(){
            backend.getComplaints();
            this.complaints = backend.complaints;
//            this.complaints = backend.getUnresolvedComplaints();
//            this.resolvedComplaints = backend.getResolvedComplaints();
        }
    },
    created () {
        this.getComplaints();
    },
}
</script>

<style scoped>

svg{
    width: 20px;
    transition: all 0.5s;
}

.rotate{
    transform: rotate(180deg);
}

h4{
    padding-top: 50px;
}

</style>