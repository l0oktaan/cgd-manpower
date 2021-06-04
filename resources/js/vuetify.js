import Vue from 'vue'
import Vuetify from 'vuetify'
import { Ripple } from 'vuetify/lib/directives'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify,{
    directives: {
      Ripple
    }
  });

export default new Vuetify({
    iconfont: "mdi",
    theme: {
        themes: {
            light: {
                primary: '#3f51b5',
                secondary: '#696969',
                accent: '#8c9eff',
                error: '#b71c1c',
            },
        },
    },
})
