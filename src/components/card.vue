<template>
  <div class="card" :class="isBlack ? 'card-black' : 'card-red'">
    <div style="font-size: 1.5rem"> 
      <b>{{ card.code }} {{ card.colorLabel}}</b>
    </div>
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
    width: 100px;
    height: 120px;
    margin: 1%;
    animation: apparition 0.4s forwards ease-in-out;
    border-radius: 5px;
}

.card-black {
    color: rgb(22, 22, 22);
}

.card-red {
    color: rgb(255, 38, 0);
}

@keyframes apparition {
    from { opacity: 0;}
    to {opacity: 1;}
}
</style>