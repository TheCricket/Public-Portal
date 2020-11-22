<template>
    <div>
        <div id="search-container">
            <div id="search-field" >
                <input type="text" placeholder="Guest Name" v-model="searchTerm" @change="search()">
                <button id="search-button" @click="search()">Search</button>
            </div>    
        </div>
        <div id="item-buttons">
            <button id="filter-button" @click="filter('cfa')" v-bind:class="{ selected: items.cfa }">
                Chick-fil-A Sandwich
            </button>
            <button id="filter-button" @click="filter('spicy')" v-bind:class="{ selected: items.spicy }">
                Spicy Sandwich
            </button>
            <button id="filter-button" @click="filter('grilled')" v-bind:class="{ selected: items.grilled }">
                Grilled Sandwich
            </button>
            <button id="filter-button" @click="filter('nuggetsStrips')" v-bind:class="{ selected: items.nuggetsStrips }">
                Nuggets / Strips
            </button>
            <button id="filter-button" @click="filter('fries')" v-bind:class="{ selected: items.fries }">
                Fries
            </button>
            <button id="filter-button" @click="filter('salads')" v-bind:class="{ selected: items.salads }">
                Salads
            </button>
            <button id="filter-button" @click="filter('drinks')" v-bind:class="{ selected: items.drinks }">
                Drinks
            </button>
        </div>
    </div>
</template>

<script>
//import * as backend from '../backend/Firestore';
import { EventBus } from '@/main';

export default {
    name: "Filters",   
    data: function() {
        return {
            itemList: [],
            searchTerm: "",
            items: {
                cfa: false,
                spicy: false,
                grilled: false,
                nuggetsStrips: false,
                fries: false,
                salads: false,
                drinks: false,
            },
        }
    },
    methods: {

        search(){
            EventBus.$emit('searchItems', this.searchTerm);
        },

        filter(string){

            if(this.itemList.includes(string)){
                const index = this.itemList.indexOf(string);
                if (index > -1) {
                    this.itemList.splice(index, 1);
                }
            } else {
                this.itemList.push(string);
            }

            switch(string){
                case "cfa":
                    this.items.cfa = !this.items.cfa;
                    break;
                case "spicy":
                    this.items.spicy = !this.items.spicy;
                    break;
                case "grilled":
                    this.items.grilled = !this.items.grilled;
                    break;
                case "nuggetsStrips":
                    this.items.nuggetsStrips = !this.items.nuggetsStrips;
                    break;
                case "fries":
                    this.items.fries = !this.items.fries;
                    break;
                case "salads":
                    this.items.salads = !this.items.salads;
                    break;
                case "drinks":
                    this.items.drinks = !this.items.drinks;
                    break;
                default:
                    return false;
            }
            EventBus.$emit('filterItems', this.itemList);
        }
    }
}
</script>

<style scoped>

input{
    background-color: var(--light);
    width: 80%;
    border: none;
    border-radius: 50px;
    padding: 10px 20px;
    font-size: 14pt;
}

#search-button{
    background-color: var(--cfa-red);
    padding: 0px 5%;
    border: none;
    border-radius: 50px;
    color: white;
    font-size: 14pt;
    min-width: 150px;
}

#search-container{
    background-color: white;
    margin-bottom: 20px;
    display: flex;
    padding: 20px;
    flex-direction: column;
    border-radius: 50px;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.05);
}

#search-field{
    background-color: var(--light);
    width: 100%;
    border-radius: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

#item-buttons{
    display: flex;
    flex-direction: row;
    padding-bottom: 50px;
    flex-wrap: wrap;
    justify-content: center;
}

#filter-button{
    background-color: white;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.05);
    padding: 10px 20px;
    border-radius: 50px;
    margin: 10px;
    font-weight: bold;
    color: var(--dark);
}

.selected{
    background-color: var(--cfa-blue) !important;
    color: white !important;
}

</style>