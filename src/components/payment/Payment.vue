<template>
  <div>
    <h5>Basic</h5>
    <Dropdown
      v-model="selectedCity1"
      :options="cities"
      optionLabel="name"
      placeholder="Select a City"
    />

    <h5>Editable</h5>
    <Dropdown
      v-model="selectedCity2"
      :options="cities"
      optionLabel="name"
      :editable="true"
    />

    <h5>Advanced with Templating, Filtering and Clear Icon</h5>
    <Dropdown
      v-model="selectedCountry"
      :options="countries"
      optionLabel="name"
      :filter="true"
      placeholder="Select a Country"
      :showClear="true"
    >
      <template #value="slotProps">
        <div class="country-item country-item-value" v-if="slotProps.value">
          <!-- <img
            src="../../assets/images/flag_placeholder.png"
            :class="'flag flag-' + slotProps.value.code.toLowerCase()"
          /> -->
          <span>helo</span>
          <div>{{ slotProps.value.name }}</div>
        </div>
        <span v-else>
          {{ slotProps.placeholder }}
        </span>
      </template>
      <template #option="slotProps">
        <div class="country-item">
          <!-- <img
            src="../../assets/images/flag_placeholder.png"
            :class="'flag flag-' + slotProps.option.code.toLowerCase()"
          /> -->
          <span>Hi {{ slotProps.option.code.toLowerCase() }}</span>
          
          </div>
      </template>
      <template>
        <div class="country-item">
          <!-- <img
            src="../../assets/images/flag_placeholder.png"
            :class="'flag flag-' + slotProps.option.code.toLowerCase()"
          /> -->
          <span>Hi </span>
          
          </div>
      </template>
      </Dropdown
    >
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
export default {
    components: { Dropdown },
    data() {
        return {
            selectedCity1: null,
            selectedCity2: null,
            selectedCountry: null,
            cities: [
                {name: 'New York', code: 'NY'},
                {name: 'Rome', code: 'RM'},
                {name: 'London', code: 'LDN'},
                {name: 'Istanbul', code: 'IST'},
                {name: 'Paris', code: 'PRS'}
            ],
            countries: [
                {name: 'Australia', code: 'AU'},
                {name: 'Brazil', code: 'BR'},
                {name: 'China', code: 'CN'},
                {name: 'Egypt', code: 'EG'},
                {name: 'France', code: 'FR'},
                {name: 'Germany', code: 'DE'},
                {name: 'India', code: 'IN'},
                {name: 'Japan', code: 'JP'},
                {name: 'Spain', code: 'ES'},
                {name: 'United States', code: 'US'}
            ]
        }
    },
}
</script>

<style scoped>
</style>