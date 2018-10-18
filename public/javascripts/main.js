new Vue({
  el: '#wind',
  data: {
    desiredWind: '',
    location: '',
    theWeather: []
  },
  mounted() {
    axios.get('/weather')
      .then(response => {
      this.theWeather.push(response.data);
    })
  }, 
  methods: {
   
  }
})


