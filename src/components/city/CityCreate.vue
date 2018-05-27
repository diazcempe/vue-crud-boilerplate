<template>
    <div>
        <b-form @submit.stop.prevent="onSubmit" @reset.stop.prevent="resetForm" v-if="show">
            <b-form-group label="ID" label-for="city-create-id" description="ID to identify a city">
                <b-form-input id="city-create-id" type="number" v-model="form.id" required placeholder="Please input an ID">                  
                </b-form-input>
            </b-form-group>
            
            <b-form-group label="City Name" label-for="city-create-name" description="City name">
                <b-form-input id="city-create-name" type="text" v-model="form.name" required placeholder="Please input a City Name">                  
                </b-form-input>
            </b-form-group>
            
            <b-form-group label="Region" label-for="city-create-region" description="City's Region ">
                <b-form-select v-model="form.region" :options="regionOptions" class="mb-3" />
            </b-form-group>
            
            <b-form-group label="Population" label-for="city-create-population" description="Population number of the city">
                <b-form-input id="city-create-population" type="number" v-model="form.population" required placeholder="Please input population number">                  
                </b-form-input>
            </b-form-group>
            
            <b-form-group class="float-right">
                <b-button type="reset" variant="danger">Reset</b-button>
                <b-button type="submit" variant="primary">Submit</b-button>
            </b-form-group>
        </b-form>
    </div>  
</template>

<script>
import axios from '../../axios-custom'

export default {
    data() {
        return {
            show: true,
            regionOptions: [],
            form: {
                id: 0,
                name: '',
                region: '',
                population: 0
            }
        };
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
        fetchRegions() {
            return axios.get('/regions.json')
                        .then(res => {
                            const resultArray = [];
                            for (let key in res.data){                                
                                res.data[key].firebaseId = key; // add firebaseId prop to the data for delete/edit purposes
                                resultArray.push(res.data[key]);
                            };

                            this.regionOptions = resultArray.map(d => ({ value: d.name, text: d.name }))
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
        this.fetchRegions()
    }
};
</script>

<style>
</style>
