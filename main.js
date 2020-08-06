import Vue from 'vue'
import App from './App'
import store from "./store"
Vue.config.productionTip = false
// 引入全局组件
import divider from '@/components/common/divider.vue'
Vue.component('divider', divider)
import noThing from '@/components/common/no-thing.vue'
Vue.component('no-thing', noThing)
// 引入全局加载动画
// import loading from "@/components/common/loading.vue"
import loadingPlus from "@/common/mixin/loading-plus.vue"
Vue.component('loading', loadingPlus)
import http from '@/common/lib/request.js'
App.mpType = 'app'
Vue.prototype.$store = store
Vue.prototype.$http = http
const app = new Vue({
	store,
	...App
})
app.$mount()
