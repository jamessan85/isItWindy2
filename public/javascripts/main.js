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
        var hourly = result.data.hourly.data
        for (var i = 0; i < hourly.length; i++) {
          var speedMph = this.convertToMph(hourly[i].windSpeed)
          if (parseInt(speedMph) < parseInt(this.desiredWind)) {
            this.theWeather.push(hourly[i]);
          }
        }
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
      if (parseInt(windSpeed) > parseInt(this.desiredWind)) {
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


