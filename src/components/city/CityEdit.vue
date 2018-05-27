<template>
    <div class="text-left">
        <b-form @submit.stop.prevent="onSubmit" @reset.stop.prevent="resetForm" v-if="show">
            <b-form-group label="ID:" label-for="city-create-id" description="ID to identify a city">
                <b-form-input id="city-create-id" type="number" v-model="form.id" required placeholder="Please input an ID">                  
                </b-form-input>
            </b-form-group>
            
            <b-form-group label="Name:" label-for="city-create-name" description="City name">
                <b-form-input id="city-create-name" type="text" v-model="form.name" required placeholder="Please input a City Name">                  
                </b-form-input>
            </b-form-group>
            
            <b-form-group label="Population:" label-for="city-create-population" description="Population number of the city">
                <b-form-input id="city-create-population" type="number" v-model="form.population" required placeholder="Please input population number">                  
                </b-form-input>
            </b-form-group>
            
            <b-form-group class="float-right">
                <b-button type="button" variant="secondary">Cancel</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
                <b-button type="submit" variant="primary">Submit</b-button>
            </b-form-group>
        </b-form>
    </div>  
</template>

<script>
import axios from '../../axios-custom'

export default {
    props: {
        idToEdit: {
            type: String
        }
    },
    data() {
        return {
            form: {
                id: 0,
                name: '',
                population: 0
            },
            origData: {}, // for form reset
            show: true
        };
    },
    watch: {
        idToEdit() {
            this.getData();
        }
    },
    methods: {
        getData() {
            // Populate form data by data fetched from the server by ID
            axios.get(`/cities/${this.idToEdit}.json`)
                .then(res => {
                    this.form = Object.assign({}, res.data);
                    this.origData = Object.assign({}, this.form); // for form reset
                })
                .catch(error => console.log(error));
        },
        onSubmit() {
            axios.put(`/cities/${this.idToEdit}.json`, this.form)
                .then(res => {
                    this.$emit('cityEdited');
                    this.resetForm();
                })
                .catch(error => console.log(error));
        },
        resetForm() {            
            this.form = Object.assign({}, this.origData);
        }
    }
};
</script>

<style>
</style>
