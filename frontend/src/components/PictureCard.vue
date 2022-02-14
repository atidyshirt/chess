<template>
     <div class="card">
       <div class="row">
         <div class="column" style="text-align: center;">
          <img v-bind:src="picture" alt="Image not found" />
          <div class="container">
            <form :action="link">
              <button> Chess.com </button>
            </form>
          </div>
          </div>
           <div class="column">
              <div class="container">
                <h4><b> {{ title }} </b></h4>
                <p> Username: {{ subtext1 }} </p>
                <p> Country: {{ subtext2 }} </p>
                <p> Status: {{ subtext3 }} </p>
                <p> Followers: {{ subtext4 }} </p>
              </div>
            </div>
        </div>
    </div> 
</template>

<script>
export default {
  name: "PictureCard",
  props: {
    picture: String,
    title: String,
    link: String,
    subtext1: String,
    subtext2: String,
    subtext3: String,
    subtext4: Number,
  },
}

</script>

<style scoped>
img {
  border-radius: 4px;
}

/* CSS */
button {
  background-color: #13aa52;
  border: 1px solid #13aa52;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, .1) 0 2px 4px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: "Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  font-weight: 400;
  outline: none;
  outline: 0;
  width: 92%;
  padding: 10px 25px;
  text-align: center;
  transform: translateY(0);
  transition: transform 150ms, box-shadow 150ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

button:hover {
  box-shadow: rgba(0, 0, 0, .15) 0 3px 9px 0;
  transform: translateY(-2px);
}

@media (min-width: 768px) {
  button {
    padding: 10px 30px;
  }
}

.row {
  display: flex;
}

/* Create two equal columns that sits next to each other */
.column {
  text-align: left;
  flex: 50%;
  padding: 2%;
}

.card {
  padding: 4%;
  width: 100%;
  border-radius: 10px;
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  box-sizing: border-box;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}
</style>

