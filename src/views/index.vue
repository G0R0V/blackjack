<template>
  <div id="boardgame">
    <div class="board">
      <div v-if="roundStarted" class="boardcard">
        <!-- Dealer's cards -->
        <div class="board-croupier">
          <div class="score-display">
            {{ dealerScore }}
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
          <div
            class="score-display"
            :class="
              userWin !== undefined
                ? userWin === false
                  ? 'bg-danger'
                  : userWin === true
                  ? 'bg-success'
                  : 'bg-action'
                : ''
            "
          >
            {{ userScore }}
          </div>
        </div>
      </div>

      <!-- Balance -->
      <div class="balance-display container-flex between">
        <div>
          <b>Balance {{ money }}$</b>
        </div>
        <div v-if="roundStarted">
          <b>Bet {{ payment }}$</b>
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
      :splitAllowed="splitAllowed"
      @bet="bet"
      @hit="hitUserCard"
      @double="double"
      @split="split"
      @stand="stand"
      @resetGame="resetGame"
    />
  </div>
</template>

<script src="./index.js">
</script>
