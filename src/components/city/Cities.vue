<template>
    <div>
        <h1>Cities</h1>

        <!-- Button to open up ADD modal box -->
        <b-button variant="primary" @click.stop="showCreateModal = true">+ New City</b-button>
        
        <!-- Table Control -->
        <b-container fluid>
            <b-row>                
                <b-col md="6" class="my-1">                    
                    <b-form-group horizontal label="Filter" class="mb-0">
                        <b-input-group>
                            <b-form-input v-model="filter" placeholder="Type to Search" />
                            <b-input-group-append>
                                <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>                
                <b-col md="6" class="my-1">
                    <b-form-group horizontal label="Per page" class="mb-0">
                        <b-form-select :options="pageOptions" v-model="perPage" />
                    </b-form-group>
                </b-col>
            </b-row>
        </b-container>

        <!-- The Table -->
        <b-table show-empty stacked="md" 
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :current-page="currentPage"
            :per-page="perPage"
            :items="items"
            :fields="fields">
            <template slot="actions" slot-scope="row">

                <!-- Button to open up EDIT, DELETE modal box -->
                <b-button size="sm" variant="warning" @click.stop="openEditModal(row.item)">Edit</b-button>
                <b-button size="sm" variant="danger" @click.stop="remove(row.item.id)">Delete</b-button>

                <!-- Button to open up Details Row -->
                <b-button size="sm" variant="link" @click.stop="row.toggleDetails">
                    {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                </b-button>

            </template>
            
            <!-- Reserved slot for row details -->
            <!-- will be printed for every row -->
            <template slot="row-details" slot-scope="row">
                <b-card class="text-left">
                    <p>Name: {{ row.item.name }}</p>
                    <p>Population: {{ row.item.population }}</p>
                </b-card>
            </template>
        </b-table>

        <!-- Table Pagination -->
        <b-row>
            <b-col md="6" class="my-1">
                <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
            </b-col>
        </b-row>
        
        <!-- MODAL BOXES -->        
        <!-- ADD modal box (pop-up) -->    
        <!-- id is needed because we use v-b-modal, which will identify the modal by id, to open up this modal -->
        <b-modal v-model="showCreateModal" title="Add New City">
            <app-city-create @cityAdded="refresh"></app-city-create>
        </b-modal>

        <!-- EDIT modal box (pop-up) -->    
        <b-modal v-model="showEditModal" :title="editModalTitle">
            <app-city-edit :editData="editData"></app-city-edit>
        </b-modal>
    </div>
</template>

<script>
import axios from '../../axios-custom'
import CityCreate from './CityCreate'
import CityEdit from './CityEdit'
import { tableProps, modalProps } from '../../defaults'

export default {
    data() {
        return {
            ...tableProps,
            ...modalProps,
            fields: [
                { key: 'id', sortable: false },
                { key: 'name', sortable: true },
                { key: 'population', sortable: true },
                { key: 'actions', label: 'Actions' }
            ],
        }
    },
    methods: {
        openEditModal(item) {
            this.editModalTitle = `Edit ${item.name}`;
            this.editData = item;

            // open up edit modal box
            this.showEditModal = !this.showEditModal; 
        },
        fetch() {
            return axios.get('/cities.json')
                        .then(res => {
                            const resultArray = [];
                            for (let key in res.data){
                                resultArray.push(res.data[key]);
                            };
                            this.items = resultArray;
                            this.totalRows = this.items.length;
                        })
                        .catch(error => console.log(error));
        },
        refresh() {
            // refresh table data then close modal box
            this.fetch().then(res => this.showCreateModal = this.showEditModal = false );
        },
        remove(id){
            console.log(id);
        }
    },
    components: {
        appCityCreate: CityCreate,
        appCityEdit: CityEdit
    },
    created() {
        this.fetch();
    }
}
</script>
