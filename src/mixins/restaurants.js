export default {
    methods: {
        async getAllHotels(params) {
            return new Promise((resolve,reject) => {
                this.$http.post('/hotels', params)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(response.reason)
                })
            }) 
        }
    }
}