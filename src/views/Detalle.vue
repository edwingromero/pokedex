<template>
  <div>
    <default-layout>
      <template slot="content">
        <div class="row">
          <div class="offset-1 col-10">
            <div class="row">
              <div class="col-md-4 grid-margin stretch-card">
                <div class="card">
                  <div class="profile-card">
                    <div class="profile-header">
                      <div id="evolution">
                        <div class="content_evolution" v-if="pokemon.prev_evolution">
                        <h5>Prev. Evolución</h5>
                        <div @click="goToDetail(item.num)" class="evolution" v-for="item in pokemon.prev_evolution " v-bind:key="item.num">
                          <img :src="`static/pokemones/thumbnails/${item.num}.png`" :alt="item.name">
                          <span class="badge badge-info">{{item.name}}</span>
                        </div>
                      </div>
                      </div>
                      <div class="cover-image">
                        <img :src="`static/pokemones/images/${pokemon.num}.png`" class="img img-fluid">
                      </div>
                    </div>
                    <div class="profile-content">
                      <div class="profile-name">{{pokemon.name}}</div>
                    </div>
                    <div id="evolution">
                      <div
                      class="content_evolution"
                      v-if="pokemon.next_evolution">
                        <h5>Sig. Evolución</h5>
                        <div @click="goToDetail(item.num)" class="evolution" v-for="item in pokemon.next_evolution " v-bind:key="item.num">
                            <img :src="`static/pokemones/thumbnails/${item.num}.png`" :alt="item.name">
                            <span class="badge badge-info">{{item.name}}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-8 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <p class="card-description">Caracteristicas</p>
                    <ul class="about">
                      <li class="about-items">
                        <span class="about-item-name">Tipo:</span>
                        <span class="about-item-detail">
                          <span
                          class="badge"
                          :class="classTypePokemon[`${tipo}`]"
                          v-for="tipo in pokemon.type" v-bind:key="tipo">{{tipo}}</span>
                        </span>
                      </li>
                      <li class="about-items">
                        <span class="about-item-name">Nombre Hembra:</span>
                        <span class="about-item-detail">{{pokemon.candy}}</span>
                      </li>
                      <li class="about-items">
                        <span class="about-item-name">Altura:</span>
                        <span class="about-item-detail">{{pokemon.height}}</span>
                      </li>
                      <li class="about-items">
                        <span class="about-item-name">Peso:</span>
                        <span class="about-item-detail">{{pokemon.weight}}</span>
                      </li>
                      <li class="about-items">
                        <span class="about-item-name">Debilidades:</span>
                        <span class="about-item-detail">
                          <span
                          class="badge badge-danger"
                          v-for="item in pokemon.weaknesses" v-bind:key="item">{{item}}</span>
                        </span>
                      </li>
                    </ul>
                    <p class="card-description">Pokemon Randoms</p>
                    <ul class="about">
                      <li class="about-items li-random" v-for="item in random" v-bind:key="`ran-${item.num}`+generateNumber()">
                        <span @click="goToDetail(item.num)">
                          <img :src="`static/pokemones/sprites/${item.num}MS.png`" alt="">
                          {{item.name}}
                        </span>

                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </template>
    </default-layout>
  </div>
</template>

<script>
import DefaultLayout from '@/layouts/default';

export default {
  components:{
    DefaultLayout
  },
  created() {
    let vue = this;
    vue.id = vue.$route.params.id;
    this.$http.get('static/pokemones/pokedex.json')
      .then(function (response) {
        vue.pokemones = response.data;

        vue.searchPokemon();
      });
  },
  mounted() {

  },
  data() {
    return {
      pokemones:[],
      pokemon : {},
      random:[],
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
        "Dark":"badge-dark",
        "Fairy":"badge-light"
      }
    }
  },
  methods: {
    goToDetail(num){
      this.$router.push({
        params:{
          id: num
        },
        name:'detalleRuta'//EL NOMBRE DE LA RUTA
      })
      //this.searchPokemon()
    },
    searchPokemon(){
      let vue = this;
      vue.random = [];
      vue.pokemon = vue.pokemones.find(function(item){ //BUSCA EL POKEMON
        return item.num == vue.$route.params.id;
      });

      for (let index = 1; index <=10; index++) { //ESCOGEMOS POKEMONES DE MANERA RANDOM
        let ran = vue.generateNumber();
        vue.random.push(
          vue.pokemones.find(function(item){
            return item.num == ran
          })
        );
      }
    },
    generateNumber: function () {
      let num = Math.floor(Math.random()*(151-1+1)+1);
      return  this.zfill(num);
    },
    zfill(number) {
      var width = 3;
      var numberOutput = Math.abs(number); /* Valor absoluto del número */
      var length = number.toString().length; /* Largo del número */
      var zero = "0"; /* String de cero */

      if (width <= length) {
          if (number < 0) {
              return ("-" + numberOutput.toString());
          } else {
              return numberOutput.toString();
          }
      } else {
          if (number < 0) {
              return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
          } else {
              return ((zero.repeat(width - length)) + numberOutput.toString());
          }
      }
    }
  },
  watch: {
    /*$route() { //ONSERVAR LOS CAMBIOS EN LA RUTA
        this.searchPokemon()
    }*/
},
}
</script>

<style lang="">
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid #e7eaed;
    border-radius: 0;
}
.card .card-description {
    margin-bottom: .875rem;
    font-weight: 400;
    color: #76838f;
}
.profile-header {
	width: 100%;
	position: relative;
}
.cover-image {
	width: 100%;
  padding: 5px;
}
.user-image {
	position: absolute;
	height: 80px;
	width: 80px;
	border-radius: 50%;
	bottom: -50%;
	left: 50%;
	/* top: 50%; */
	transform: translate(-50%, -50%);
	z-index: 5;
}
.user-image img {
	height: 80px;
	width: 80px;
	border-radius: 50%;
	top: -40px;
	border: 5px solid #777;
}

.profile-card .profile-name {
	font-size: 1.2rem;
	color: #3249b9;
	font-weight: 600;
	text-align: center;
}
.profile-card .profile-designation {
	font-size: 13px;
	color: #777;
	text-align: center;
}
.profile-card .profile-description {
	padding: 10px;
	font-size: 13px;
	color: #777;
	margin: 5px 0px;
	background-color: #F1F2F3;
	border-radius: 5px;
}
.profile-card ul.profile-info-list {
	padding: 0;
	margin: 10px 0;
	list-style: none;
	font-size: 1rem;
	font-weight: 500;
	color: #777;
}
.profile-card ul.profile-info-list a {
	text-decoration: none;
	color:inherit;
}
.profile-card a.profile-info-list-item {
	margin: 10px 0;
	padding:15px;
	background-color: #F1F2F3;
	display: block;
	 -webkit-transition: all .5s ease-in-out;
    -o-transition: all .5s ease-in-out;
    transition: all .5s ease-in-out;

}
.profile-card a.profile-info-list-item:hover {
    background-color: #9E9E9E;
    color: white;
	 -webkit-transition: all .5s ease-in-out;
    -o-transition: all .5s ease-in-out;
    transition: all .5s ease-in-out;

}
.profile-card a.profile-info-list-item  i {
	padding: 10px;

}
ul.about {
    list-style: none;
    color: black;
	padding: 0;
}
li.about-items {
    margin: 10px;
    font-size: 0.9rem;
    /* font-family: sans-serif; */
    /* font-weight: 400; */
}
li.about-items i {
color:#607d8b;
}
span.about-item-name {
    width: 100px;
    display: inline-flex;
	    margin-left: 10px;
}
span.about-item-detail {
    display: inline-flex;
    width: calc(100% - 160px);
}
span.about-item-detail > button{
  margin-right: 10px;
}
.btn.btn-icon {
    width: 40px;
    height: 40px;
    padding: 0;
}
.btn.btn-rounded {
    border-radius: 50px;
}
a.about-item-edit {
    float: right;
}

#evolution{
  text-align: center;
  border-radius: 3%;
  padding: 1%;
}
#evolution h5{
  color:#76838f;
  font-size:14px;
}
.content_evolution{

  padding:3%;
}
.evolution{
  border:1px solid #e7eaed;
  border-radius: 5%;
  width: 60%;
  margin-left:2%;
  padding: 3%;
  display: inline-block;
  cursor:pointer;
}
.evolution img{
  max-width: 100%;
}
.badge{
  margin-left:2px;
}

.li-random{
  display: inline-block;
  width: 40%;
  margin:2px !important;
}

.li-random span{
  cursor:pointer;
}
</style>
