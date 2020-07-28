<template>
  <div>
    <div class="card mb">
      <img class="card-img-top" :src="'static/pokemones/images/'+pokemon.num+'.png'" alt="Card image cap">
      <div class="card-body mb">
        <h5 class="card-title">{{pokemon.name}}</h5>
        <span>#{{pokemon.num}}</span>
        <p class="card-text">
          <span
            v-for="type in pokemon.type" v-bind:key="type"
            class="badge"
            :class="classTypePokemon[`${type}`]">
            {{type}}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name:'PokemonCardComponent',
  props:{
    pokemon:{
      type:Object,
      required:true
    }
  },
  data(){
    return {
      classTypePokemon: {
        "Normal":"badge-primary",
        "Fighting":"badge-secondary",
        "Flying":"badge-success",
        "Poison":"badge-danger",
        "Ground":"badge-warning",
        "Rock":"badge-info",
        "Bug":"badge-dark",
        "Ghost":"badge-dark",
        "Steel":"badge-primary",
        "Fire":"badge-secondary",
        "Water":"badge-danger",
        "Grass":"badge-success",
        "Electric":"badge-warning",
        "Psychic":"badge-info",
        "Ice":"badge-dark",
        "Dragon":"badge-danger",
      }
    }
  },
  methods: {
    getClassTag:function(){

    }
  },
  computed: {
    imagenPokemon: function(){
      var number = this.pokemon.id
      var width = 3;
      width -= number.toString().length;
      if ( width > 0 )
      {
        return  new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
      }
      return number + ""; // siempre devuelve tipo cadena
    }
  }
}
</script>

<style lang="">
  span{
    margin-right: 5px;
  }
  .card{
    padding: 1em;
  }
  .card.mb img{
    cursor:pointer;
  }

  .card-title{
    cursor:pointer;
  }
</style>
