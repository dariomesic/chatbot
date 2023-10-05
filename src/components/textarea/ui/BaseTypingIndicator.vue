<template>
  <div class="ticontainer">
    <div class="tiblock">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<style scoped>
.tiblock {
  align-items: center;
  display: flex;
  height: 17px;
}

.ticontainer .dot {
  background-color: #1a90ff;
}

.dot {
  animation: mercuryTypingAnimation 1.5s infinite ease-in-out;
  border-radius: 3px;
  display: inline-block;
  height: 6px;
  margin-right: 2px;
  width: 6px;
}

@keyframes mercuryTypingAnimation {
  0% {
    -webkit-transform: translateY(0px);
  }
  28% {
    -webkit-transform: translateY(-5px);
  }
  44% {
    -webkit-transform: translateY(0px);
  }
}

.dot:nth-child(1) {
  animation-delay: 200ms;
}
.dot:nth-child(2) {
  animation-delay: 300ms;
}
.dot:nth-child(3) {
  animation-delay: 400ms;
}
</style>
