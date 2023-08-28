<template>
  <div class="condition-group">
    <div class="collapsible-section">
      <div class="section-header" @click="toggleSection">
        <span>Uvjeti</span>
        <div>
          {{conditions.length}} {{conditions.length == 1 ? 'uvjet' : 'uvjeta'}}
          <svg class="collapse-icon" viewBox="0 0 16 16">
            <path v-if="isCollapsed" d="M3 5l5 5 5-5" />
            <path v-else d="M3 11l5-5 5 5" />
          </svg>
        </div>
      </div>
      <hr/>
      <div v-if="!isCollapsed" class="section-content">
        <ul>
          <li v-for="(item, index) in conditions" :key="index" style="margin-bottom: 1.5rem;">
            <div style="align-items: center;display: flex;margin-bottom: 1.5rem;">
              Ako je
              <CustomSelect :options="['Sve']" style="margin-left: 0.5rem;min-width:6rem;border-bottom-color:transparent"/>
              od ovoga istina:
            </div>
            <div v-for="step in item.steps" :key="step" style="display:flex;margin:0 0 0.5rem">
              <div style="margin-right:0.25rem;max-width:1.5rem;min-width:1.5rem"/>
              <CustomSelect :options="['5.Nakon']" style="margin-right:3px;color:var(--main__color)"/>
              <CustomSelect :options="['is']" style="margin-right:3px;;color:var(--main__color)"/>
              <CustomSelect :options="['BESPLATNA']" style="margin-right:3px;;color:var(--main__color)"/>
              <button>x</button>
            </div>
            <div style="margin:0 0.5rem 0">
              i <button class="color-button" @click="addCondition(index)">Dodaj uvjet +</button>
            </div>
          </li>
        </ul>
        <hr/>
        <button class="color-button" @click="addConditionGroup">Nova grupa uvjeta +</button>
      </div>
    </div>
  </div>
</template>

<script>
import CustomSelect from './CustomSelect.vue'
export default {
  components: {CustomSelect},
  data() {
    return {
      conditions: [{ steps: [{}] }],
      isCollapsed: false
    };
  },
  methods: {
    addCondition(conditionIndex) {
      this.conditions[conditionIndex].steps.push({});
    },
    addConditionGroup() {
      this.conditions.push({ steps: [{}] })
    },
    toggleSection() {
      this.isCollapsed = !this.isCollapsed;
    }
  }
};
</script>

<style scoped>
.collapsible-section {
  margin-bottom: 1rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.collapse-icon {
  width: 16px;
  height: 16px;
  fill: #333;
}

.section-content {
  margin-top: 0.5rem;
}
</style>