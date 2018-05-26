<template>
    <b-navbar toggleable="md" type="dark" variant="info">
        <router-link to="/" tag="b-navbar-brand">City Center</router-link>

        <b-collapse is-nav id="nav_collapse">            
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
