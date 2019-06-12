import Vue from 'vue';
import { AclInstaller, AclCreate, AclRule } from 'vue-acl';
import router from '@/router';

Vue.use(AclInstaller);

let initialRole = 'all';
// const vuexVal = localStorage.getItem("vuex");
// const userRole = JSON.parse(vuexVal).auth.user.roles;
// if(userRole){
//   initialRole = userRole[0].name.toLowerCase();
// }

export default new AclCreate({
  initial: initialRole,
  notfound: '/pages/not-authorized',
  router,
  acceptLocalRules: true,
  globalRules: {
    admin: new AclRule('admin').generate(),
    manager: new AclRule('manager').or('admin').generate(),
    staff: new AclRule('staff').generate(),
    user: new AclRule('user').generate(),
    all: new AclRule('admin').or('manager').or('staff').or('user').generate()
  }
});
