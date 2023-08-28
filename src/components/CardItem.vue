<template>
  <div
    class="card"
    :class="{ 'selected': isSelected }"
    @click="$emit('click')"
  >
    <label>{{card.id}}</label>
    <div class="right-part">
        <div class="tile">
            <span class="tile-title" :title="'Card ' + card.id">{{'Kartica ' + card.id}}</span>
            <hr>
            <div style="display:flex;justify-content:space-between;">
                <span class="ctr">
                    <div class="text-style">
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" style="margin-bottom: -0.25rem;margin-right: 0.5rem;">
                            <path d="M12.3 9.3L8.5 13.1 8.5 1 7.5 1 7.5 13.1 3.7 9.3 3 10 8 15 13 10z"></path>
                        </svg>
                        Nastavite na sljedeći korak
                        <span></span>
                    </div>
                </span>
                <div style="display:flex;position:absolute;align-items: center;right: 1rem;">
                    <div style="background-color: #f4f4f4;height: 1.5rem;width: 1px;"></div>
                    <button @click="handleRemoveClick" tabindex="0" type="button" aria-label="Delete">
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Delete" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon">
                            <path d="M12 12H14V24H12zM18 12H20V24H18z"></path><path d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"></path>
                        </svg>
                    </button>
                </div>
                <div style="position:absolute;right:3.5rem">
                    <button tabindex="0" type="button" aria-label="Duplicate">
                        <img src="../assets/duplicate.png" height="16" width="16" alt="Duplicate">
                    </button>
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
  methods:{
    handleRemoveClick(event) {
      event.stopPropagation();
      this.$emit('remove', this.card.id)
    },
  }
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
  transition: background-color 0.3s ease-in-out;
}

.selected {
  border: 1px solid darkblue;
  background-color: #f0f0f0;
}

.card {
  transition: background-color 0.3s ease-in-out;
}

/* Apply hover effect when not selected GREAT THING */
.card:not(.selected):hover .right-part,
.card:not(.selected):hover label {
  background: var(--hover__color);
}

.selected .right-part,
.selected label {
  box-shadow: 0 0 0 2px #161616;
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
    overflow: hidden;
}

.tile{
    flex-direction: column;
    min-height: 3rem;
    padding: 0.75rem;
    position: relative;
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

.tile button{
    padding-left: .6875rem;
    padding-right: .6875rem;
    min-height: 2.5rem;
}

.tile button:hover{
    background-color: var(--hover__color);
    transition: .3s;
}
</style>
