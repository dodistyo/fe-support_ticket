import ApiService from "@/auth/api.service";
import JwtService from "@/auth/jwt.service";
import {
  admin,
  manager,
  userAndStaff
} from "../../layouts/components/vx-sidebar/sidebarItems.js";
import router from '@/router';
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CHECK_AUTH,
  UPDATE_USER
} from "./actions.type";
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "./mutations.type";

const state = {
  errors: {},
  user: {},
  menu: [],
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  currentUserRole(state) {
    return state.user.roles;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise(resolve => {
      ApiService.post("auth/login", credentials)
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
    router.push('/pages/login');
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("users", { user: credentials })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [CHECK_AUTH](context) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      // ApiService.get("user")
      //   .then(({ data }) => {
      //     context.commit(SET_AUTH, data.user);
      //   })
      //   .catch(({ response }) => {
      //     context.commit(SET_ERROR, response.data.errors);
      //   });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  [UPDATE_USER](context, payload) {
    const { email, username, password, image, bio } = payload;
    const user = {
      email,
      username,
      bio,
      image
    };
    if (password) {
      user.password = password;
    }

    return ApiService.put("user", user).then(({ data }) => {
      context.commit(SET_AUTH, data.user);
      return data;
    });
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, data) {
    let menus = [];
    if (data.user.roles[0].name.toLowerCase() == "admin"){
      menus = admin;
    }
    else if (data.user.roles[0].name.toLowerCase() == "manager"){
      menus = manager;
    }
    else if (data.user.roles[0].name.toLowerCase() == "user" || data.user.roles[0].name.toLowerCase() == "staff"){
      menus = userAndStaff;
    }
    state.isAuthenticated = true;
    state.user = data.user;
    state.menu = menus;
    state.token = data.token;
    state.errors = {};
    JwtService.saveToken(state.token);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
