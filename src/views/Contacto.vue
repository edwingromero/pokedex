<template>
  <div>
    <default-layout>
      <template slot="content">
        <div class="row">
          <div class="offset-3 col-md-6">
            <h4>CONTACTO</h4>

            <form
              autocomplete="off"
              action="https://vuejs.org/"
              method="post"
              @submit="checkForm"
              novalidate="true">
              <div class="form-group">
                <label for="nombres">Nombres</label>
                <input type="text" class="form-control" v-model="$v.nombres.$model" :class="{'is-invalid':$v.nombres.$error,'is-valid':!$v.nombres.$invalid}">
                <div v-if="!$v.nombres.$invalid" class="valid-feedback">
                  Completado
                </div>
                <div class="invalid-feedback">
                  <span v-if="!$v.nombres.required">Es requerido</span>
                  <span v-if="!$v.nombres.minLength">Mínimo 6 caracteres</span>
                </div>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="text" class="form-control" v-model="$v.email.$model" :class="{'is-invalid':$v.email.$error,'is-valid':!$v.email.$invalid}">
                <div v-if="!$v.email.$invalid" class="valid-feedback">
                  Completado
                </div>
                <div class="invalid-feedback">
                  <span v-if="!$v.email.required">Es requerido</span>
                  <span v-if="!$v.email.email">Email invalido</span>
                </div>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary btn-md">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </template>
    </default-layout>
  </div>
</template>

<script>
import DefaultLayout from '@/layouts/default'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  name:'Contacto',
  components:{
    DefaultLayout
  },
  data(){
    return{
      nombres:'',
      email:''
    }
  },
  validations: {
    nombres: {
      required,
      minLength: minLength(6)
    },
    email: {
      required,
      email
    }
  },
  methods: {
    checkForm(e){
      this.$v.$touch()
      e.preventDefault();
    }
  },
}
</script>
