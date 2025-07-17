import { createRouter, createWebHashHistory } from 'vue-router'
import ErrorCodeLookup from '../views/ErrorCodeLookup.vue'
import RefrigerantChart from '../views/RefrigerantChart.vue'
import CoolingLoadCalculator from '../views/CoolingLoadCalculator.vue'

const routes = [
  { path: '/', component: ErrorCodeLookup },
  { path: '/refrigerant', component: RefrigerantChart },
  { path: '/calculator', component: CoolingLoadCalculator },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router