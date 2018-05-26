<template>
    <div id="app">
        <app-top-nav-bar></app-top-nav-bar>
        <!-- <img src="./assets/logo.png"> -->
        <router-view></router-view>
    </div>
</template>

<script>
import TopNavBar from '@/components/TopNavbar';

export default {
    name: 'app',
    components: {
        appTopNavBar: TopNavBar
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 10px;
}
</style>
