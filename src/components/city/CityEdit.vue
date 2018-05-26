<template>
    <div class="text-left">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
        </b-form>

        {{ editData }}
    </div>  
</template>

<script>
export default {
    props: {
        editData: {
            type: Object
        }
    },
    data() {
        return {
            form: {
                id: 0,
                name: '',
                population: 0
            },
            show: true
        };
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            console.log(this.form);
        },
        onReset(evt) {
            evt.preventDefault();
            this.resetForm();

            /* Trick to reset/clear native browser form validation state */
            this.show = false;
            this.$nextTick(() => {
              this.show = true;
            });
        },
        resetForm() {            
            this.form.id = 0;
            this.form.name = '';
            this.form.population = 0;
        }
    },
    updated() {
        // this.form.id = this.editData.id;
        // this.form.name = this.editData.name;
        // this.form.population = this.editData.population;\
    }
};
</script>

<style>
</style>
