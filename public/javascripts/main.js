new Vue({
  el: '#wind',
  data: {
    desiredWind: '',
    location: '',
    theWeather: [],
    glpyh: ''
  },
  async mounted() {
    try {
      var result = await axios.get('/weather')
      this.theWeather.push(result.data);
      this.getBearingCurrent(result.data.currently.windBearing)
    } catch (error) {
      console.log(error)
    }
  }, 
  methods: {
    getBearingCurrent: function(bearing) {
      switch(true) {
        case (bearing >= 347.5 && bearing <= 22.5):
          this.glyph = '<i class="fas fa-arrow-left"></i>'
          break;
        case (bearing >= 23 && bearing <= 67.5):
          this.theWeather[0].currently.windBearing = "North East"
          break;
        case (bearing >= 68 && bearing <= 112.5):
          this.theWeather[0].currently.windBearing = '<i class="fas fa-arrow-left"></i>'
          break;
        case (bearing >= 68 && bearing <= 112.5):
          this.theWeather[0].currently.windBearing = '<i class="fas fa-arrow-left"></i>'
          break;
        case (bearing >= 113 && bearing <= 157.5):
          this.glyph = 'fas fa-arrow-left fa-3x'
          break;
        case (bearing >= 158 && bearing <= 202.5):
          this.theWeather[0].currently.windBearing = "South"
          break;
        case (bearing >= 68 && bearing <= 112.5):
          this.theWeather[0].currently.windBearing = '<i class="fas fa-arrow-left"></i>'
          break;
        case (bearing >= 68 && bearing <= 112.5):
          this.theWeather[0].currently.windBearing = '<i class="fas fa-arrow-left"></i>'
          break;
        default:
          bearing = "Not Available"
          break;
      }
    }
  },
  computed: {
    
  }
})


