<template>
  <base-dialog
    :show="isRegexOpen"
    @click-submit="applyRegex"
    @close="$emit('close')"
    :buttonText="'Odaberi'"
  >
    <div class="content-wrapper">
      <h3>Prethodni koraci</h3>
      <div class="subtitle-wrapper">
        <p>Odaberite prethodni odgovor</p>
      </div>
      <hr />
      <div class="main-wrapper">
        <div class="form-control">
          <label for="regex-options">Prethodni koraci</label>
          <template v-if="selectedRegex !== customRegexButton">
            <CustomSelect
              :options="rules_answers"
              :placeholder="'Odaberite prethodni odgovor'"
              :value="selectedAnswer"
              @update:value="selectedAnswer = $event"
            />
          </template>
          <template v-else>
            <div class="input-wrapper">
              <input
                type="text"
                placeholder="Odaberite prethodni odgovor"
                v-model.trim="customRegex"
              />
              <button class="remove-input" @click="toggleCustomInput">X</button>
            </div>
          </template>
        </div>
        <hr />
      </div>
    </div>
  </base-dialog>
</template>

<script>
import CustomSelect from "../CustomSelect.vue";
export default {
  components: { CustomSelect },
  props: ["rules_answers", selectedAnswer],
  emits: ["close"],
};
</script>