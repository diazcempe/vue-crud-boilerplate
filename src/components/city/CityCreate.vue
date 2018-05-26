<template>
    <div class="text-left">
        <b-form @submit.stop.prevent="onSubmit" @reset.prevent="onReset" v-if="show">
            <b-form-group id="city-create-id-group" label="ID:" label-for="city-create-id" description="ID to identify a city">
                <b-form-input id="city-create-id" type="number" v-model="form.id" required placeholder="Please input an ID">                  
                </b-form-input>
            </b-form-group>
            
            <b-form-group id="city-create-name-group" label="Name:" label-for="city-create-name" description="City name">
                <b-form-input id="city-create-name" type="text" v-model="form.name" required placeholder="Please input a City Name">                  
                </b-form-input>
            </b-form-group>
            
            <b-form-group id="city-create-population-group" label="Population:" label-for="city-create-population" description="Population number of the city">
                <b-form-input id="city-create-population" type="number" v-model="form.population" required placeholder="Please input population number">                  
                </b-form-input>
            </b-form-group>
            
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>  
</template>

<script>
import axios from '../../axios-custom'

export default {
    data() {
        return {
            show: true,
            form: {
                id: 0,
                name: '',
                population: 0
            }
        };
    },
    methods: {
        onSubmit() {
            axios.post('/cities.json', this.form)
                .then(res => {
                    this.$emit('cityAdded');
                })
                .catch(error => console.log(error));
        },
        onReset() {
            /* Reset our form values */
            this.form.id = 0;
            this.form.name = '';
            this.form.population = 0;

            /* Trick to reset/clear native browser form validation state */
            this.show = false;
            this.$nextTick(() => {
              this.show = true;
            });
        }
    }
};
</script>

<style>
</style>
