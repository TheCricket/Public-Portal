<template>
    <div v-show="show">
        <div v-show="!resolved" id="complaint-card">
            <div id="card-header" @click="openDetails">
                <div>
                    <h3>{{ name }}</h3>
                    <!-- add menu item icons here -->
                </div>
                <svg v-bind:class="{ rotate: details }" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 5l-6.5 7L1 5" stroke="currentColor" stroke-linecap="square"/>
                </svg>
            </div>
            <div id="guest-details" v-show='details'>
                <p>{{ description }}</p>
                <h3 v-if="transNum">#{{ transNum }}</h3>

                <div id="footer">
                    <div id="button-container">
                        <hollow-dots-spinner v-if="loading"
                            :animation-duration="1000"
                            :dot-size="15"
                            :dots-num="3"
                            color="#ffffff"
                        />
                        <button @click="resolve()" v-if="!loading">Resolve</button>
                    </div>
                    <div>
                        <p>{{ date | formatDate }}</p>
                        <p>Added by: {{ teamMember }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="resolved && !expired" id="complaint-card-resolved">
            <div id="card-header" @click="openDetails">
                <div>
                    <h3>{{ name }}</h3>
                    <!-- maybe add menu item icons here -->
                </div>
                <svg v-bind:class="{ rotate: details }" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 5l-6.5 7L1 5" stroke="currentColor" stroke-linecap="square"/>
                </svg>
            </div>
            <div id="guest-details" v-show='details'>
                <p>{{ description }}</p>
                <h3 v-if="transNum">#{{ transNum }}</h3>

                <div id="footer">
                    <div id="button-container">
                        <hollow-dots-spinner v-if="loading"
                            :animation-duration="1000"
                            :dot-size="15"
                            :dots-num="3"
                            color="#ffffff"
                        />
                        <button @click="resolve()" v-if="!loading">Un-Resolve</button>
                    </div>

                    <div>
                        <p>{{ date | formatDate }}</p>
                        <p>Added by: {{ teamMember }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="resolved && expired" id="complaint-card-expired">
            <div id="card-header" @click="openDetails">
                <div>
                    <h3>{{ name }}</h3>
                    <!-- maybe add menu item icons here -->
                </div>
                <svg v-bind:class="{ rotate: details }" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 5l-6.5 7L1 5" stroke="currentColor" stroke-linecap="square"/>
                </svg>
            </div>
            <div id="guest-details" v-show='details'>
                <p>{{ description }}</p>
                <h3 v-if="transNum">#{{ transNum }}</h3>

                <div id="footer">
                    <div>
                        <p>Expired</p>
                    </div>
                    <div>
                        <p>{{ date | formatDate }}</p>
                        <p>Added by: {{ teamMember }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { HollowDotsSpinner } from 'epic-spinners';
import { EventBus } from '@/main';
const backend = require('../backend/Firestore.js');


export default {
    name: 'Complaint',
    props: [
        'resolved',
        'expired',
        'name',
        'date',
        'transNum',
        'teamMember',
        'description',
        'items',
    ],
    components: {
        HollowDotsSpinner,
    },
    data() {
        return {
            details: false,
            loading: false,
            show: true,
//            key: this.$vnode.key,
        }
    },
    methods: {
        openDetails(){
            this.details = !this.details;
        },
        async resolve(){
            this.loading = true;
            await backend.toggleResolve(this.$vnode.key, !this.resolved).then(
                function(value){
                    if(value){
                        EventBus.$emit('refreshList', 1);
                    } else {
                        window.alert("Resolving Complaint Failed");
                    }
                }
            );
        },
        filter(searchItems = []){
            var result = false;
            if (searchItems.length == 0){
                result = true;
            } else {
                for(var i in searchItems){
                    if (this.items.includes(searchItems[i])){
                        result = true
                    }
                }
            }
            return result;
        },
        filterSearch(searchTerm = ""){
            if (!this.name.includes(searchTerm)){
                return false;
            } else {
                return true;
            }
        }
    },
    filters: {
        formatDate: function (value) {
            return moment(value * 1000).format('MM/DD/YYYY')
        }
    },
    created() {
        EventBus.$on('filterItems', newItems => {
            this.show = this.filter(newItems);
        });
        EventBus.$on('searchItems', searchTerm => {
            this.show = this.filterSearch(searchTerm);
        });
    }
}
</script>

<style scoped>

/* UN-RESOLVED */

#complaint-card{
    background-color: white;
    padding: 10px 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    margin: 20px;
}

#card-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
}

svg{
    transition: all 0.5s;
    width: 15px;
    color: var(--dark);
}


#guest-details{
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

p{
    font-size: 12pt;
    text-align: left;
}

#footer{
    border-top: 1px solid var(--cfa-gray);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding-top: 10px;
    color: var(--cfa-gray);
}

#footer #button-container{
    background-color: var(--cfa-green);
    border: none;
    color: white;
    padding: 12px 30px;
    border-radius: 50px;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.1);
    font-size: 12pt;
}

#footer button{
    background: none;
    border: none;
    box-shadow: none;
    padding: 0px;
    color: white;
    font-size: 14pt;
}


#footer p{
    text-align: right;
}

.rotate{
    transform: rotate(180deg);
}

/* RESOLVED */

#complaint-card-resolved{
    padding: 0px 20px;
    display: flex;
    flex-direction: column;
    margin: 20px;
    border-left: 2px solid var(--cfa-red);
}

#complaint-card-resolved #footer{
    border: none;
}

#complaint-card-resolved #footer #button-container{
    background-color: var(--cfa-red);
    border: none;
    color: white;
    padding: 12px 30px;
    border-radius: 50px;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.1);
    font-size: 12pt;
}

#complaint-card-expired{
    padding: 0px 20px;
    display: flex;
    flex-direction: column;
    margin: 20px;
    border-left: 2px solid var(--cfa-yellow);
}


</style>
