import { reactive } from "vue";

// This is the state object. It is reactive and can not be accessed directly by components.
// Use getters and actions to modify this object.

const state = new reactive({
  userId: localStorage.getItem('userId'),
  authToken: localStorage.getItem('authToken'),
});

// This is the globally accessible store. It allows the state to be read and modified.
// Currently, vue has been set up to give access to this object using this.$stateStore within components.
export const store = {
  getters: {
    getAuth: () => {
      return state.authToken;
    },
    getUserId: () => {
      return state.userId;
    },
    getLoggedIn: () => {
      if (state.userId != undefined || state.userId != null) {
        return true
      } else {
        return false
      }
    },
  },
  actions: {
    // Set the currently logged in user and sync with persistent storage
    setAuthUser: (userId, userToken) => {
      state.userId = userId;
      state.authToken = userToken;
      localStorage.setItem("userId", state.userId);
      localStorage.setItem("authToken", state.authToken);
    },
    clearAuthUser: () => {
      state.userId = null;
      state.authToken = null;
    },
  },
};
