<template>
    <tr v-bind:class="{ warning_highlight: numCalls >= 3 , alert_highlight: numCalls >= 5}">
        <td v-bind:class="{ warning: numCalls >= 3 , alert: numCalls >= 5}">
            <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M8 10.5V10H7v.5h1zm-1 .01v.5h1v-.5H7zM7 4v4h1V4H7zm0 6.5v.01h1v-.01H7zm.5 3.5A6.5 6.5 0 011 7.5H0A7.5 7.5 0 007.5 15v-1zM14 7.5A6.5 6.5 0 017.5 14v1A7.5 7.5 0 0015 7.5h-1zM7.5 1A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zm0-1A7.5 7.5 0 000 7.5h1A6.5 6.5 0 017.5 1V0z" fill="currentColor"></path></svg>
        </td>
        <td>{{ "(" + phoneNum.substring(0, 3) + ") " +  phoneNum.substring(3, 6) + "-" + phoneNum.substring(6, 10) }}</td>
        <td>
            {{ numCalls }} call{{ numCalls >1 ? 's' : '' }}
        </td>
    </tr>
</template>

<script>
export default {
    name: 'PhoneNumRow',
    props: [
        'phoneNum',
        'numCalls',
    ],
    components: {},
    data()  {
        return {
            
        }
    },
}
</script>

<style>

td svg path{
    color: rgba(91, 103, 112, 0.5) !important;
}

.warning svg path{
    color: var(--cfa-yellow);
}

.alert svg path{
    color: var(--cfa-red) !important;
}

table{border-collapse:collapse;}

tr{
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

.alert_highlight{
    background-color: rgba(221, 0, 51, 0.1) !important;
    font-weight: bold;
}

.warning_highlight{
    font-weight: bold;
    background-color: rgba(255, 181, 73, 0.1);
}

</style>