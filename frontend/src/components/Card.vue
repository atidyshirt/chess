<template>
  <div class="card">
    <div class="column">
        <h4><b> {{ title }} </b></h4>
        <hr>
        <p> {{ win }} </p>
        <p> {{ loss }} </p>
        <p> {{ draw }} </p>
        <p> {{ rating }} </p>
      </div>
    </div> 
</template>

<script>
export default {
  name: "Card",
  props: {
    title: String,
    win: Number,
    loss: Number,
    draw: Number,
    rating: Number,
  },
}

</script>

<style scoped>
img {
  border-radius: 4px;
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
  display: inline-block;
  padding: 4%;
  width: 100%;
  border-radius: 10px;
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
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

