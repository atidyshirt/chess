<template>
  <div class="profile">
    <PictureCard 
      :picture="user.profileImage" 
      title="Jordan Pyott" 
      :link="user.link"
      :subtext1="user.username.username" 
      :subtext2="user.country.name" 
      :subtext3="user.status" 
      :subtext4="user.followers"
    />
  </div>
  <div class="stats">
    <ul>
      <li>
        <Card 
          title="Blitz" 
          :win="blitz.record.win" 
          :loss="blitz.record.loss" 
          :draw="blitz.record.draw" 
          :rating="blitz.last.rating"
        />
      </li>
      <li>
        <Card 
          title="Rapid" 
          :win="rapid.record.win" 
          :loss="rapid.record.loss" 
          :draw="rapid.record.draw" 
        />
      </li>
      <li>
        <Card 
          title="Bullet" 
          :win="bullet.record.win" 
          :loss="bullet.record.loss" 
          :draw="bullet.record.draw" 
          :rating="bullet.last.rating"
        />
      </li>
      <li>
        <Card 
          title="Daily" 
          :win="daily.record.win" 
          :loss="daily.record.loss" 
          :draw="daily.record.draw" 
          :rating="daily.last.rating"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import { Api } from '../api.js'
import PictureCard from '@/components/PictureCard.vue'
import Card from '@/components/Card.vue'

export default {
  name: "Profile",
  components: {
      PictureCard,
      Card
  },
  data() {
      return {
        user: {
          firstName: "",
          lastName: "",
          username: "",
          country: "",
          profileImage: "../assets/no-profile.png",
          errorMessage: "",
          link: "",
          followers: 0,
        },
        blitz: {},
        bullet: {},
        rapid: {},
        daily: {},
        errorMessage: "",
      }
  },

  mounted() {

      /* FIXME: fix the below method in order to use local storage instead of hardcoding username */
      this.basicUserInfo({ username: "jordy-pyott" });
      this.basicUserStats({ username: "jordy-pyott" });
  },

  methods: {

    basicUserInfo: async function (username) {
        let response;
        try {
            response = await Api.userInfo(username);
            this.user.username = username;
            this.user.profileImage = response.data.avatar;
            this.user.country = await fetch(response.data.country).then(response => response.json());
            this.user.status = response.data.status;
            this.user.followers = response.data.followers;
            this.user.link = response.data.url;
          } catch(err) {
            this.errorMessage = err.userFacingErrorMessage;
            return;
          }
      },

    basicUserStats: async function (username) {
        let response;
        try {
            response = await Api.userStats(username);
            console.log(response);
            Vue.set(this, 'blitz', response.data.body.chess_blitz);
            Vue.set(this, 'bullet', response.data.body.chess_bullet);
            Vue.set(this, 'rapid', response.data.body.chess_rapid);
            Vue.set(this, 'daily', response.data.body.chess_daily);
          } catch(err) {
            this.errorMessage = err.userFacingErrorMessage;
            return;
          }
      },
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul {
  display: grid; 
  grid-auto-columns: 1fr; 
  grid-auto-rows: 1fr; 
  grid-template-rows: 1fr 1fr; 
  grid-template-columns: 1fr 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "col1-item1 col2-item1",
    "col1-item4 col2-item3",
}

.stats {
  width: 68%;
  margin: auto;
}

.profile {
  width: 60%;
  display: inline-block;
}

li {
  display: inline-flex;
  padding-bottom: 6%;
  padding-right: 12%;
  margin: 0;
  list-style-type: none;
}
a {
  color: #42b983;
}
</style>
