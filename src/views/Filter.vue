<template>
  <div>
    <form class="card card-sm">
      <div class="card-body row no-gutters align-items-center p-0">
        <div class="col-auto">
          <i class="fas fa-search h4 text-body"></i>
        </div>
        <!--end of col-->
        <div class="col">
          <input
          class="form-control form-control-lg form-control-borderless"
          type="search"
          placeholder="Buscar tu pokemon favorito"
          v-model="filter"
          v-on:keyup="keymonitor"
          >
        </div>
        <!--end of col-->

          <!--end of col-->
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filter:''
    }
  },
  mounted() {
    },
  methods: {
    keymonitor: function(event) {
      this.$emit('filterText',this.filter);
    }
  },
}
</script>
