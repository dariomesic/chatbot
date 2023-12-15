<template>
  <base-dialog
    :show="isMailResponseOpen"
    @click-submit="applyResponse"
    @close="$emit('close')"
    :rightButtonText="'Odaberi'"
    :isSubmitDisabled="isSubmitDisabled"
  >
    <div class="main-content">
      <div class="form-control">
        <h3>Unesi opcije za mail</h3>
        <label for="link-text">Prima (obavezno)</label>
        <input
          type="text"
          id="to-text"
          placeholder="Primatelj maila"
          v-model="to"
        />
      </div>

        <div class="form-control">
        <label for="link-url">Kopija (opcionalno)</label>
        <input
          type="text"
          id="copy-text"
          placeholder="Kopija"
          v-model="copy"
        />
      </div>

      <div class="form-control">
        <label for="link-url">Naslov (obavezno)</label>
        <input
          type="text"
          id="name-url"
          placeholder="Naslov"
          v-model="name"
        />
      </div>

      <div class="form-control">
        <label for="link-url">Početak maila (opcionalno)</label>
        <input
          type="text"
          id="beggining-url"
          placeholder="Početak maila"
          v-model="beggining"
        />
      </div>

      <div class="form-control">
        <label for="link-url">Završetak radnje (opcionalno)</label>
        <input
          type="text"
          id="end-url"
          placeholder="Završetak radnje"
          v-model="end"
        />
      </div>

      <div style="display:flex;align-items: center;">
        <input
            type="checkbox"
            :value="attached"
            v-model="attached"
        />
        <p>Priložene konverzacije (opcionalno)</p>
      </div>

      <div style="margin:2em 0 2em 0;font-style: italic;font-weight:bold;font-size:12px">
        <p>Napomena: Kontakt kojeg je unio korisnik uzima se u ovom koraku unutar razgovora</p>
      </div>
    </div>
  </base-dialog>
</template>

<script>
export default {
  props: ["isMailResponseOpen", "mail"],
  emits: ["close", "applyResponse"],
  data(){
    return{
      to: '',
      copy: '',
      name: '',
      beggining: '',
      end: '',
      attached: false,
      emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    }
  },
  computed: {
    isSubmitDisabled() {
      return !(this.to && this.name && this.emailRegex.test(this.to));
    }
  },
  watch: {
    mail: {
      handler(newVal) {
        if (newVal && typeof newVal === "object") {
          this.to = newVal.Prima || '';
          this.copy = newVal.Kopija || '';
          this.name = newVal.Naslov || '';
          this.beggining = newVal['Početak maila'] || '';
          this.end = newVal['Kraj maila'] || '';
          this.attached = newVal.Privitak || false;
        }
      },
      immediate: true
    }
  },
  methods:{
    applyResponse(){
      this.$emit("applyResponse", {'Prima': this.to, 'Kopija': this.copy, 'Naslov': this.name, 'Početak maila': this.beggining, 'Kraj maila': this.end, 'Privitak': this.attached});
      this.$emit('close')
    }
  }
};
</script>
<style scoped>
.form-control {
  margin: 10px 0;
}

input,
label {
  display: block;
  font: inherit;
}

label {
  color: #555353;
  margin-bottom: 6px;
  font-size: 16px;
}

input[type="text"]{
  background-color: #f4f4f4;
  border: none;
  border-bottom: 1px solid #8d8d8d;
  color: #161616;
  font-size: .875rem;
  font-weight: 400;
  height: 2.5rem;
  letter-spacing: .16px;
  line-height: 1.28572;
  outline: 2px solid transparent;
  outline-offset: -2px;
  padding-left: 10px;
  width: calc(100% - 10px);
  transition: background-color 70ms cubic-bezier(.2,0,.38,.9),outline 70ms cubic-bezier(.2,0,.38,.9);
}
input[type="checkbox" i] {
    background-color: initial;
    cursor: default;
    appearance: auto;
    box-sizing: border-box;
    margin: 3px 3px 3px 4px;
    padding: initial;
    border: initial;
    height: 20px;
    width: 20px;
}
</style>