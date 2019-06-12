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
                  v-model="selected"
                  pagination
                  :max-items="maxPerPage"
                  search
                  :data="users">
                  <!-- <template slot="header">
                    <h3>
                      Users
                    </h3>
                  </template> -->
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

                      <vs-td :data="data[indextr].id">
                        <vs-row>
                          <vs-button size="small" color="success" @click="edit(data[indextr].id)" icon="edit" type="filled">Ubah</vs-button>
                          &nbsp
                          <vs-button size="small" color="danger" @click="edit(data[indextr].id)" icon="delete" type="filled">Delete</vs-button>
                        </vs-row>
                        
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>

                <!-- Modals -->

                <!-- Edit Modal -->
                <vs-popup class="holamundo"  title="Lorem ipsum dolor sit amet" :active.sync="editModal">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                  </p>
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

export default {
    data:()=>({
      editModal : false,
      selected:[],
      maxPerPage: 10,
      users:[
  {
    "id": 1,
    "name": "Administrator",
    "email": "",
    "phone": "",
    "username": "admin",
    "roles": [
      {
        "id": 1,
        "name": "Admin",
        "description": "administrator"
      },
      {
        "id": 2,
        "name": "Manager",
        "description": "support manager"
      },
      {
        "id": 3,
        "name": "Staff",
        "description": "support staff"
      }
    ]
  },
  {
    "id": 2,
    "name": "Dodi Prasetyo",
    "email": "",
    "phone": "",
    "username": "dodistyo",
    "roles": [
      {
        "id": 2,
        "name": "Manager",
        "description": "support manager"
      }
    ]
  },
  {
    "id": 3,
    "name": "Staff Test",
    "email": "",
    "phone": "",
    "username": "staff",
    "roles": [
      {
        "id": 3,
        "name": "Staff",
        "description": "support staff"
      }
    ]
  },
  {
    "id": 4,
    "name": "User Test",
    "email": "",
    "phone": "",
    "username": "user",
    "roles": [
      {
        "id": 4,
        "name": "User",
        "description": "normal user who request ticket"
      }
    ]
  },
  {
    "id": 16,
    "name": "Agustian Nugraha",
    "email": "agustian@gmail.com",
    "phone": "082115879753",
    "username": "agust",
    "roles": [
      {
        "id": 1,
        "name": "Admin",
        "description": "administrator"
      },
      {
        "id": 2,
        "name": "Manager",
        "description": "support manager"
      }
    ]
  },
  {
    "id": 20,
    "name": "Bagas Anggara",
    "email": "bagas@gmail.com",
    "phone": "082115879753",
    "username": "bagas",
    "roles": [
      {
        "id": 2,
        "name": "Manager",
        "description": "support manager"
      },
      {
        "id": 3,
        "name": "Staff",
        "description": "support staff"
      }
    ]
  }
]
    }),
     mounted:function(){
        console.log(this.maxPerPage)
    },
    components: {
        ChangeTimeDurationDropdown
    },
    methods: {
      edit(id){
        this.editModal = true
      }
    }
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
