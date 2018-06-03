<template>
    <div>
        <b-form @submit.prevent="onSubmit" @reset.prevent="resetForm" v-if="show">            
            <div class="form-group" :class="{'form-group--error': $v.form.id.$error, 'form-group--loading': $v.form.id.$pending}">
                <label for="city-id">ID</label>
                <input type="number" class="form-control" id="city-id" v-model.trim.lazy.number="$v.form.id.$model" @blur="$v.form.id.$touch()">
            </div>
            <div class="error" v-if="!$v.form.id.required">This field must not be empty.</div>
            <div class="error" v-if="!$v.form.id.unique">ID is already in the database. Please input different ID.</div>
            <div class="error" v-if="!$v.form.id.numeric">Only numeric value is allowed.</div>
            <div class="error" v-if="!$v.form.id.minValue">ID must be greater than 0.</div>
            
            <div class="form-group" :class="{'form-group--error': $v.form.name.$error, 'form-group--loading': $v.form.name.$pending}">
                <label for="city-name">City Name</label>
                <input type="text" class="form-control" id="city-name" v-model.trim.lazy="$v.form.name.$model" @blur="$v.form.name.$touch()">
            </div>
            <div class="error" v-if="!$v.form.name.required">This field must not be empty.</div>
            <div class="error" v-if="!$v.form.name.unique">City is already in the database. Please input different city name.</div>
            
            <div class="form-group" :class="{'form-group--error': $v.form.region.$error}">
                <label for="city-region">Region</label>
                <v-select :options="regionOptions" @search="onRegionSearch" :on-change="onChange" v-model.trim="$v.form.region.$model"  @blur="$v.form.region.$touch()" >
                    <template slot="no-options">
                        type to search Region..
                    </template>
                </v-select>
            </div>
            <div class="error" v-if="!$v.form.region.required">This field must not be empty.</div>
            
            <div class="form-group" :class="{'form-group--error': $v.form.population.$error, 'form-group--loading': $v.form.population.$pending}">
                <label for="city-population">Population</label>
                <input type="number" class="form-control" id="city-population" v-model.trim.lazy.number="$v.form.population.$model" @blur="$v.form.population.$touch()">
            </div>
            <div class="error" v-if="!$v.form.population.required">This field must not be empty.</div>
            <div class="error" v-if="!$v.form.population.numeric">Only numeric (non-negative) value is allowed.</div>
            
            <b-form-group class="float-right">
                <b-button type="reset" variant="danger">Reset</b-button>
                <b-button type="submit" variant="primary" :disabled="$v.$invalid">Submit</b-button>
            </b-form-group>
        </b-form>
    </div>  
</template>

<script>
import axios from '../../axios-custom'
import { required, numeric, minValue } from 'vuelidate/lib/validators'
import { formMixin } from './mixin'

export default {
    mixins: [formMixin],    
    validations: {
        form: {
            id: {
                required,
                numeric,
                minValue: minValue(1),
                unique(val) { 
                    if (val === '') return true
                    return axios.get('/cities.json?orderBy="id"&equalTo="' + val + '"')
                        .then(res => { return Object.keys(res.data).length === 0 })
                }
            },
            name: {
                required,
                unique(val) { 
                    if (val === '') return true
                    return axios.get('/cities.json?orderBy="name"&equalTo="' + val + '"')
                        .then(res => { return Object.keys(res.data).length === 0 })
                }
            },
            region: {
                required
            },
            population: {
                required,
                numeric
            }
        }
    },
    methods: {
        onSubmit() {
            axios.post('/cities.json', this.form)
                .then(res => {
                    this.$emit('cityAdded');
                    this.resetForm();
                }) 
                .catch(error => console.log(error));
        },
        resetForm() {
            this.form.id = 0;
            this.form.name = '';
            this.form.region = '';
            this.form.population = 0;
        }        
    },
    created() {
        // Enable this to pre-populated the region dropdown instead of using AJAX search
        //this.fetchRegionDropdown();
    }
};
</script>

<style>
</style>
