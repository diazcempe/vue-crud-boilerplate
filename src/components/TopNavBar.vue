<template>
    <b-navbar toggleable="md" type="dark" variant="info">
        <router-link to="/" tag="b-navbar-brand">City Info</router-link>

        <b-collapse is-nav id="nav_collapse">      
            <b-navbar-nav>                  
                <b-nav-item :to="{ name: 'Regions'}">Regions</b-nav-item>
            </b-navbar-nav>         
            <b-navbar-nav>                  
                <b-nav-item :to="{ name: 'Cities'}">Cities</b-nav-item>
            </b-navbar-nav>   
         </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    
}
</script>

<style>

</style>
