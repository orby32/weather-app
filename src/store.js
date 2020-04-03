import Vue from 'vue';
import Vuex from 'vuex';
// import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        key: "fc1b7d428601e38ba9e47391a44ed9a8",
        city: "",
    },
    mutations: {
        updateCity(state, payload) {
            state.city = payload;
        }
    },
    getters: {
        isValid(state) {
            return state.city.length < 3 ? false : true;
          }
        //   isShowCard() {
        //     return this.item.city != '' && !(_.isEmpty(this.item));
        //   }
    }
    
})