<template>
  <div class="indicator-mask">
    <span class="loader"></span>
  </div>
</template>

<script>
export default {
  name: "LoadingModal",
};
</script>
<style scoped>
.indicator-mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    visibility: visible;
    opacity: 1;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    transition: opacity 0.3s, visibility 0.3s;
}

.loader {
  position: absolute;
  display: flex;
  align-items: center;
  margin-top: auto;
  justify-content: center;
  width: 100%;
  max-width: 5rem;
  top: 50%;
  left: 50%;
  margin-bottom: 3rem;
}
.loader:before,
  .loader:after {
    content: "";
    position: absolute;
    border-radius: 50%;
    animation: pulsOut 1.8s ease-in-out infinite;
    filter: drop-shadow(0 0 1rem rgba(255, 255, 255, 0.75));
  }
  .loader:before {
    width: 100%;
    padding-bottom: 100%;
    box-shadow: inset 0 0 0 1rem #fff;
    animation-name: pulsIn;
  }
  .loader:after {
    width: calc(100% - 2rem);
    padding-bottom: calc(100% - 2rem);
    box-shadow: 0 0 0 0 #fff;
  }

  @keyframes pulsIn {
    0% {
      box-shadow: inset 0 0 0 1rem #fff;
      opacity: 1;
    }
    50%, 100% {
      box-shadow: inset 0 0 0 0 #fff;
      opacity: 0;
    }
  }

  @keyframes pulsOut {
    0%, 50% {
      box-shadow: 0 0 0 0 #fff;
      opacity: 0;
    }
    100% {
      box-shadow: 0 0 0 1rem #fff;
      opacity: 1;
    }
  }

</style>