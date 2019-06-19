<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="dashboard-analytics">
    <div class="vx-row">
      <!-- CARD 5: SUPPORT TRACKER -->
      <div class="vx-col w-full md:w-1/1 lg:w-1/1 xl:w-1/1 mb-base">
        <vx-card title="Users">
          <template lang="html">
              <div>
                <vs-table
                  pagination
                  :max-items="maxPerPage"
                  search
                  :data="users">
                  <template slot="header">
                    <vs-button size="medium" color="success" @click="add();" icon="add" type="filled">Add</vs-button>
                  </template>
                  <template slot="thead">
                    <vs-th sort-key="username">
                      Username
                    </vs-th>
                    <vs-th sort-key="email">
                      Email
                    </vs-th>
                    <vs-th sort-key="name">
                      Name
                    </vs-th>
                    <vs-th sort-key="phone">
                      Phone
                    </vs-th>
                    <vs-th>
                      Action
                    </vs-th>
                  </template>

                  <template slot-scope="{data}">
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                      <vs-td :data="data[indextr].username">
                        {{data[indextr].username}}
                      </vs-td>

                      <vs-td :data="data[indextr].email">
                        {{data[indextr].email}}
                      </vs-td>

                      <vs-td :data="data[indextr].name">
                        {{data[indextr].name}}
                      </vs-td>

                      <vs-td :data="data[indextr].phone">
                        {{data[indextr].phone}}
                      </vs-td>

                      <vs-td :data="[data[indextr]]">
                        <vs-row>
                          <vs-button size="small" color="primary" @click="edit(data[indextr]);" icon="edit" type="filled">Edit</vs-button>
                          &nbsp;
                          <vs-button size="small" color="danger" @click="removeConfirm(data[indextr].id);" icon="delete" type="filled">Delete</vs-button>
                        </vs-row>
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>

                <!-- Modals -->

                <!-- Edit Modal -->
                <vs-popup class="holamundo"  :title="titleModal" :active.sync="userModal">
                  <div class="vx-row mb-6">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>Name</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                      <vs-input class="w-full" v-model="name" />
                    </div>
                  </div>
                  <div class="vx-row mb-6">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>Username</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                      <vs-input class="w-full" type="email" v-model="username" />
                    </div>
                  </div>
                  <div class="vx-row mb-6">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>Password</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                      <vs-input :description-text="passwordDesc" class="w-full" type="password" v-model="password" />
                    </div>
                  </div>
                  <div class="vx-row mb-6">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>Role</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                     <ul class="centerx">
                        <li class="modelx">
                        </li>
                        <li>
                          <vs-checkbox v-model="role" vs-value="1">Admin</vs-checkbox>
                        </li>
                        <li>
                          <vs-checkbox v-model="role" vs-value="2">Manager</vs-checkbox>
                        </li>
                        <li>
                          <vs-checkbox v-model="role" vs-value="3">Staff</vs-checkbox>
                        </li>
                        <li>
                          <vs-checkbox v-model="role" vs-value="4">User</vs-checkbox>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="vx-row mb-6">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>Email</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                      <vs-input class="w-full" v-model="email" />
                    </div>
                  </div>
                  <div class="vx-row mb-6">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>Mobile Phone</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                      <vs-input class="w-full" v-model="phone" />
                    </div>
                  </div>
                  <div class="vx-row">
                    <div class="vx-col sm:w-2/3 w-full ml-auto">
                      <vs-button @click="checkAction()" class="mr-3 mb-2 float-right success">{{ btnAction }}</vs-button>
                    </div>
                  </div>
                </vs-popup>

                <!-- <pre>{{ selected }}</pre> -->
              </div>
            </template>
        </vx-card>
      </div>
    </div>

  </div>
</template>

<script>
import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
import ApiService from "@/auth/api.service";


export default {
    data:()=>({
      // Modal detail
      userModal : false,
      titleModal : '',
      btnAction : '',
      action : '',
      btnColor : '',
      // User field
      idUser : '',
      name : '',
      username : '',
      email : '',
      phone : '',
      password : '',
      passwordDesc : '',
      role: [],
      // END OF User field
      maxPerPage: 10,
      users:[]
    }),
    components: {
        ChangeTimeDurationDropdown
    },
    methods: {
      getAllUser(){
        ApiService.setHeader();
        ApiService.get("user")
        .then(({ data }) => {
          this.users = data
          resolve(data);
        })
        .catch(({ response }) => {
          if(response){
            this.$store.dispatch('logout').then(() => {
              this.$store.dispatch('setError', response.data);
            });
          }
        }).finally(() => {
          // console.log('always executed')
        });
      },
      // Modal action
      add(){
        this.userModal = true;
        this.titleModal = 'Add Record';
        this.btnAction = 'Save',
        this.btnColor = 'primary',
        this.action = 'new',
        this.name = '';
        this.username = '';
        this.email = '';
        this.phone = '';
        this.password = '';
        this.role = [];
      },
      edit(data){
        var role = data.roles.map(function(item) {
          return item['id'].toString();
        });
        this.userModal = true;
        this.titleModal = 'Edit Record'
        this.btnAction = 'Update',
        this.btnColor = 'success',
        this.action = 'update',
        this.idUser = data.id,
        this.name = data.name;
        this.username = data.username;
        this.email = data.email;
        this.phone = data.phone;
        this.password = '';
        this.role = role;
        this.passwordDesc = "Let this field empty if you don't want to change the password";
      },
      checkAction(){
        if(this.action == 'new'){
          this.save();
        }else if (this.action == 'update'){
          this.update();
        }
      },
      // Action to the backend
      save(){
        let payload = {
          name: this.name,
          username: this.username,
          password: this.password,
          email: this.email,
          phone: this.phone,
          role: this.role.map(Number)
        }
        ApiService.setHeader();
        ApiService.post("user", payload)
        .then(({ data }) => {
            this.$vs.notify({
            title: 'Succesful',
            text: data.message,
            position: 'bottom-center',
            color: 'success'
            })
            this.getAllUser();
            this.userModal = false;
        })
        .catch(({ response }) => {
            this.$vs.notify({
            title: 'Failed',
            text: 'Failed to do the operation',
            position: 'bottom-center',
            color: 'danger'
            })
        });
      },
      update(){
        let id = this.idUser
        let payload = {
          name: this.name,
          username: this.username,
          password: this.password,
          email: this.email,
          phone: this.phone,
          role: this.role.map(Number)
        }
        ApiService.setHeader();
        ApiService.patch("user/"+id, payload)
        .then(({ data }) => {
            this.$vs.notify({
            title: 'Succesful',
            text: data.message,
            position: 'bottom-center',
            color: 'success'
            })
            this.getAllUser();
            this.userModal = false;
        })
        .catch(({ response }) => {
            this.$vs.notify({
            title: 'Failed',
            text: 'Failed to do the operation',
            position: 'bottom-center',
            color: 'danger'
            })
        });
      },
      delete(id){
        ApiService.setHeader();
        ApiService.delete("user/"+id)
        .then(({ data }) => {
          this.$vs.notify({
          title: 'Succesful',
          text: data.message,
          position: 'bottom-center',
          color: 'success'
          })
          this.getAllUser();
        })
        .catch(({ response }) => {
          this.$vs.notify({
          title: 'Failed',
          text: 'Failed to do the operation',
          position: 'bottom-center',
          color: 'danger'
          })
        });
      },
      removeConfirm(id){
        this.$vs.dialog({
        type:'confirm',
        color: 'warning',
        title: `Confirm`,
        text: 'Are you sure want to delete this record ?',
        accept: () => {
          this.delete(id)
        }
        });
      }
    },
    computed: {
      errorStatus(){
        return this.$store.state.auth.errors
      }
    },
    watch: {
        errorStatus(newVal, oldVal){
          if (newVal.name == 'TokenExpiredError'){
              console.log(newVal)
              this.$vs.notify({
              title: 'Expired Session',
              text: "You have been logged out because of inactivity",
              color: 'warning'
              })
          }
        }
    },
    mounted : function(){
      this.getAllUser();
    },
}
</script>

<style lang="scss">
#dashboard-analytics {
  .greet-user{
    position: relative;
    .decore-left{
      position: absolute;
      left:0;
      top: 0;
    }
    .decore-right{
      position: absolute;
      right:0;
      top: 0;
    }
  }

  @media(max-width: 576px) {
    .decore-left, .decore-right{
      width: 140px;
    }
  }
}
</style>
