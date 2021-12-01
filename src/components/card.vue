<template>
  <div class="card" :class="{ 'card-black': isBlack, 'card-red': !isBlack , 'rotate': card.double }">
    <div class="card-value card-value-left">
      <div>{{ card.code }}</div>
      <div>{{ card.colorLabel }}</div>
    </div>
    <div class="card-value card-value-right">
      <div>{{ card.colorLabel }}</div>
      <div>{{ card.code }}</div>
    </div>
    <div class="card-center">
      <div>{{ card.code }}</div>
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
  width: 90px;
  height: 120px;
  margin: 1%;
  animation: apparition 0.4s forwards ease-in-out;
  border-radius: 5px;
  position: relative;
}

.card-black {
  color: rgb(22, 22, 22);
}

.card-red {
  color: rgb(255, 38, 0);
}

.card-value {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  font-size: 1.2rem;
}

.card-value-left {
  top: 2%;
  left: 3%;
}
.card-value-left > *:last-child {
  margin-top: -10px;
}

.card-value-right {
  bottom: 0%;
  right: 3%;
}
.card-value-right > *:first-child {
  margin-bottom: -5px;
}
.card-center {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-weight: 700;
  font-size: 2rem;
}
@keyframes apparition {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.rotate {
  transform: rotate(-90deg);
  border: 1px solid rgb(164, 164, 164);
}
</style>