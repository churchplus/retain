<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="266px" class="links-menu" :class="{ 'show': menuShouldShow }" >
        <div >
          <MenuLinks @linkclicked="hideNav" @tenantname="setChurchName"/>
        </div>
      </el-aside>
      <el-container>
        <el-header class="nav-header p-0 hidden-md-and-up">
          <div class="toggle d-flex" @click="toggleMenu">
            <div class="pa-3 menu-icon">
              <i class="pi pi-bars"></i> 
            </div>
            <div class="pa-3 font-weight-600">{{ tenantName.churchName }}</div>
          </div>
        </el-header>
        <el-main>
          <div class="h-100" @click="hideMenu">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>


  <!-- :class="{ 'main-con dim': !route.fullPath.includes('/mobileonboarding') && !route.fullPath.includes('/onboardingsuccessful'), 'top-router': route.query.fw }" -->


  <!-- <el-container>
    <el-row>
      <el-col>
      </el-col>
      <el-col>
        <div class="links-menu" :class="{ 'show': menuShouldShow }">
        <MenuLinks @linkclicked="hideNav" />
      </div>
      <div
        :class="{ 'main-con dim': !route.fullPath.includes('/mobileonboarding') && !route.fullPath.includes('/onboardingsuccessful'), 'top-router': route.query.fw }"
        @click="hideMenu">
        <router-view class="view" />
      </div>
      </el-col>
    </el-row>
  </el-container> -->
  <div>
    <!-- <div class="whole-page">
      <div class="links-menu" :class="{ 'show': menuShouldShow }">
        <MenuLinks @linkclicked="hideNav" />
      </div>
      <div
        :class="{ 'main-con dim': !route.fullPath.includes('/mobileonboarding') && !route.fullPath.includes('/onboardingsuccessful'), 'top-router': route.query.fw }"
        @click="hideMenu">
        <router-view class="view" />
      </div>
    </div> -->
    <!-- <div class=""> -->
    <!-- <div class="toggle" @click="toggleMenu">
      <i class="pi pi-bars"></i> Menu
    </div>
    <div>
      Gospel Internantional Parish
    </div>
  </div> -->
  </div>
</template>

<script>
import { ref } from "vue";
import MenuLinks from "../../components/nav/MenuLinks.vue";
import { useRoute } from "vue-router"

export default {
  components: { MenuLinks },

  setup() {
    const menuShouldShow = ref(false);
    const fullPath = ref("")
    const tenantName = ref({})

    const toggleMenu = () => (menuShouldShow.value = !menuShouldShow.value);

    const hideMenu = () => {
      if (menuShouldShow.value) menuShouldShow.value = false;
    };

    const hideNav = (val) => {
      if (val && menuShouldShow.value) {
        menuShouldShow.value = false;
      }
    }

    const route = useRoute()
    const getRoute = () => {
      fullPath.value = route.fullPath
    }
    getRoute()

    const setChurchName = (payload) => {
      tenantName.value = payload;
    }

    return {
      menuShouldShow,
      toggleMenu,
      hideMenu,
      hideNav,
      fullPath,
      route,
      setChurchName,
      tenantName
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.whole-page {
  position: relative;
  display: flex;
  min-height: 100vh;
  overflow: auto;
  background: #fff;
}

.links-menu {
  width: 266px;
  min-height: 100vh !important;
  background: #ebeff4;
  height: inherit;
  overflow: auto;
  z-index: 1;
}

.hide-menu {
  display: none;
  /* position: fixed; */
  width: 0 !important;
  left: -266px;
  /* transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1); */
}

.show-menu {
  display: block;
}


/* Hide scrollbar for Chrome, Safari and Opera */
.links-menu::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.links-menu {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.main-con {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
}

.main-con::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.main-con {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.nav-header {
  border-bottom: 1px solid #BCCCDD;

}

.toggle {
  height: 100%;
  display: flex;
  align-items: center;
}

.menu-icon {
  border-right: 1px solid #BCCCDD;
  background: #F1F5F8;
}

.pa-3 {
  padding: 1.1rem;

}

.toggle:hover {
  cursor: pointer;
}

@media screen and (max-width: 991px) {
  .toggle {
    display: block;
  }

  .links-menu {
    z-index: 999;
    position: fixed;
    left: -266px;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .links-menu.show {
    position: fixed;
    left: 0;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .main-con {
    width: 100%;
  }
}

/* Route Transition */
.btn-loading {
  display: flex;
  justify-content: space-between;
}

.fade-enter-active {
  transition: all 0.3s cubic-bezier(0.67, 0.01, 0.86, 0.65);
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.67, 0.01, 0.86, 0.65);
}

.fade-enter-from,
.fade-leave-to {
  transition: translateX(20px);
  opacity: 0;
}

.top-router {
  max-width: 1536px !important;
}
</style>