import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引用element-ui组件
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// 引用github-markdown-css用于渲染markdown文档
// 需要使用的地方添加markdown-body
import 'github-markdown-css'
// 引用fontawesome包
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBlog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBlog)

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
// 使用font-awesome-icon作为标签
app.component('font-awesome-icon', FontAwesomeIcon)
app.config.productionTip = false;
// x
app.mount('#app')