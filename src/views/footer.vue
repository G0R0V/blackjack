<template>
  <div class="footer"> 
    <div v-if="roundFinished && money == 0"
      class="container container-flex">
        <button class="btn" @click="resetGame()">Retry</button>
    </div>
    <div
      class="container container-flex between"
      v-else-if="!roundStarted || roundFinished"
    >
      <div class="container-flex between" style="flex-grow: 1">
        <button
          class="btn btn-danger btn-sm text-xl"
          @click="minus()"
          :disabled="payment == 5"
        >
          -
        </button>
        <button class="btn btn-success btn-sm text-xl" @click="plus()">+</button>
        <span class="payment-display container-flex">{{ payment }} $</span>
      </div>
      <button class="btn btn-bet" @click="bet()">Bet</button>
    </div>

    <div
      class="container container-flex between"
      v-else-if="!userStand && userCards.length >= 2"
    >
      <div class="container-flex">
        <button class="btn" @click="split()" v-if="splitAllowed">Split</button>
        <button class="btn" @click="double()" v-if="doubleAllowed">
          Double
        </button>
        <button class="btn btn-hit" @click="hit()">Hit</button>
      </div>

      <button class="btn btn-warning" @click="stand()" style="margin-left: 5%">
        Stand
      </button>
    </div>
  </div>
</template>

<script src="./footer.js">
</script>
