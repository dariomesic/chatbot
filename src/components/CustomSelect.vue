<template>
    <div class="custom-select-wrapper">
        <div class="custom-select" @click="optionsVisible = !optionsVisible">
            <div class="selected-option">
            <span class="option-text">{{ title }}</span>
            <svg class="arrow-icon" viewBox="0 0 16 16">
                <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
                <title>Open menu</title>
            </svg>
            </div>
            <div v-if="optionsVisible" class="options">
                <div class="option" v-for="option in options" :key="option" @click="$emit('selected', option); title = option">
                    {{ option }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        options: Array
    },
    emits:['selected'],
    data(){
        return{
            optionsVisible: false,
            title: this.options[0]
        }
    },
    
}
</script>
<style scoped>
.custom-select-wrapper {
  display: flex;
  align-items: center;
}

.custom-select {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f4f4f4;
  border-bottom: 1px solid #161616;
  padding: 0 3rem 0 1rem;
  height: 2rem;
  max-height: 2rem;
  cursor: pointer;
}

.selected-option {
  display: flex;
  align-items: center;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 1rem;
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
}
</style>