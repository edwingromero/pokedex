<template>
  <div>
    <default-layout>
      <template slot="content">
        <div class="row">
          <div class="col-12">
            <filter-view  @filterText="filter = $event"></filter-view>
          </div>
          <div class="col-12">
            <div class="form-check form-check-inline" v-for="type in types" v-bind:key="type.name" >
              <input
                :value="type.name"
                v-model="tiposSeleccionados"
                class="form-check-input"
                type="checkbox" :id="'inlineCheckbox'+type.name"
                >
              <label class="form-check-label" :for="'inlineCheckbox'+type.name">{{type.name}}</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3"
            v-for="item in filteredPokemones" v-bind:key="item.id"
            @click.prevent="goToDetail(item)"
            >
            <pokemon-card-component :pokemon="item"></pokemon-card-component>
          </div>
        </div>
      </template>

    </default-layout>
  </div>
</template>

<script>
import DefaultLayout from '@/layouts/default';
import PokemonCardComponent from '@/components/PokemonCard'
import FilterView from '@/views/Filter'
import _ from 'lodash'

export default {
  components: {
    DefaultLayout,
    PokemonCardComponent,
    FilterView
  },
  data(){
    return{
      pokemones:[],
      filter:'',
      types:[
        {name:'Normal',val:false},
        {name:'Fighting',val:true},
        {name:'Flying',val:true},
        {name:'Poison',val:true},
        {name:'Ground',val:true},
        {name:'Rock',val:true},
        {name:'Bug',val:true},
        {name:'Ghost',val:true},
        {name:'Fire',val:true},
        {name:'Water',val:true},
        {name:'Grass',val:true},
        {name:'Electric',val:true},
        {name:'Psychic',val:true},
        {name:'Ice',val:true},
        {name:'Dragon',val:true}
      ],
      tiposSeleccionados:[]
    }
  },
  mounted() {
    let vue = this;
    this.$http.get('static/pokemones/pokedex.json')
    .then(function (response) {
      vue.pokemones = response.data;
    })
  },
  computed:{
    filteredPokemones(){
      var that = this;
      return this.pokemones
        .filter(function(pokemon) { // filter by pokemon type (checkboxes)
          if (that.tiposSeleccionados.length === 0) return true; // no checked checkbox means no filter
          return pokemon.type.find(function(type){ // for each pokemon type we try to find if it's included in the array of tiposSeleccionados
              return that.tiposSeleccionados.includes(type);
          });
        })
        .filter(item => {
          return _.includes(item.name.toLowerCase(), this.filter.toLowerCase()) //USANDO LODASH
        })
    }
  },
  methods:{
    goToDetail(pokemon){
      this.$router.push({
        params:{
          id: pokemon.num
        },
        name:'detalleRuta'//EL NOMBRE DE LA RUTA
      })
    }
  }
}
</script>

<style lang="">
  .card{
    margin:10px 0
  }


</style>
