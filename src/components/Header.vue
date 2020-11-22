<template>
    <div>
        <div class="head">
            <img src="../assets/cfalogo.png"/>
            <router-link to="/complaints/add-guest">
                <button id="add-guest-button">
                    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 4v7M4 7.5h7m-3.5 7a7 7 0 110-14 7 7 0 010 14z" stroke="currentColor"></path>
                    </svg>
                    <span>Add Guest</span>
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>

export default {
    name: 'header',
}
</script>

<style scoped>

.head{
    height: 100px;
    display: flex;
    flex-direction: row;
    padding: 20px 5vw;
    justify-content: space-between;
    align-items: center;
}

img{
    height: 100px;
}
#add-guest-button{
    color: var(--cfa-red);
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 50px;
    font-size: 14pt;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.05);
    padding-right: 20px;
}

#add-guest-button svg{
    fill: var(--cfa-red);
    color: white;
    padding-right: 10px;
    width: 40px;
}

</style>