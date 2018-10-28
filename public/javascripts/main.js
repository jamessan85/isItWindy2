new Vue({
  el: '#wind',
  data: {
    desiredWind: '',
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
        console.log(this.theWeather)
        // this.getBearingCurrent(this.theWeather[0].currently.windBearing)
      } catch (error) {
        console.log(error)
      }
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


