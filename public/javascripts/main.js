new Vue({
  el: '#wind',
  data: {
    desiredWind: 0,
    location: '',
    theWeather: [],
    glyph: '',
    time: ''
  }, 
  methods: {
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
    },
    transformStyle: function(bearing) {
      return {
        transform: `rotate(${bearing - 180}deg)`,
      }
    },
    transformSpeed: function(windSpeed) {
      if (windSpeed > this.desiredWind) {
        return {
          color: "red",
          'font-weight': "bold"
        }
      }
    },
    showNiceTime: function(time) {
      hourly = moment.unix(time).format("ddd HH:mm")
      return hourly
    }
  },
  computed: {
    transformClass: function() {
      return {
        "fas fa-arrow-up fa-3x": true
      }
    }
  }
})


