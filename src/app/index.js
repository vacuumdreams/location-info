import Vue from 'vue'
import VueRx from 'vue-rx'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Subject } from 'rxjs/Subject'

Vue.use(VueRx, {
  Observable,
  Subscription,
  Subject,
})

export new Vue({
  el: '#app',
})
