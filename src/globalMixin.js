import axios from './axios-custom'

export const tableMixin = {    
    data() {
        return {
            totalRows: 0,
            items: [],
            currentPage: 1,
            perPage: 5,
            sortBy: null,
            sortDesc: false,
            filter: null,
            pageOptions: [ 5, 10, 15 ]
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
        refresh(url) {
            // refresh table data then close modal box
            this.populateTable(url).then(res => this.showCreateModal = this.showEditModal = false );
        },
        populateTable(url) {
            return axios.get(url)
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
        }
    }
}

export const modalPropsMixin = {
    data() {
        return {
            showCreateModal: false,
            showEditModal: false,
            showDeleteModal: false,
            idToEdit: '',
            editModalTitle: '',
            deleteSubject: '',
            idToDelete: 0
        }
    }
}