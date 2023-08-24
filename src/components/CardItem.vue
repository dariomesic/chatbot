<template>
  <div
    class="card"
    :class="{ 'selected': isSelected }"
    @click="$emit('click')"
  >
    <label>{{card.id}}</label>
    <div class="right-part">
        <div class="tile">
            <span class="tile-title" :title="'Card ' + card.id">{{'Card ' + card.id}}</span>
            <hr>
            <div style="display:flex;justify-content:space-between;margin-top: 0.75rem;">
                <span class="ctr">
                    <div class="text-style">
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" style="margin-bottom: -0.25rem;margin-right: 0.5rem;">
                            <path d="M12.3 9.3L8.5 13.1 8.5 1 7.5 1 7.5 13.1 3.7 9.3 3 10 8 15 13 10z"></path>
                        </svg>
                        Continue to next step
                        <span></span>
                    </div>
                </span>
                <div style="display:flex">
                    <div>
                        <div></div>
                        <button tabindex="0" type="button">
                            <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Delete" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon">
                                <path d="M12 12H14V24H12zM18 12H20V24H18z"></path><path d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <button tabindex="0" type="button">
                            <img src="../assets/duplicate.png" height="16" width="16" alt="Duplicate">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: Object,
    isSelected: Boolean,
  },
};
</script>

<style scoped>
.card {
  align-items: stretch;
  border: 1px solid transparent;
  display: flex;
  list-style: none;
  max-height: 228px;
  min-height: 3rem;
  padding: 0.5rem 1rem;
  position: relative;
  cursor: pointer;
}

.selected {
  border: 1px solid darkblue;
  background-color: #f0f0f0;
}

.card {
  transition: background-color 0.3s ease-in-out;
}

label{
    align-items: center;
    background-color: #fff;
    cursor: inherit;
    display: flex;
    font-size: .875rem;
    font-weight: 400;
    justify-content: center;
    left: 0;
    letter-spacing: .16px;
    line-height: 1.28572;
    margin-right: 0.125rem;
    padding: 0.25rem 0.5rem;
    position: relative;
}

.right-part{
    background: white;
    width: 100%;
}

.tile{
    flex-direction: column;
    min-height: 3rem;
    padding: 0.75rem;
}

.tile-title{
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    font-size: .75rem;
    font-weight: 400;
    letter-spacing: .32px;
    line-height: 1.33333;
    line-height: 1.67;
    overflow: hidden;
    word-break: break-word;
}

.ctr{
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    width: 75%;
}
</style>
