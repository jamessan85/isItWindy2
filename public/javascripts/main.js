new Vue({
  el: '#wind',
  data: {
    desiredWind: 0,
    location: '',
    theWeather: [],
    glyph: '',
    message: ''
  }, 
  methods: {
    getBearingCurrent: function(bearing) {
      x = document.getElementsByClassName("fas")
      console.log(x.length);
      for(var i = 0; i < x.length; i++) {
        console.log(x[i])
        x[i].style.transform = `rotate(${-bearing}deg)`
      }
      
      // switch(true) {
      //   case (bearing >= 348 && bearing <= 22.5): //north
      //     this.glyph = 'fas fa-arrow-left fa-3x arrow fromN'
      //     break;
      //   case (bearing >= 23 && bearing <= 67.5): // North East
      //     this.glyph = 'fas fa-arrow-left fa-3x arrow fromNE'
      //     break;
      //   case (bearing >= 68 && bearing <= 112.5): // East
      //     this.glyph = 'fas fa-arrow-left fa-3x arrow'
      //     break;
      //   case (bearing >= 113 && bearing <= 157.5): // South East
      //     this.glyph = 'fas fa-arrow-left fa-3x arrow fromSE'
      //     break;
      //   case (bearing >= 157 && bearing <= 202.5): // South
      //     this.glyph = 'fas fa-arrow-left fa-3x arrow fromS'
      //     break;
      //   case (bearing >= 203 && bearing <= 247.5):// South West
      //     this.glyph = 'fas fa-arrow-left fa-3x arrow fromSW'
      //     break;
      //   case (bearing >= 248 && bearing <= 302.5):// West
      //     this.glyph = 'fas fa-arrow-left fa-3x arrow fromW'
      //     break;
      //   case (bearing >= 303 && bearing <= 347.5): //North West
      //     this.glyph = 'fas fa-arrow-left fa-3x arrow fromNW'
      //     break;
      //   default:
      //     this.glyph = "Not-Available"
      //     break;
      // }
    },
    getWeather: async function() {
      try {
        this.theWeather = [];

        var result = await axios.get('/weather/' + this.location)

        this.theWeather.push(result.data);

        if ( parseInt(this.desiredWind) >= this.convertToMph(this.theWeather[0].currently.windSpeed) ) {
          this.message = "You can go out"
        } else {
          this.message = "In the garage"
        }

        this.getBearingCurrent(this.theWeather[0].currently.windBearing)
      } catch (error) {
        console.log(error)
      }
    },
    convertToMph: function(speed) {
      var x = speed / 1.609
      return x.toFixed()
    }
  },
  computed: {
    
  }
})


