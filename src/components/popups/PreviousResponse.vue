<template>
  <base-dialog
    :show="isPreviousResponseOpen"
    @click-submit="applyResponse"
    @close="$emit('close')"
    :rightButtonText="'Odaberi'"
  >
    <div class="content-wrapper">
      <h3>Prethodni koraci</h3>
      <div class="subtitle-wrapper">
        <p>Odaberite prethodni odgovor</p>
      </div>
      <div class="main-wrapper" style="margin:5% 0 5% 0">
        <CustomSelect
          :options="rules.map(function (el) { return el.assistant_answer })"
          :placeholder="'Odaberite prethodni odgovor'"
          :value="selected"
          @update:value="selected = $event"
        />
      </div>
    </div>
  </base-dialog>
</template>

<script>
import CustomSelect from "../CustomSelect.vue";
export default {
  components: { CustomSelect },
  props: ["isPreviousResponseOpen", "rules", "selectedAnswer"],
  emits: ["close", "addResponse"],
  data(){
    return{
      selected: this.selectedAnswer ? this.selectedAnswer.name : ''
    }
  },
  methods:{
    applyResponse(){
      var foundId = ''
      this.rules.forEach((item) => {
        if (item.assistant_answer === this.selected) {
          foundId = item.id;
          return;
        }
      })
      this.$emit("addResponse", {name: this.selected, id: foundId});
      this.$emit('close')
    }
  }
};
</script>