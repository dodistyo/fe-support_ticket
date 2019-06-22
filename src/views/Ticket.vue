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
        <vx-card title="Tickets">
          <template lang="html">
              <div>
                <vs-table
                  pagination
                  :max-items="maxPerPage"
                  search
                  :data="tickets">
                  <template slot="header">
                    <vs-button size="medium" color="success" @click="add();" icon="add" type="filled">Open New Ticket</vs-button>
                  </template>
                  <template slot="thead">
                    <vs-th sort-key="ticketNumber">
                      Ticket Number
                    </vs-th>
                    <vs-th sort-key="subject">
                      Subject
                    </vs-th>
                    <vs-th sort-key="requesterUser.name">
                      Requester User
                    </vs-th>
                    <vs-th sort-key="phone">
                      Phone
                    </vs-th>
                    <vs-th sort-key="priority.name" v-if="userRole != 'User'">
                      Priority
                    </vs-th>
                    <vs-th sort-key="state">
                      State
                    </vs-th>
                    <vs-th>
                      Action
                    </vs-th>
                  </template>

                  <template slot-scope="{data}">
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                      <vs-td :data="data[indextr].ticketNumber">
                        {{data[indextr].ticketNumber}}
                      </vs-td>

                      <vs-td :data="data[indextr].subject">
                        {{data[indextr].subject}}
                      </vs-td>

                      <vs-td :data="data[indextr].requesterUser.name">
                        {{data[indextr].requesterUser.name}}
                      </vs-td>

                      <vs-td :data="data[indextr].phone">
                        {{data[indextr].phone}}
                      </vs-td>

                      <vs-td v-if="data[indextr].priority && (userRole == 'Admin' || userRole =='Manager' || userRole =='Staff')" :data="data[indextr].priority">
                          {{data[indextr].priority.name}}
                      </vs-td><vs-td v-else-if="userRole == 'Admin' || userRole =='Manager' || userRole =='Staff'"></vs-td>

                      <vs-td :data="data[indextr].state">
                        {{data[indextr].state.name}}
                      </vs-td>

                      <vs-td :data="[data[indextr]]">
                        <vs-row>
                          <vs-button size="small" color="primary" @click="edit(data[indextr]);" icon="edit" type="filled">Modify</vs-button>
                          &nbsp;
                          <vs-button v-if="userRole == 'Admin'"  size="small" color="danger" @click="removeConfirm(data[indextr].id);" icon="delete" type="filled">Delete</vs-button>
                        </vs-row>
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>

                <!-- Modals -->

                <!-- Edit Modal -->
                <vs-popup class="holamundo"  :title="titleModal" :active.sync="ticketModal">
                  <div class="vx-row mb-6" v-if="ticketState">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>Ticket Number</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                      <vs-input disabled class="w-full" v-model="ticketNumber" />
                    </div>
                  </div>
                  <div class="vx-row mb-6">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>Subject</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                      <vs-input class="w-full" v-model="subject" />
                    </div>
                  </div>
                  <div class="vx-row mb-6">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>Email</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                      <vs-input class="w-full" type="email" v-model="email" />
                    </div>
                  </div>
                  <div class="vx-row mb-6">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>Phone</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                      <vs-input class="w-full" type="email" v-model="phone" />
                    </div>
                  </div>
                  <div class="vx-row mb-6">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>Issue Description</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                      <vs-textarea v-model="issueDescription" />
                    </div>
                  </div>
                  <div class="vx-row mb-6" v-if="userRole == 'Admin' || userRole == 'Manager'">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>Requester</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                      <vs-select
                        autocomplete
                        class="selectExample"
                        v-model="requesterUser"
                        >
                        <vs-select-item :key="index" :value="item.id" :text="item.name" v-for="(item,index) in mUser" />
                      </vs-select>
                    </div>
                  </div>
                  <div class="vx-row mb-6">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>Category</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                      <vs-select
                        autocomplete
                        class="selectExample"
                        v-model="category"
                        >
                        <vs-select-item :key="index" :value="item.id" :text="item.text" v-for="(item,index) in mCategory" />
                      </vs-select>
                    </div>
                  </div>
                  <div class="vx-row mb-6" v-if="userRole == 'Admin' || userRole == 'Manager' || userRole == 'Staff'">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>Action Done</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                      <vs-textarea v-model="actionDoneDescription" />
                    </div>
                  </div>
                  <div class="vx-row mb-6" v-if="userRole == 'Admin' || userRole == 'Manager'">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>Assigned User</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                      <vs-select
                        autocomplete
                        class="selectExample"
                        v-model="assignedUser"
                        >
                        <vs-select-item :key="index" :value="item.id" :text="item.name" v-for="(item,index) in mUser" />
                      </vs-select>
                    </div>
                  </div>
                  <div class="vx-row mb-6" v-if="userRole == 'Admin' || userRole == 'Manager'">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>Priority</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                      <vs-select
                        autocomplete
                        class="selectExample"
                        v-model="priority"
                        >
                        <vs-select-item :key="index" :value="item.id" :text="item.text" v-for="(item,index) in mPriority" />
                      </vs-select>
                    </div>
                  </div>

                  <div class="vx-row mb-6" v-if="userRole == 'Staff'">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>Close Ticket</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                      <div class="centex">
                        <vs-switch color="success" v-model="staffClosed">
                        </vs-switch>
                      </div>
                    </div>
                  </div>

                  <div class="vx-row mb-6" v-if="userRole == 'User'">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>Confirm Close</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                      <vs-switch color="success" v-model="userClosed">
                      </vs-switch>
                    </div>
                  </div>
                  
                  <div class="vx-row mb-6" v-if="ticketState && (userRole == 'Admin' || userRole == 'Manager')">
                    <div class="vx-col sm:w-1/3 w-full">
                      <span>State</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                      <vs-select
                        autocomplete
                        class="selectExample"
                        v-model="state"
                        >
                        <vs-select-item :key="index" :value="item.id" :text="item.text" v-for="(item,index) in mState" />
                      </vs-select>
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
      ticketModal : false,
      ticketState : false,
      titleModal : '',
      btnAction : '',
      action : '',
      btnColor : '',
      userRole : '',
      // Ticket field
      idTicket : '',
      subject : '',
      ticketNumber : '',
      email : '',
      phone : '',
      issueDescription : '',
      requesterUser : '',
      category : '',
      userClosed : false,
      actionDoneDescription : '',
      assignedUser : '',
      priority : '',
      staffClosed : false,
      state : '',
      // END OF Ticket field
      // Master Data
      mUser : [],
      mCategory : [
        {text: 'Hardware Problem', id: 1},
        {text: 'Software Problem', id: 2},
        {text: 'General Problem', id: 3},
      ],
      mPriority : [
        {text: 'Low', id: 1},
        {text: 'Medium', id: 2},
        {text: 'High', id: 3},
        {text: 'Critical', id: 4},
      ],
      mState : [
        {text: 'Open', id: 1},
        {text: 'Staff Closed', id: 2},
        {text: 'Client Closed', id: 3},
        {text: 'Closed', id: 4},
      ],
      // END OF Master Data
      maxPerPage: 10,
      endpoint : '',
      tickets:[]
    }),
    components: {
        ChangeTimeDurationDropdown
    },
    methods: {
      checkRole(){
        const roles = this.$store.getters.currentRole
        if (roles.some(e => e.name === 'Admin')) {
          this.endpoint = 'ticket'
          this.userRole = 'Admin'
        }
        else if (roles.some(e => e.name === 'Manager')) {
          this.endpoint = 'ticket'
          this.userRole = 'Manager'
        }
        else if (roles.some(e => e.name === 'Staff')) {
          this.endpoint = 'ticket/byAssignedUser'
          this.userRole = 'Staff'
        }
        else if (roles.some(e => e.name === 'User')) {
          this.endpoint = 'ticket/byRequesterUser'
          this.userRole = 'User'
        }
      },
      getAllUser(){
        ApiService.setHeader();
        ApiService.get("user")
        .then(({ data }) => {
          this.mUser = data
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
      getAllTicket(){
        ApiService.setHeader();
        ApiService.get(this.endpoint)
        .then(({ data }) => {
          this.tickets = data
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
      async add(){
        await this.getAllUser(); //get all user for dropdown
        this.ticketModal = true;
        this.ticketState = false; //You can only modify ticket state when editing (gabisa nginput state pas pertama bikin)
        this.titleModal = 'Add Record';
        this.btnAction = 'Save';
        this.btnColor = 'primary';
        this.action = 'new';
        // Ticket field
        this.ticketNumber = '';
        this.subject = '';
        this.email = this.$store.state.auth.user.email;
        this.phone = this.$store.state.auth.user.phone;
        this.issueDescription = '';
        this.requesterUser = this.$store.state.auth.user.id;
        this.category = '';
        this.userClosed = false,
        this.actionDoneDescription = '';
        this.assignedUser = '';
        this.priority = '';
        this.staffClosed = false;
        this.state = '';
        // END OF TIcket field
      },
      async edit(data){
        await this.getAllUser(); //get all user for dropdown
        this.ticketModal = true;
        this.ticketState = true; //You can only modify ticket state when editing (gabisa nginput state pas pertama bikin)
        this.titleModal = 'Edit Record'
        this.btnAction = 'Update',
        this.btnColor = 'success',
        this.action = 'update',
        // Ticket field
        this.idTicket = data.id;
        this.ticketNumber = data.ticketNumber;
        this.subject = data.subject;
        this.email = data.email;
        this.phone = data.phone;
        this.issueDescription = data.issueDescription;
        this.requesterUser = data.requesterUser.id;
        this.category = data.category.id;
        this.userClosed = data.userClosed;
        this.actionDoneDescription = data.actionDoneDescription;
        this.assignedUser = data.assignedUser.id;
        this.priority = data.priority.id;
        this.staffClosed = data.staffClosed;
        this.state = data.state.id;
        // END OF TIcket field
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
          subject : this.subject,
          ticketNumber : '',
          email : this.email,
          phone : this.phone,
          issueDescription : this.issueDescription,
          requesterUser : this.requesterUser,
          category : this.category,
          userClosed : false,
          actionDoneDescription : this.actionDoneDescription,
          assignedUser : this.assignedUser,
          priority : this.priority,
          staffClosed : false,
          state : 1, //set state to open when creating ticket
        }
        ApiService.setHeader();
        ApiService.post("ticket", payload)
        .then(({ data }) => {
            this.$vs.notify({
            title: 'Succesful',
            text: data.message,
            position: 'bottom-center',
            color: 'success'
            })
            this.getAllTicket();
            this.ticketModal = false;
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
        let id = this.idTicket
        let theState = this.state
        // if(this.staffClosed && this.userClosed){
        //   theState = 4 // set state closed
        // }else if(!this.staffClosed && !this.userClosed){
        //   theState = 1 // set state open
        // }else if(this.staffClosed){
        //   theState = 2 // set state staff closed
        // }else if(this.userClosed){
        //   theState = 3 // set state user closed
        // }

        let payload = {
          subject : this.subject,
          email : this.email,
          phone : this.phone,
          issueDescription : this.issueDescription,
          requesterUser : this.requesterUser,
          category : this.category,
          userClosed : this.userClosed,
          actionDoneDescription : this.actionDoneDescription,
          assignedUser : this.assignedUser,
          priority : this.priority,
          staffClosed : this.staffClosed,
          state : theState,
        }
        ApiService.setHeader();
        ApiService.patch("ticket/"+id, payload)
        .then(({ data }) => {
            this.$vs.notify({
            title: 'Succesful',
            text: data.message,
            position: 'bottom-center',
            color: 'success'
            })
            this.getAllTicket();
            this.ticketModal = false;
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
        ApiService.delete("ticket/"+id)
        .then(({ data }) => {
          this.$vs.notify({
          title: 'Succesful',
          text: data.message,
          position: 'bottom-center',
          color: 'success'
          })
          this.getAllTicket();
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
              this.$vs.notify({
              title: 'Expired Session',
              text: "You have been logged out because of inactivity",
              color: 'warning'
              })
          }
        }
    },
    mounted : async function(){
      await this.checkRole();
      this.getAllTicket();
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
