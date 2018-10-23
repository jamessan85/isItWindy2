new Vue({
  el: '#wind',
  data: {
    desiredWind: '',
    location: '',
    theWeather: [],
    glpyh: ''
  }, 
  methods: {
    getBearingCurrent: function(bearing) {
      switch(true) {
        case (bearing >= 348 && bearing <= 22.5): //north
          this.glyph = 'fas fa-arrow-left fa-3x arrow'
          break;
        case (bearing >= 23 && bearing <= 67.5): // North East
          this.glyph = "North East"
          break;
        case (bearing >= 68 && bearing <= 112.5): // East
          this.glyph = 'fas fa-arrow-left fa-3x arrow'
          break;
        case (bearing >= 113 && bearing <= 157.5): // South East
          this.glyph = 'fas fa-arrow-left fa-3x arrow'
          break;
        case (bearing >= 157 && bearing <= 202.5): // South
          this.glyph = 'fas fa-arrow-left fa-3x arrow'
          break;
        case (bearing >= 203 && bearing <= 247.5):// South West
          this.glyph = "South"
          break;
        case (bearing >= 248 && bearing <= 302.5):// West
          this.glyph = 'fas fa-arrow-left fa-3x arrow'
          break;
        case (bearing >= 303 && bearing <= 347.5): //North West
          this.glyph = 'fas fa-arrow-left fa-3x arrow'
          break;
        default:
          bearing = "Not Available"
          break;
      }
    },
    getWeather: async function() {
      try {
        var result = await axios.get('/weather/' + this.location)
        console.log(result);
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    
  }
})


