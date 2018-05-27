<template>
    <div>
        <b-form @submit.stop.prevent="onSubmit" @reset.stop.prevent="resetForm" v-if="show">
            <b-form-group label="ID" label-for="region-create-id" description="ID to identify a region">
                <b-form-input id="region-create-id" type="number" v-model="form.id" required placeholder="Please input an ID">                  
                </b-form-input>
            </b-form-group>
            
            <b-form-group label="Region Name" label-for="region-create-name" description="Region name">
                <b-form-input id="region-create-name" type="text" v-model="form.name" required placeholder="Please input a Region Name">                  
                </b-form-input>
            </b-form-group>
            
            <b-form-group label="Governor's Name" label-for="region-create-governor" description="Region's Governor Name">
                <b-form-input id="region-create-governor" type="text" v-model="form.governor" required placeholder="Please input name of Region's Governor">                  
                </b-form-input>
            </b-form-group>
            
            <b-form-group label="Flag" label-for="region-create-flag" description="Region's Flag">
                <b-form-input id="region-create-flag" type="text" v-model="form.flag" required placeholder="Please upload region's flag">                  
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
            form: {
                id: 0,
                name: '',
                governor: '',
                flag: ''
            }
        };
    },
    methods: {
        onSubmit() {
            axios.post('/regions.json', this.form)
                .then(res => {
                    this.$emit('regionAdded');
                    this.resetForm();
                })
                .catch(error => console.log(error));
        },
        resetForm() {
            this.form.id = 0;
            this.form.name = '';
            this.form.governor = '';
            this.form.flag = '';
        }
    }
};
</script>

<style>
</style>
