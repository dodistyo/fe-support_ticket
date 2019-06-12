<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img" id="page-login">
        <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 mx-auto self-center">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">Login</h4>
                                    <p>Welcome back, please login to your account.</p>
                                </div>
                                <form v-on:submit.prevent="login();">
                                <vs-input
                                    data-vv-validate-on="blur"
                                    name="username"
                                    icon="icon icon-user"
                                    icon-pack="feather"
                                    label-placeholder="Username"
                                    v-model="username"
                                    class="w-full no-icon-border"/>
                                <span class="text-danger text-sm">{{ errors.first('username') }}</span>

                                <vs-input
                                    data-vv-validate-on="blur"
                                    type="password"
                                    name="password"
                                    icon="icon icon-lock"
                                    icon-pack="feather"
                                    label-placeholder="Password"
                                    v-model="password"
                                    class="w-full mt-6 no-icon-border" />
                                <span class="text-danger text-sm">{{ errors.first('password') }}</span>

                                <div class="flex flex-wrap justify-between my-5">
                                    <!-- <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox> -->
                                    <!-- <router-link to="/pages/forgot-password">Forgot Password?</router-link> -->
                                </div>
                                <!-- <vs-button  type="border" @click="registerUser">Register</vs-button> -->
                                <vs-button class="float-right">Login</vs-button>
                                </form>
                                <vs-divider>--</vs-divider>

                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            username: '',
            password: '',
            checkbox_remember_me: false
        }
    },
    computed: {
        validateForm() {
            return !this.errors.any() && this.email != '' && this.password != '';
        },
        errorStatus(){
            return this.$store.state.auth.errors
        }
    },
    methods: {
        login() {
            const payload = {
                checkbox_remember_me: this.checkbox_remember_me,
                userDetails: {
                    email: this.email,
                    password: this.password
                },
                notify: this.$vs.notify
            }
            const username = this.username;
            const password = this.password
            this.$store.dispatch('login', { username, password }).then(()=>{
                this.$router.push({ name: "dashboard" });
            });
        },
    },
    watch: {
        errorStatus(newVal, oldVal){
            if (newVal.status == !true){
                this.$vs.notify({
                title: 'LOGIN FAILED',
                text: newVal.message,
                color: 'danger'
                })
            }
        }
    }
}
</script>

<style lang="scss">
#page-login {
    .social-login {
        .bg-facebook {
          background-color: #1551b1;
        }
        .bg-twitter {
          background-color: #00aaff;
        }
        .bg-google {
          background-color: #1551b1;
        }
        .bg-github {
          background-color: #333;
        }
    }
}
</style>
