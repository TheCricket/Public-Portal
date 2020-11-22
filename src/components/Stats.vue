<template>
    <div>
        <h1>Stats</h1>
        <div id="stats-body">
            <table>
                <tr id="table-head">
                    <th>Alert</th>
                    <th>Phone #</th>
                    <th># Calls in System</th>
                </tr>
                <PhoneNumRow v-for="i in phoneNums"
                    :key="i.id"
                    :phoneNum="i.id"
                    :numCalls="i.num_calls"></PhoneNumRow>
            </table>
        </div>
    </div>
</template>

<script>
import PhoneNumRow from './PhoneNumRow';

const backend = require('../backend/Firestore');

export default {
    name: 'GuestComplaints',
    props: [],
    components: {
        PhoneNumRow
    },
    data()  {
        return {
            phoneNums: {},
        }
    },
    methods: {
        getPhoneNums(){
            this.phoneNums = backend.getPhoneNums();
        }
    },
    created () {
        this.getPhoneNums();
    },
}
</script>

<style>

h1{
    text-align: left;
}

#stats-body{
    background-color: white;
    border-radius: 20px;
    padding: 20px 20px;
    text-align: left;
}

table{
    width: 100%;
}
td{
    height: 40px;
}
tr{
    text-align: center;
}

svg{
    height: 20px;  
    width: 20px;
}
#table-head{
    color: var(--cfa-gray);
}
button{
    background-color: white;
    padding: 5px;
    margin-right: 10px;
}
#edit svg path{
    color: var(--cfa-yellow);
}
#delete svg path{
    color: var(--cfa-red);
}

</style>