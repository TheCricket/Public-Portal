<template>
    <div class="menu">
        <img src="../assets/cfalogo.png">
    </div>    
</template>

<script>
export default {
    name: 'menu',
}
</script>

<style scoped>

.menu{
    width: 150px;
    height: 100vh;
    background-color: var(--cfa-darkRed);
    display: flex;
    flex-direction: row;
    padding: 20px 5vw;
    z-index: 100;
}

img{
    height: 60px;
}

</style>