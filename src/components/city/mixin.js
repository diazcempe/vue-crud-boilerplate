import axios from '../../axios-custom'

export const formMixin = {
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
        populateRegionDropdown() {
            return axios.get('/regions.json')
                        .then(res => {
                            const resultArray = [];
                            for (let key in res.data){                                
                                res.data[key].firebaseId = key; // add firebaseId prop to the data for delete/edit purposes
                                resultArray.push(res.data[key]);
                            };
                            
                            this.regionOptions = resultArray.map(d => ({ value: d.name, text: d.name }))
                            
                            // Set default selected value of the dropdown to be the first record 
                            if (resultArray.length > 0) this.form.region = resultArray[0].name; 
                        })
                        .catch(error => console.log(error));
        }
    }
};