<template>
    <div class="card">
        <p class="city-name">{{item.city}}</p>
        <p class="celcius">{{item.temp}}°C</p>
        <span class="icon"></span>
        <p class="description">{{item.weather}}</p>
        <img :src='item.icon' />
    </div>  
</template>

<script>
export default {
    props: ['item']
}
</script>

<style scoped>

.card {
    position: relative;
    padding: 40px;
    border-radius: 20px;
    background: var(--text-light);
    color: var(--text_med);
    width: 300px;
    margin: 0 auto;
}
</style>