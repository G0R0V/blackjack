<template>
  <div id="boardgame">
    <div class="board">
      <div
        style="
          color: white;
          position: absolute;
          bottom: 0%;
          left: 0;
          font-size: 1.3rem;
        "
      >
        <h2>
          <b>Your money : {{ money }}$</b>
        </h2>
        <h2>
          <b  v-if="roundStarted">Payment : {{ payment }}$</b>
        </h2>
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
          <div class="container-buttons">
            <button class="btn">
              <b>{{ userScore }}</b>
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer
      :userWin="userWin"
      :userScore="userScore"
      :roundStarted="roundStarted"
      :roundFinished="roundFinished"
      :doubleAllowed="doubleAllowed"
      :userStand="userStand"
      :userCards="userCards"
      :money="money"
      @bet="bet"
      @hit="hitUserCard"
      @double="double"
      @split="split"
      @stand="stand"
      @startGame="startGame"
    />
  </div>
</template>

<script src="./index.js">
</script>
