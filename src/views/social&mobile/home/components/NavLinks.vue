<template>
    <div class="container-fluid main">
        <div class="row">
            <div class="col-md-12 my-5">
                <router-link to="/tenant/social/post" class="default-btn primary-bg text-light c-pointer border-0 text-decoration-none">
                    <span><i class="pi pi-book text-white mr-2 c-pointer"></i></span>
                    <span class="text-white">New Post</span>
                </router-link>
            </div>
            <div class="ml-3 toggle" @click="showToggle">
              <i class="fa fa-angle-up" style="font-size: 1.5rem;" aria-hidden="true" :class=" {'iconTransform' : showToggleList}"></i>
               <span class="hideOrShowMenu  ml-3"> {{ showToggleList ? 'Hide menu' : 'Show menu' }}</span>
            </div>
            <div class="col-md-12" :class=" { 'show': showToggleList, 'notShow': !showToggleList} ">
                <ul class="list-style-none px-0">
                    <li v-for="(link, index) in links" :key="index" class="py-3">
                        <i :class="link.icon" class="mr-2"></i>
                        <router-link :to="link.to" class="text-decoration-none font-weight-700 link-color">
                            {{ link.text }}
                            <span v-if="link.text === 'Pending Posts' && pendingPostsCount"><Badge :value="pendingPostsCount" style="background: orange; color:#fff"></Badge></span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="col-lg-12 d-flex pl-0 bring-forward">
                <!-- <div class="col-6">
                    <a href="https://play.google.com/store/apps/details?id=com.churchplus.app.genericapp">
                  <img
                    class="w-100 mt-5"
                    src="../../../../assets/mobileonboarding/Google-play-logo.png"
                    alt="phone image"
                  />
                    </a>
                </div> -->
                <div class="col-6" v-if="false">
                  <img
                    class="w-100 mt-5"
                    src="../../../../assets/mobileonboarding/app-store-logo.png"
                    alt="phone image"
                  />
                </div>
              </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import membershipService from '../../../../services/membership/membershipservice'
import social_service from '../../../../services/social/social_service'
import Badge from 'primevue/badge';

    export default {
        components: { Badge },
        setup() {
            const links = [
                
                {
                    text: "Feeds",
                    icon: "pi pi-wifi",
                    to: "/tenant/social/feed",
                },
                {
                    text: "Pending Posts",
                    icon: "pi-wallet",
                    to: "/tenant/social/pending",
                },
                {
                    text: "Schedule Post",
                    icon: "pi pi-clock",
                    to: "/tenant/social/schedule",
                },
                // {
                //     text: "Overview",
                //     icon: "pi pi-th-large",
                //     to: "/tenant/social",
                // },
                // {
                //     text: "Involvement",
                //     icon: "pi pi-heart",
                //     to: "/tenant/social/involvement",
                // },
                // {
                //     text: "Setting",
                //     icon: "pi pi-cog",
                //     to: "/tenant/social/setting",
                // },
                {
                    text: "Post Category",
                    icon: "pi pi-sitemap",
                    to: "/tenant/social/category",
                },
                // {
                //     text: "Mobile App Onboarding",
                //     icon: "pi pi-mobile",
                //     to: "/mobileonboarding",
                // }
            ]

            const showToggleList = ref(false);
            const showToggle = () => {
                showToggleList.value = !showToggleList.value
            }
            const pendingPosts = ref(0);
            const getPendingPosts = async () => {
                try {
                    const currentUser = await membershipService.getSignedInUser();
                    const response = await social_service.getPendingPosts(currentUser.tenantId);
                    pendingPosts.value = response.pendingPosts;
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            }
            getPendingPosts();

            const pendingPostsCount = computed(() => {
                if (!pendingPosts.value || pendingPosts.value.length === 0) return 0;
                return pendingPosts.value.length;
            })

            return {
                links,
                pendingPostsCount,
                showToggleList,
                showToggle
            }
        }
    }
</script>

<style scoped>
    * {
        color: #02172E;
        /* font: normal normal 600 ¿16px/22px Nunito Sans; */
        /* font-family: Nunito Sans !important; */
    }

    .main {
        border-right: 0.20000000298023224px solid #e9eef0;
    }

    .list-style-none {
        list-style: none;
    }

    .link-color {
        color: #737f8c;
    }

    .router-link-exact-active {
        color: #146acd;
    }
    .toggle {
        display: none;
    }

    @media screen and (max-width: 760px) {
        .toggle {
            display: block;
        }
        .show {
            height: 44vh;
            overflow: hidden;

        }
        .notShow {
            height: 0;
             overflow: hidden;
        }
        .iconTransform {
            transition: all 0.5s ease-in-out;
            transform: rotate(180deg);
        }
     }
  
</style>