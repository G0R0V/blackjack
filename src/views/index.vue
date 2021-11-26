<template>
  <div id="boardgame">
    <div style="color: white; position: absolute; top: 0; left: 0">
      <h2>
        <b>Your money : {{ money }}$</b>
        <div v-if="roundStarted && !roundFinished">
          <b>Your payment : {{ payment }}$</b>
        </div>
      </h2>
    </div>

    <div style="margin: auto">
      <h3><b>Dealer</b></h3>
    </div>

    <div v-if="roundStarted" class="boardcard">
      <!-- Dealer's cards -->
      <div class="board-croupier">
        <div class="container-buttons" style="margin-top: 0">
          <button class="btn">
            <b>{{ dealerScore }}</b>
          </button>
        </div>
        <div class="container-cards">
          <Card
            v-for="(card, index) in dealerCards"
            :key="index"
            :card="card"
          ></Card>
        </div>
      </div>

      <!-- User's cards -->
      <div class="board-user">
        <div class="container-cards">
          <Card
            v-for="(card, index) in userCards"
            :key="index"
            :card="card"
          ></Card>
          <b v-if="isUserBlackjack" style="color: red">Blackjack !</b>
        </div>
      </div>
    </div>

    <div class="container-buttons" v-if="!roundStarted || roundFinished">
      <input class="input-text" type="number" v-model="payment" step="5" />
      <button class="btn btn-bet" @click="bet()">Bet</button>
      <button
        class="btn"
        :class="{
          'text-lose': userWin == false,
          'text-win': userWin == true,
          'text-equal': userWin === null,
        }"
      >
        <b>{{ userScore }}</b>
      </button>
    </div>

    <div class="container-buttons" v-else>
      <button class="btn" @click="startGame()">
        <span>&#8635;</span>
      </button>
      <button
        class="btn btn-draw"
        @click="hitUserCard()"
        v-if="!userStand && userCards.length >= 2"
      >
        Draw
      </button>
      <button
        class="btn btn-draw"
        @click="double()"
        v-if="!userStand && userCards.length >= 2 && doubleAllowed"
      >
        Double
      </button>
      <button
        class="btn btn-stay"
        @click="stand()"
        v-if="!userStand && userCards.length >= 2"
      >
        Stay
      </button>
      <button
        class="btn"
        :class="{
          'text-lose': userWin == false,
          'text-win': userWin == true,
          'text-equal': userWin === null,
        }"
      >
        <b>{{ userScore }}</b>
      </button>
    </div>
    <div style="margin: auto">
      <h3><b>You</b></h3>
    </div>
  </div>
</template>

<script src="./index.js">
</script>
