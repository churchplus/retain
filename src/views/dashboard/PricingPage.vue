<template>
  <div class="">
    <div
      class="container-fluid px-0 pb-4  backgroundColor "
    >
      <div class="row">
        <div class="col-md-12">
          <div class="row justify-content-center">
            <div class="col-md-12 d-flex justify-content-center ">
              <div class="col-md-4 col-11 col-sm-8 mt-2">
                <el-dropdown trigger="click" class="w-100">
                    <el-input
                      type="text"
                      placeholder="Select Country"
                      v-model="counrtySearch"
                    >
                    <template #suffix>
                        <el-button style="padding: 5px; height: 22px;" @click.prevent="counrtySearch = ''">
                            <el-icon :size="13">
                                <Close />
                            </el-icon>
                        </el-button>
                    </template>
                    <template #append>
                        <el-button>
                            <el-icon :size="15">
                                <ArrowDownBold />
                            </el-icon>
                        </el-button>
                    </template>
                    </el-input>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item
                        v-for="item in filteredCounrty"
                        :key="item.id"
                        @click="setSelectedCountry(item)"
                      >
                        {{ item ? item.name : "" }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
            <div
              class="col-11 col-sm-10 col-md-7 col-lg-4 d-flex my-4 justify-content-between"
              @click="toggle"
            >
              <div
                class="font-weight-bold text-center h4"
                :class="{ 'text-color': togglePrice }"
              >
                Monthly Pricing
              </div>
              <div class="">
                <label class="switch mt-1">
                  <input type="checkbox" v-model="isActive" @click="toggle" />
                  <span class="slider round"></span>
                </label>
              </div>
              <div
                class="font-weight-bold text-center h4"
                :class="{ 'text-color': !togglePrice }"
              >
                Yearly Pricing
              </div>
            </div>
            <div class="col-md-11 ">
              <div class="row justify-content-between">
                <div
                  class="col-10 col-sm-5 col-md-3 mx-auto text-center "
                  v-for="(item, index) in productPricing"
                  :key="index"
                >
                  <div class="row justify-content-center">
                    <div
                      class="col-md-11    py-5 rounded mb-3 d-flex justify-content-center border bg-white" style="min-height: 930px;"
                    >
                    <div class="row justify-content-center">
                        <div class="col-md-10 ">
                        <div class="mt-4 h4 font-weight-bold price-header">
                          {{ item.subscriptionPlan.description }}
                        </div>
                        <div v-if="item.currency.country === 'Nigeria'">
                          <div class="mt-4 head-text  " v-if="togglePrice">
                            {{ item.currency.symbol
                            }}{{
                              item.subscriptionPlan.amountInNaira.toLocaleString()
                            }}<div class="small text-secondary"> /month</div>
                          </div>
                          <div class="mt-4 head-text   " v-else>
                            {{ item.currency.symbol
                            }}{{
                              (
                                item.subscriptionPlan.amountInNaira * 12
                              ).toLocaleString()
                            }}
                            <div class="small text-secondary"> /year</div>
                          </div>
                        </div>
                        <div v-else-if="item.currency.shortCode === 'USD'">
                          <div class="mt-4 head-text" v-if="togglePrice">
                            ${{
                              item.price.toLocaleString()
                            }}<div class="small text-secondary"> /month</div>
                          </div>
                          <div class="mt-4 head-text" v-else>
                            ${{
                              (
                                item.price * 12
                              ).toLocaleString()
                            }}
                            <div class="small text-secondary">/year</div>
                          </div>
                        </div>
                        <div v-else>
                          <div class="mt-4 head-text" v-if="togglePrice">
                            {{ item.currency.symbol
                            }}{{ item.price.toLocaleString()
                            }}<div class="small text-secondary"> /month</div>
                          </div>
                          <div class="mt-4 head-text" v-else>
                            {{ item.currency.symbol
                            }}{{ (item.price * 12).toLocaleString() }}
                            <div class="small text-secondary"> /year</div>
                          </div>
                        </div>
                        <div
                          class="mt-4"
                          v-if="item.subscriptionPlan.membershipSize < 500"
                        >
                          <img class="w-100" src="../../assets/icon_5-1.png" alt="" />
                        </div>
                        <div class="mt-4" v-else>
                          <img class="w-100" src="../../assets/icon_4-1.png" alt="" />
                        </div>
                        <div class="mt-4 font-weight-bold">
                          ({{ item.subscriptionPlan.membershipSize }} Membership
                          Size)
                        </div>
                        <div class="mt-4">
                          {{
                            item.subscriptionPlan.membershipSize > 500
                              ? "Free 250 SMS Units Monthly"
                              : "Free 100 SMS Units Monthly"
                          }}
                        </div>
                        <div class="mt-4">Accounting</div>
                        <div class="mt-4">Event Management</div>
                        <div class="my-4">
                          Communication ( SMS, Email, WhatsApp, Voice)
                        </div>
                        <div class="">Membership Managament</div>
                        <div class="my-4">Reports</div>
                        <div class="">Free Online Giving</div>
                        </div>
                    </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import axios from "@/gateway/backendapi";
export default {
  setup() {
    const togglePrice = ref(true);
    const isActive = ref(null);
    const selectedCountry = ref("");
    const counrtySearch = ref("");
    const selectedCountryID = ref(null);
    const allCountries = ref([]);
    const productPricing = ref([]);
    const countryCode = ref({});
    const toggle = () => {
      togglePrice.value = !togglePrice.value;
    };

    const getAllCountries = async () => {
      try {
        const { data } = await axios.get("/public/GetAllCountries");
        allCountries.value = data;
      } catch (error) {
        console.log(error);
      }
    };

    getAllCountries();
    const filteredCounrty = computed(() => {
      if (!counrtySearch.value) return allCountries.value;
      return allCountries.value.filter((i) =>
        i.name.toLowerCase().includes(counrtySearch.value.toLowerCase())
      );
    });

    const setSelectedCountry = (item) => {
      selectedCountry.value = item;
      counrtySearch.value = item.name;
      countryCode.value = "";
      getPricing();
    };

    const getPricing = async () => {
      try {
        const { data } = await axios.get(
          `/public/ProductPricingByCountryCode?CountryCode=${
            countryCode.value ? countryCode.value : ""
          }${
            selectedCountry.value.isoCode ? selectedCountry.value.isoCode : ""
          }`
        );
        productPricing.value = data
          .filter((i) => i.subscriptionPlan !== null)
          .sort((a, b) => a.order - b.order)
          .filter(
            (i) =>
              i.subscriptionPlan.description === "FREE-TRIAL PLAN" ||
              i.subscriptionPlan.description == "STARTER PLAN" ||
              i.subscriptionPlan.description === "BASIC PLAN" ||
              i.subscriptionPlan.description === "GROWTH PLAN"
          );
        console.log(productPricing.value, "productPricing");
      } catch (error) {
        console.log(error);
      }
    };

    const getGelocation = async () => {
      try {
        const data = await axios.get(
          "https://ipgeolocation.abstractapi.com/v1/?api_key=bac6ccc8cd56499dbd1385017983a52c"
        );
        countryCode.value = data.data.country_code;
        counrtySearch.value = data.data.country;
      } catch (error) {
        console.log(error);
      }
      getPricing();
    };
    getGelocation();

    return {
      toggle,
      allCountries,
      togglePrice,
      productPricing,
      isActive,
      selectedCountryID,
      setSelectedCountry,
      counrtySearch,
      filteredCounrty,
      selectedCountry,
      countryCode,
    };
  },
};
</script>

<style scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 27px;
}
.backgroundColor{
  background-color: rgb(227, 231, 255);
}
.price-header {
  text-transform: lowercase;
  /* color: #172B4D; */
}
.price-header:first-letter,
.price-header:first-line {
  text-transform: capitalize;
}
.descrip:first-letter,
.descrip::first-line {
  color: #61c330 !important;
}
.text-color {
  color: #4154f1 !important;
}

.button-color {
  color: #4154f1 !important;
  padding: 25px 80px !important;
  border-radius: 50px;
  border: 1px solid #4154f1;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #4154f1;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 7px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #4154f1;
}

input:focus + .slider {
  box-shadow: 0 0 1px #4154f1;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>