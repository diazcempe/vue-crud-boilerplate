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
        fetchRegionDropdown() {
            return axios.get('/regions.json')
                        .then(res => {
                            const resultArray = [];
                            for (let key in res.data){                                
                                res.data[key].firebaseId = key; // add firebaseId prop to the data for delete/edit purposes
                                resultArray.push(res.data[key]);
                            };
                            
                            this.regionOptions = resultArray.map(d => ({ value: d.name, label: d.name }))
                            
                            // Set default selected value of the dropdown to be the first record 
                            if (resultArray.length > 0) this.form.region = resultArray[0].name; 
                        })
                        .catch(error => console.log(error));
        },        
        // Async AJAX Dropdown search
        onRegionSearch(search, loading) {   
            loading(true);
            axios.get('/regions.json?orderBy="name"&startAt="' + search + '"&endAt="' + search + '\uf8ff' + '"')
                .then(res => {
                    const resultArray = [];
                    for (let key in res.data){                                
                        res.data[key].firebaseId = key; // add firebaseId prop to the data for delete/edit purposes
                        resultArray.push(res.data[key]);
                    };

                    this.regionOptions = resultArray.map(region => ({value: region.name, label: region.name }));
                    loading(false);
                })
        },        
        // Hack to return only the value to v-model. Since default returning value is an object.
        onChange(obj) {
            if (obj.value != undefined) this.form.region = obj.value;
        }
    }
};