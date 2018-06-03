<template>
    <div id="app">
        <app-top-nav-bar></app-top-nav-bar>
        <br>
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
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        color: #2c3e50;
        margin-top: 10px;
    }

    .form-group {
        margin-bottom: 2rem;
    }

    .form-group--error {
        animation-name: shakeError;
        animation-fill-mode: forward;
        animation-duration: .6s;
        animation-timing-function: ease-in-out;
    }

    .form-group--error > label {
        color: #f04124;
    }

    .form-group--error input, .form-group--error textarea, .form-group--error input:focus, .form-group--error input:hover {
        border-color: #f79483;
    }

    .form-group--error + .error {
        display: block;
        color: #f57f6c;
    }

    .form-group--loading .form-control {
        border-image-slice: 1;
        animation: loading-frame 1s infinite; 
    }

    .error {
        font-size: 0.75rem;
        line-height: 1;
        display: none;
        margin-left: 14px;
        margin-top: -1.6875rem;
        margin-bottom: 0.9375rem;
    }

    @keyframes loading-frame {
        0% { border-color: #3acfd5; }
        50% { border-color: #3a4ed5; }
        100% { border-color: #3acfd5; } 
    }

    @keyframes shakeError {
        0% { transform: translateX(0); }
        15% { transform: translateX(0.375rem); }
        30% { transform: translateX(-0.375rem); }
        45% { transform: translateX(0.375rem); }
        60% { transform: translateX(-0.375rem); }
        75% { transform: translateX(0.375rem); }
        90% { transform: translateX(-0.375rem); }
        100% { transform: translateX(0); } 
    }

    .fa-icon {
        width: auto;
        height: 1.4em; /* or any other relative font sizes */

        /* You would have to include the following two lines to make this work in Safari */
        max-width: 100%;
        max-height: 100%;
    }
</style>
