<template>
  <div id="app">
    <h1>Vue weather app</h1>
    <input type="text" placeholder="Enter city name" v-model="city" />
    <button
      @click="getWeather"
      class="submit-btn"
      :class="{ disabled: !isValid }"
    >
      Submit
    </button>
    <p>{{ msg }}</p>
    <weather-card v-if="isShowCard" :item="item" />
    <button v-if="isShowCard" @click="clearLocalStorage" class="clear-btn">
      Clear
    </button>
  </div>
</template>

<script>
import WeatherCard from "./components/WeatherCard.vue";
import _ from "lodash";
export default {
  name: "App",
  data() {
    return {
      key: this.$store.state.key,
      msg: "",
      item: {
        temp: "",
        city: "",
        weather: "",
        icon: ""
      }
    };
  },
  computed: {
    isValid() {
      return this.$store.getters.isValid;
    },
    isShowCard() {
      return this.item.city != "" && !_.isEmpty(this.item);
    },
    city: {
      get() {
        return this.$store.state.city;
      },
      set(value) {
        this.$store.commit('updateCity', value)
      }
    }
  },

  methods: {
    getWeather: function() {
      // API call
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.key}`
      )
        .then(response => response.json())
        .then(json => {
          // Get only the relevant data from response
          const { main, weather, name } = json;
          // Assign the data into item object
          this.item = {
            temp: Math.floor(main.temp),
            city: name,
            weather: weather[0].main,
            icon:
              "https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/" +
              weather[0].icon +
              ".svg"
          };
          // Store the object in localStorage
          localStorage.setItem("localItem", JSON.stringify(this.item));
        })
        .catch(() => {
          this.msg = "Please search for a valid city 😩";
        });
      // Clear view
      this.clearView();
    },
    clearView: function() {
      this.item = "";
      this.msg = "";
      this.city = "";
    },
    clearLocalStorage: function() {
      localStorage.clear();
      this.item = {};
    }
  },
  created() {
    // Load the localStorage data (if exist) when component is created
    let localItem = localStorage.getItem("localItem");
    if (localItem) {
      this.item = JSON.parse(localItem);
    }
  },
  components: {
    "weather-card": WeatherCard
  }
};
</script>

<style>
:root {
  --text-light: #fff;
  --text_med: #53627c;
}
* {
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
}
#app {
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: bisque;
}

h1 {
  font-size: 60px;
  text-transform: capitalize;
}

input {
  width: 330px;
  height: 49px;
  border-radius: 2px;
  border: none;
  box-shadow: 0 5px 5px -5px #333;
  padding: 0 10px;
  font-size: 32px;
  color: #2c3e50;
  font-weight: bold;
  background-color: transparent;
  border-bottom: 3px solid lightblue;
  text-transform: capitalize;
}

.submit-btn {
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  padding: 15px 20px;
  margin-left: 15px;
  border-radius: 5px;
  border: none;
  color: var(--text-light);
  background: lightcoral;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}
.submit-btn.disabled {
  pointer-events: none;
  background: #dcdcdc;
  cursor: default;
}
.clear-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  border: 2px solid black;
  font-weight: bold;
  padding: 2px 7px;
  font-size: 14px;
  cursor: pointer;
  background-color: transparent;
  transition: all 0.3s;
}
.clear-btn:hover {
  opacity: 0.8;
}
</style>
