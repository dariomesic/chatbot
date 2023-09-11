<template>
  <div class="condition-group">
    <div class="collapsible-section">
      <hr />
      <button class="condition-button" type="button" @click="toggleSection">
        <svg class="collapse-icon" viewBox="0 0 16 16">
          <path v-if="isCollapsed" d="M3 5l5 5 5-5" />
          <path v-else d="M3 11l5-5 5 5" />
        </svg>
        <div style="margin: 0 0 0 1rem; width: 100%;">
          <div style="align-items: center; display: flex; justify-content: space-between; padding-right: 1rem;">
            Uvjeti
            <span style="font-size: .75rem">{{ conditions.conditionsList.length }} {{ conditions.conditionsList.length == 1 ? 'uvjet' : 'uvjeta' }}</span>
          </div>
        </div>
      </button>
      <div v-if="!isCollapsed" class="section-content">
        <div style="align-items: center; display: flex; margin-bottom: 1.5rem;">
          Ako je
          <CustomSelect :options="['Sve']" :value="'Sve'" style="margin-left: 0.5rem; margin-right: 6px; border-bottom-color: transparent" />
          od ovoga istina:
        </div>
        <div v-for="(step, step_index) in conditions.conditionsList" :key="step_index" style="display: flex; margin: 0 0 0.5rem">
          <div style="margin-right: 0.25rem; max-width: 1.5rem; min-width: 1.5rem"></div>
          <CustomSelect :options="['5.Nakon']" :value="step.subject" @update:value="localConditions.conditionsList[step_index]['subject'] = $event" style="margin-right: 3px; color: var(--main__color)" />
          <CustomSelect :options="['je', 'nije']" :value="step.predicate" @update:value="localConditions.conditionsList[step_index]['predicate'] = $event" style="margin-right: 3px; color: var(--main__color)" />
          <CustomSelect :options="['BESPLATNA']" :value="step.object" @update:value="localConditions.conditionsList[step_index]['object'] = $event" style="margin-right: 3px; color: var(--main__color)" />
          <button @click="deleteStep(step_index)">
            <svg style="margin-top: 6px;" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Close" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon">
              <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path>
            </svg>
          </button>
        </div>
        <div style="margin: 0 0.5rem 0">
          i <button class="color-button" @click="addCondition">Dodaj uvjet +</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomSelect from './CustomSelect.vue'
export default {
  components: { CustomSelect },
  props: ['conditions'],
  data() {
    return {
      isCollapsed: false,
      localConditions: { ...this.conditions }, /* ODLICNA STVAR JER RADI DUBOKU KOPIJU KOJA SE ODMAH SPREMA BEZ EMITANJA, MOZE JOJ SE DIRETKNO PRISTUPIT */
    };
  },
  methods: {
    addCondition() {
      this.localConditions.conditionsList.push({});
    },
    deleteStep(stepIndex) {
      if (this.localConditions.conditionsList.length > 1) {
        this.localConditions.conditionsList.splice(stepIndex, 1);
      }
    },
    toggleSection() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>

<style scoped>
.collapsible-section {
  margin-bottom: 1rem;
}

.collapse-icon {
  width: 16px;
  height: 16px;
  fill: #333;
  flex: 0 0 1rem;
  height: 1rem;
  margin: 2px 1rem 0 0;
  outline: 2px solid transparent;
  outline-offset: -2px;
  transition: all .11s cubic-bezier(.2,0,.38,.9);
}

.section-content {
  margin-top: 0.5rem;
}

.condition-button{
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  width:100%;
  min-height: 2.5rem;
  padding: .625rem 0;
}

.condition-button:hover:hover{
  background: var(--hover__color);
  transition: .2s;
}

.section-content button{
  padding-left: .4375rem;
  padding-right: .4375rem;
}

.section-content button:hover{
  background-color: var(--hover__color);
  transition: .2s;
}
</style>