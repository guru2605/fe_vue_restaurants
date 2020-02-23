import Vue from 'vue'
import Router from 'vue-router'
import Hotels from '@/components/Hotels'
import AddNewHotel from '@/components/AddNewHotel'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hotels',
      name: 'Hotels',
      component: Hotels
    },
    {
      path:'/add_restarant',
      name:'AddNewRestaurant',
      component:AddNewHotel
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    }
  ]
})
