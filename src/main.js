import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
// Vue.directive('click-outside', {
//   bind () {
//       this.event = event => this.vm.$emit(this.expression, event)
//       this.el.addEventListener('click', this.stopProp)
//       document.body.addEventListener('click', this.event)
//   },   
//   unbind() {
//     this.el.removeEventListener('click', this.stopProp)
//     document.body.removeEventListener('click', this.event)
//   },

//   stopProp(event) { event.stopPropagation() }
// })

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
