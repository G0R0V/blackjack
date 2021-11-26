<template>
  <div class="card" :class="isBlack ? 'card-black' : 'card-red'">
    <div>
      <b>{{ card.code }} {{ card.color}}</b>
    </div>
    <div>{{ card.value }}</div>
  </div>
</template>

<script src="./card.js">
</script>

<style scoped>
.card {
    background-color: whitesmoke;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    margin: 1%;
    animation: apparition 0.8s forwards ease-in-out;
}

.card-black {
    color: rgb(22, 22, 22);
}

.card-red {
    color: tomato;
}

@keyframes apparition {
    from { opacity: 0;}
    to {opacity: 1;}
}
</style>