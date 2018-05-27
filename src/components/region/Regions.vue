<template>
    <b-container fluid>
        <h1>Regions</h1>
        <br>
        
        <!-- Table Control -->
        <b-container fluid>
            <b-row>                       
                <b-col md="4" class="my-1">
                    <b-input-group>
                        <b-form-input v-model="filter" placeholder="Type to Search" />
                        <b-input-group-append>
                            <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>  
                <b-col md="7" class="my-1"></b-col>
                <b-col md="1" class="my-1 float-right">     
                    <!-- Button to open up ADD modal box -->
                    <b-button variant="success" size="md" @click.stop="showCreateModal = true">+ New Region</b-button>
                </b-col>       
            </b-row>
        </b-container>
        
        <br>
        <!-- The Table -->
        <b-table show-empty hover outlined stacked="md"
            :items="items"
            :fields="fields"
            :filter="filter"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :current-page="currentPage"
            :per-page="perPage">
            <template slot="actions" slot-scope="row">

                <!-- Button to open up EDIT, DELETE modal box -->
                <b-button size="sm" variant="outline-info" @click.stop="openEditModal(row.item.firebaseId, row.item.name)">Edit</b-button>
                <b-button size="sm" variant="outline-danger" @click.stop="openDeleteModal(row.item.firebaseId, row.item.name)">Delete</b-button>

                <!-- Button to open up ROW DETAILS -->
                <b-button size="sm" variant="link" @click.stop="row.toggleDetails">
                    {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                </b-button>

            </template>
            
            <!-- Reserved slot for ROW DETAILS. Will be printed for every row. -->
            <template slot="row-details" slot-scope="row">
                <b-card class="text-left">
                    <p>Region Name: {{ row.item.name }}</p>
                    <p>Governor: {{ row.item.governor }}</p>
                </b-card>
            </template>
        </b-table>

        <!-- Table Pagination -->
        <b-row>
            <b-col md="1" class="my-1">
                <b-form-select :options="pageOptions" v-model="perPage" />
            </b-col>
            <b-col md="6" class="my-1">
                <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
            </b-col>
        </b-row>
        
        <!-- MODAL BOXES -->        
        <!-- ADD modal box (pop-up) -->    
        <b-modal v-model="showCreateModal" title="Add New Region" hide-footer>
            <app-region-create @regionAdded="refresh"></app-region-create>
        </b-modal>

        <!-- EDIT modal box (pop-up) -->    
        <b-modal v-model="showEditModal" :title="editModalTitle" hide-footer>
            <app-region-edit :idToEdit="idToEdit" @regionEdited="refresh"></app-region-edit>
        </b-modal>
        
        <!-- DELETE modal box (pop-up) -->    
        <b-modal v-model="showDeleteModal" @ok="remove(idToDelete)" hide-header>
            Are you sure you want to delete {{ deleteSubject }} region ?
        </b-modal>
    </b-container>
</template>

<script>
import axios from '../../axios-custom'
import RegionCreate from './RegionCreate'
import RegionEdit from './RegionEdit'
import { tableProps, modalProps } from '../../defaults'

export default {
    data() {
        return {
            ...tableProps,
            ...modalProps,
            fields: [
                { key: 'id', sortable: false },
                { key: 'name', sortable: true },
                { key: 'governor', sortable: true },
                { key: 'flag', sortable: true },
                { key: 'actions', label: 'Actions' }
            ],
        }
    },
    methods: {
        openEditModal(id, name) {
            this.editModalTitle = `Edit ${name}`;
            this.idToEdit = id;

            // open up edit modal box
            this.showEditModal = !this.showEditModal; 
        },        
        openDeleteModal(id, name) {
            this.deleteSubject = name;
            this.idToDelete = id;

            // open up delete modal box
            this.showDeleteModal = !this.showDeleteModal; 
        },
        fetch() {
            return axios.get('/regions.json')
                        .then(res => {
                            const resultArray = [];
                            for (let key in res.data){                         
                                res.data[key].firebaseId = key; // add firebaseId prop to the data for delete/edit purposes
                                resultArray.push(res.data[key]);
                            };

                            this.items = resultArray;
                            this.totalRows = this.items.length; // for table pagination
                        })
                        .catch(error => console.log(error));
        },
        refresh() {
            // refresh table data then close modal box
            this.fetch().then(res => this.showCreateModal = this.showEditModal = false );
        },
        remove(firebaseId){
            axios.delete(`/regions/${firebaseId}.json`)
                .then(res => this.fetch())
                .catch(error => console.log(error))
        }
    },
    created() {
        this.fetch();
    },
    components: {
        appRegionCreate: RegionCreate,
        appRegionEdit: RegionEdit
    }
}
</script>
