<template>
  <div class="footer">
    <div
      class="container container-flex between"
      v-if="!roundStarted || roundFinished"
    >
      <div class="container-flex between" style="flex-basis: 60%">
        <button class="btn btn-danger btn-sm" @click="minus()" :disabled="payment == 5">-</button>
        <button class="btn btn-success btn-sm" @click="plus()">+</button>
        <span class="payment-display container-flex">{{ payment }} $</span>
      </div>
      <button class="btn btn-bet" @click="bet()">Bet</button>
    </div>

    <div class="container container-flex" v-else>
      <button class="btn btn-danger" @click="startGame()">
        <span>&#8635;</span>
      </button>
      <button
        class="btn"
        style="margin-left: 5%"
        @click="double()"
        v-if="!userStand && userCards.length >= 2 && doubleAllowed"
      >
        Double
      </button>
      <button
        class="btn"
        @click="hit()"
        v-if="!userStand && userCards.length >= 2"
      >
        Hit
      </button>
      <button
        class="btn btn-warning"
        @click="stand()"
        v-if="!userStand && userCards.length >= 2"
        style="margin-left: 5%"
      >
        Stand
      </button>
    </div>
  </div>
</template>

<script src="./footer.js">
</script>
