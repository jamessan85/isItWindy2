new Vue({
  el: '#wind',
  data: {
    desiredWind: 0,
    location: '',
    theWeather: [],
    glyph: '',
    time: '',
    timeOfDay: true,
    show: false
  }, 
  methods: {
    getWeather: async function() {
      try {
        this.theWeather = [];
        var result = await axios.get('/weather/' + this.location)
        // get the hourly weather
        var hourly = result.data.hourly.data
        // loop of the hourly data results
        for (var i = 0; i < hourly.length; i++) {
          var speedMph = this.convertToMph(hourly[i].windSpeed)
          var time = moment.unix(hourly[i].time).format("HH:mm")
          // if time of day is true run get time from 8 to 20:00
          if (this.timeOfDay == true) {
            if (parseInt(speedMph) < parseInt(this.desiredWind) && time >= "08:00" && time <= "20:00") {
              this.theWeather.push(hourly[i]);
            }
          } else {
            if (parseInt(speedMph) < parseInt(this.desiredWind)) {
              this.theWeather.push(hourly[i]);
            }
          }  
        }
        this.show = true
      } catch (error) {
        console.log(error)
      }
    },
    convertToMph: function(speed) {
      var x = speed / 1.609
      return x.toFixed()
    },
    transformStyle: function(bearing, speed) {
      return {
        transform: `rotate(${bearing - 180}deg)`,
        color: `rgb(37, ${speed}, 150 )`
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
    },
    groupDays: function(time) {
      switch(true) {
        case time.includes("Fri"): 
          return {
            color: "#89C4F4"
          }
        case time.includes("Sat"): 
          return {
            color: "orange"
          }
        case time.includes("Sun"): 
          return {
            color: "#F4D03F"
          }
        case time.includes("Mon"): 
          return {
            color: "green"
          }
        case time.includes("Tue"): 
          return {
            color: "blue"
          }
        case time.includes("Wed"): 
          return {
            color: "indigo"
          }
        case time.includes("Thu"): 
          return {
            color: "violet"
          }
      }
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


