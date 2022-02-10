<template>
  <div class="profile">
    <h1> Profile Placeholder </h1>
  </div>
</template>

<script>
// import Api from '../api.js'

export default {
  data() {
      return {
        firstName: "",
        lastName: "",
        username: "",
        country: "",
        profileImage: "",
        errorMessage: "",
      }
  },

  methods: {
    /* 
    TODO: create method to store local data in a conjunctive store
    TODO: implement a method to pull data directly from the database needed for profile 
          (through backend API)
    FIXME: fix the below method in order to use local storage method

    basicUserInfo: async function () {
        let response;
        try {
            response = await Api.userInfo(localStorage.username);
            this.username = localStorage.username;
            this.profileImage = response.data.image;
            this.username = localStorage.username;
          } catch(err) {
          this.errorMessage = err.userFacingErrorMessage;
        }
      },
      */
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
