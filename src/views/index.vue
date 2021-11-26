<template>
  <div id="boardgame">
    <div>
      <b>Your money : {{ money }}$</b>
      <div v-if="roundStarted">
        <b>Your payment : {{ payment }}$</b>
      </div>
    </div>

    <div v-if="roundStarted" class="boardcard">
      <!-- Croupier's cards -->
      <div class="board-croupier">
        <div class="container-buttons" style="margin-top: 0">
          <button class="btn">
            <b>{{ croupierScore }}</b>
          </button>
        </div>
        <div class="container-cards">
          <Card
            v-for="(card, index) in croupierCards"
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

    <div class="container-buttons" v-if="!roundStarted">
      <input class="input-text" type="number" v-model="payment" />
      <button class="btn btn-bet" @click="bet()">Bet</button>
    </div>

    <div class="container-buttons" v-else>
      <button class="btn" @click="startGame()">
        <span>&#8635;</span>
      </button>
      <button class="btn btn-draw" @click="drawUserCard()" v-if="!userStay && userCards.length >= 2">
        Draw
      </button>
      <button class="btn btn-stay" @click="stay()" v-if="!userStay  && userCards.length >= 2">
        Stay
      </button>
      <button
        class="btn"
        :class="{
          'text-lose': userWin == false,
          'text-win': userWin == true,
          'text-equal': userWin === null
        }"
      >
        <b>{{ userScore }}</b>
      </button>
    </div>
  </div>
</template>

<script src="./index.js">
</script>
