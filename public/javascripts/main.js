new Vue({
  el: '#wind',
  data: {
    desiredWind: '',
    location: '',
    theWeather: [],
    glyph: ''
  }, 
  methods: {
    getBearingCurrent: function(bearing) {
      switch(true) {
        case (bearing >= 348 && bearing <= 22.5): //north
          this.glyph = 'fas fa-arrow-left fa-3x arrow fromN'
          break;
        case (bearing >= 23 && bearing <= 67.5): // North East
          this.glyph = 'fas fa-arrow-left fa-3x arrow fromNE'
          break;
        case (bearing >= 68 && bearing <= 112.5): // East
          this.glyph = 'fas fa-arrow-left fa-3x arrow'
          break;
        case (bearing >= 113 && bearing <= 157.5): // South East
          this.glyph = 'fas fa-arrow-left fa-3x arrow fromSE'
          break;
        case (bearing >= 157 && bearing <= 202.5): // South
          this.glyph = 'fas fa-arrow-left fa-3x arrow fromS'
          break;
        case (bearing >= 203 && bearing <= 247.5):// South West
          this.glyph = 'fas fa-arrow-left fa-3x arrow fromSW'
          break;
        case (bearing >= 248 && bearing <= 302.5):// West
          this.glyph = 'fas fa-arrow-left fa-3x arrow fromW'
          break;
        case (bearing >= 303 && bearing <= 347.5): //North West
          this.glyph = 'fas fa-arrow-left fa-3x arrow fromNW'
          break;
        default:
          this.glyph = "Not-Available"
          break;
      }
    },
    getWeather: async function() {
      try {
        var result = await axios.get('/weather/' + this.location)
        this.theWeather.push(result.data);
        console.log(this.theWeather[0].currently.windBearing)
        this.getBearingCurrent(this.theWeather[0].currently.windBearing)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    
  }
})


