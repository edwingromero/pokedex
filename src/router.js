import Vue from 'vue'
import Router from 'vue-router'
import PokemonesView from '@/views/Pokemones'
import DetalleView from '@/views/Detalle'
import AcercaView from '@/views/Acerca'
import ContactoView from '@/views/Contacto'

Vue.use(Router)

export default new Router({
  routes:[
    {
      path:'/',
      name:'Pokemones',
      component:PokemonesView
    },
    {
      path:'/detalle/:id',
      name:'detalleRuta',
      component:DetalleView
    },
    {
      path:'/acerca',
      name:'acercaRuta',
      component:AcercaView
    },
    {
      path:'/contacto',
      name:'contactoRuta',
      component:ContactoView
    }
  ],
  linkExactActiveClass: 'active',
})
