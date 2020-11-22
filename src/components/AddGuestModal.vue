<template>
    <div id="container" v-bind:class="{ show: show }">

        <div class="add-guest">
            <div id="modal-header">
                <h1>Add Guest</h1>
                <router-link to="/complaints">
                    <button @click="hideModal()">
                        <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 1.5l12 12m-12 0l12-12" stroke="currentColor"/>
                        </svg>
                    </button>
                </router-link>
            </div>


            <form v-on:submit.prevent="createComplaint">
                <!-- Guest Name -->
                <div class="form-row">
                    <label for="name">Guest Name:</label>
                    <input hint="test" type="text" id="name" name="name" v-model="form.name">
                </div>

                <!-- Phone Number -->
                <div class="form-row">
                    <label for="phone">Phone Number:</label>
                    <input type="number" id="phone" name="phone" v-model="form.phone" v-bind:class="{ fieldError: (form.phone != '') && !validPhone() }">
                </div>

                <!-- Transaction Number -->
                <div class="form-row">
                    <label for="transNumber">Transaction Number:</label>
                    <input type="number" id="transNumber" name="transNumber" v-model="form.transNumber">
                </div>

                <!-- Description -->
                <div class="form-row">
                    <label for="description">Description:</label>
                    <textarea type="text" id="description" name="description" v-model="form.description"></textarea>
                </div>

                <!-- Item Buttons -->
                <h3>Item Shortcuts:</h3>
                <div id="item-buttons">
                    <button @click="toggleItem('CFA')" v-bind:class="{ selected: items.cfa }" type="button">Chick-fil-A Sandwich</button>
                    <button @click="toggleItem('Spicy')" v-bind:class="{ selected: items.spicy }" type="button">Spicy Sandwich</button>
                    <button @click="toggleItem('Grilled')" v-bind:class="{ selected: items.grilled }" type="button">Grilled Sandwich</button>
                    <button @click="toggleItem('Nuggets/Strips')" v-bind:class="{ selected: items.nuggetsStrips }" type="button">Nuggets / Strips</button>
                    <button @click="toggleItem('Fries')" v-bind:class="{ selected: items.fries }" type="button">Fries</button>
                    <button @click="toggleItem('Salads')" v-bind:class="{ selected: items.salads }" type="button">Salads</button>
                    <button @click="toggleItem('Drinks')" v-bind:class="{ selected: items.drinks }" type="button">Drinks</button>
                </div>

                <!-- Submit -->
                <div id="submit">
                    <label for="initials">Initials:</label>
                    <input type="text" placeholder="Initials" id="initials" name="initials" maxlength="2" v-model="form.teamMember">
                    <hollow-dots-spinner v-if="submitting"
                        :animation-duration="1000"
                        :dot-size="15"
                        :dots-num="3"
                        color="#dd0033"
                    />
                    <input v-if="!submitting" id="submitButton" type="submit" :disabled="submitDisabled()">
                </div >
            </form>
        </div>
    </div>
</template>

<script>
import { EventBus } from '@/main';
import moment from 'moment';
const backend = require('../backend/Firestore');
import { HollowDotsSpinner } from 'epic-spinners'

export default {
    name: 'AddGuestModal',
    components: {
        HollowDotsSpinner,
    },
    data() {
        return {
            show: true,
            submitting: false,
            items: {
                cfa: false,
                spicy: false,
                grilled: false,
                nuggetsStrips: false,
                fries: false,
                salads: false,
                drinks: false,
            },
            form: {
                name: "",
                phone: "",
                date: null,
                transNumber: "",
                items: "",
                description: "",
                teamMember: "",
                resolved: false,
            }
        }
    },
    methods: {
        toggleItem(item){
            switch(item){
                case "CFA":
                    this.items.cfa = !this.items.cfa;
                    break;
                case "Spicy":
                    this.items.spicy = !this.items.spicy;
                    break;
                case "Grilled":
                    this.items.grilled = !this.items.grilled;
                    break;
                case "Nuggets/Strips":
                    this.items.nuggetsStrips = !this.items.nuggetsStrips;
                    break;
                case "Fries":
                    this.items.fries = !this.items.fries;
                    break;
                case "Salads":
                    this.items.salads = !this.items.salads;
                    break;
                case "Drinks":
                    this.items.drinks = !this.items.drinks;
                    break;
                default:
                    return false;
            }
        },
        submitDisabled(){
            return !this.form.name || !this.form.description || !this.form.teamMember || !this.validPhone();
        },
        validPhone(){
            return (this.form.phone.length == 10);
        },
        hideModal(){
            this.show = false;
            EventBus.$emit('showModal', false);
        },
        createComplaint(){
            this.submitting = true;

            var items = [];
            
            if(this.items.cfa){ items.push("cfa") }
            if(this.items.spicy){ items.push("spicy") }
            if(this.items.grilled){ items.push("grilled") }
            if(this.items.nuggetsStrips){ items.push("nuggetsStrips") }
            if(this.items.fries){ items.push("fries") }
            if(this.items.salads){ items.push("salads") }
            if(this.items.drinks){ items.push("drinks") }

            this.form.items = items;

            backend.createComplaint(this.form).then(function () {
                //window.alert("Updating...");+
                EventBus.$emit('addedComplaint', 1);
            });
            this.$router.replace("/complaints");
        }
    },
    created (){
        EventBus.$on('showModal', showBool => {
            this.show = showBool;
        });
        this.form.date = moment().unix();
    }
}
</script>

<style scoped>

/* Large Screens 
@media only screen and (min-width: 600px) {
    #container{
        top: -200vh;
    }

    .show{
        top: 0% !important;
    }
}*/

/* Small Screens */
@media only screen and (max-width: 600px) {
    #container{
        padding-bottom: 50px;
        display: none;
    }

    .show{
        display: block !important;
    }

    .form-row{
        justify-content: center !important;
    }

    .form-row label{
        text-align: center !important;
    }

    .form-row input{
        width: 100% !important;
    }
    .form-row textarea{
        width: 100% !important;
    }
    #submit{
        align-self: center !important;
    }
}

#container{
    background-color: var(--light);
}

.show{
    top: 0% !important;
}

.add-guest{
    padding-bottom: 50px;
    
    margin: auto;
    padding-top: 50px;
}

form{
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    padding-top: 50px;
}

.form-row{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 20px;
}
.form-row label {
    text-align: left;
    font-size: 16pt;
    color: var(--cfa-darkBlue);
    font-weight: bold;
    width: 250px;
}
.form-row input{
    width: 60%;
    font-size: 16pt;
    padding: 5px;
    border-radius: 10px;
    color: var(--cfa-dark);
    background-color: white;
    border: none;
    box-shadow: 0px 2px 10px rgba(0,0,0,0.05);
}
.form-row textarea{
    width: 100%;
    height: 200px;
    font-size: 12pt;
    resize: none;
    font-family: sans-serif;
    padding: 5px;
    border-radius: 10px;
    color: var(--cfa-dark);
    background-color: white;
    border: none;
    box-shadow: 0px 2px 10px rgba(0,0,0,0.05);
}

h3{
    text-align: center;
    font-size: 16pt;
    color: var(--cfa-darkBlue);
    font-weight: bold;
    width: 250px;
}
#item-buttons{
    display: flex;
    flex-direction: row;
    padding-bottom: 50px;
    flex-wrap: wrap;
    justify-content: center;
}
#item-buttons button{
    background-color: white;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.05);
    padding: 10px 20px;
    border-radius: 50px;
    margin: 10px;
    font-weight: bold;
    color: var(--dark);
    border: none;
    color: var(--cfa-darkBlue);
}
.selected{
    background-color: var(--cfa-blue) !important;
    color: white !important;
}

#submit{
    align-self: flex-end;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    background-color: var(--light);
    border: 10px solid white;
    border-radius: 50px;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.1);
}
#submit label{
    display: none;

    text-align: right;
    font-size: 16pt;
    color: var(--cfa-darkBlue);
    font-weight: bold;
    padding-right: 10px;
}
#submit #initials{
    width: 100px;
    text-align: center;
    font-size: 14pt;
    padding: 5px;
    border-radius: 50px;
    color: var(--cfa-dark);
    background-color: var(--light);
    border: none;
}
#submit #submitButton{
    background-color: var(--cfa-green);
    border: none;
    padding: 5px 20px;
    font-size: 14pt;
    border-radius: 50px;
    color: white;
    box-shadow: 2px 2px 10px rgba(36,158,107,0.5);
}
#submit :disabled{
    background-color: var(--cfa-gray) !important;
    box-shadow: none !important;
}

#modal-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
#modal-header h1{
    color: var(--cfa-darkBlue);
}
#modal-header svg{
    background-color: var(--cfa-darkRed);
    width: 25px;
    height: 25px;
    padding: 5px;
    border-radius: 50px;
    color: white;
}

.fieldError{
    border: 1px solid var(--cfa-red) !important;
    box-shadow: 0px 2px 10px rgba(221, 0, 51, 0.2) !important;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>
