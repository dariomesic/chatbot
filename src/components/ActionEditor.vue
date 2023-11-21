<template>
    <div class="header">
        <div class="input-container">
            <input @input="$emit('updateText', $event.target.value)" placeholder="Prazno polje" type="text" aria-describedby="" autocomplete="off" maxlength="128" :value="text" class="custom-input"/>
            <div class="icon-container"><svg class="bi-pencil" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m104.175 90.97-4.252 38.384 38.383-4.252L247.923 15.427V2.497L226.78-18.646h-12.93zm98.164-96.96 31.671 31.67" class="cls-1" style="fill:none;fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1" transform="translate(-77.923 40.646)"></path><path d="m195.656 33.271-52.882 52.882" style="fill:none;fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:5;stroke-dasharray:none;stroke-opacity:1" transform="translate(-77.923 40.646)"></path></g></svg></div>
        </div>
        <div style="flex: 1 1"/>
        <div style="display:flex">
            <span v-show="disableSaveButton" class="animated-text"><span style="vertical-align: middle;display: inline-block;margin-top: -4px;margin-right: 3px;"><svg class="bi-pencil" height="20" width="20" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000" transform="translate(0, 3)" > <g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" ></g> <g id="SVGRepo_iconCarrier"> <path style="fill: #ff9900" d="M507.494,426.066L282.864,53.536c-5.677-9.415-15.87-15.172-26.865-15.172 c-10.994,0-21.188,5.756-26.865,15.172L4.506,426.066c-5.842,9.689-6.015,21.774-0.451,31.625 c5.564,9.852,16.001,15.944,27.315,15.944h449.259c11.314,0,21.751-6.093,27.315-15.944 C513.509,447.839,513.336,435.755,507.494,426.066z" ></path> <path style="fill: #ffdc35" d="M255.999,38.365c-10.994,0-21.188,5.756-26.865,15.172L4.506,426.066 c-5.842,9.689-6.015,21.774-0.451,31.625c5.564,9.852,16.001,15.944,27.315,15.944h224.629L255.999,38.365L255.999,38.365z" ></path> <path style="fill: #f20013" d="M445.326,432.791H67.108c-3.591,0-6.911-1.909-8.718-5.012c-1.807-3.104-1.827-6.934-0.055-10.056 L247.23,85.028c1.792-3.155,5.139-5.106,8.767-5.107c0.001,0,0.003,0,0.004,0c3.626,0,6.974,1.946,8.767,5.099l189.324,332.694 c1.777,3.123,1.759,6.955-0.047,10.061S448.918,432.791,445.326,432.791z M84.436,412.616h343.543L256.013,110.423L84.436,412.616z" ></path> <path style="fill: #ff4b00" d="M256.332,412.616H84.436l171.576-302.192l-0.01-30.501h-0.005c-3.628,0.001-6.976,1.951-8.767,5.107 L58.336,417.722c-1.773,3.123-1.752,6.953,0.055,10.056c1.807,3.104,5.127,5.012,8.718,5.012h189.224v-20.175H256.332z" ></path> <path style="fill: #533f29" d="M279.364,376.883c0,12.344-10.537,23.182-22.88,23.182c-13.246,0-23.182-10.838-23.182-23.182 c0-12.644,9.935-23.182,23.182-23.182C268.826,353.701,279.364,364.238,279.364,376.883z M273.644,319.681 c0,9.333-10.236,13.246-17.462,13.246c-9.634,0-17.762-3.914-17.762-13.246c0-35.826-4.214-87.308-4.214-123.134 c0-11.741,9.634-18.365,21.977-18.365c11.741,0,21.677,6.623,21.677,18.365C277.858,232.373,273.644,283.855,273.644,319.681z" ></path> </g> </svg></span>
            <span style="vertical-align: middle;display: inline-block;">Nespremljene promjene!</span></span>
            <button @click="$emit('save')" tabindex="0" type="button" :disabled="!disableSaveButton">
                <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Saved" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" role="img" class="bx--btn__icon">
                    <path d="M13.9,4.6l-2.5-2.5C11.3,2.1,11.1,2,11,2H3C2.4,2,2,2.4,2,3v10c0,0.6,0.4,1,1,1h10c0.6,0,1-0.4,1-1V5	C14,4.9,13.9,4.7,13.9,4.6z M6,3h4v2H6V3z M10,13H6V9h4V13z M11,13V9c0-0.6-0.4-1-1-1H6C5.4,8,5,8.4,5,9v4H3V3h2v2c0,0.6,0.4,1,1,1	h4c0.6,0,1-0.4,1-1V3.2l2,2V13H11z"></path>
                </svg>
            </button>
            <div></div>
            <button @click="route()" tabindex="0" type="button">
                <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Close" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon">
                    <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path>
                </svg>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props: ['text', 'disableSaveButton'],
    emits: ['save'],
    methods:{
      route(){
        this.$router.push({ name: "Actions", query: { system_id: this.$route.query.system_id } });
      }
    }
}
</script>
<style scoped>
.header {
    display: flex;
    height: 3rem;
    max-height: 3rem;
    border-bottom: 1px solid lightgray;
}

.header button{
    padding-left: 0.9375rem;
    padding-right: 0.9375rem;
}

.header button:hover{
    background: var(--hover__color);
    transition: .2s;
}

button:disabled{
    color: lightgray;
    cursor: not-allowed;
}

.input-container {
  display: flex;
  flex: 0 0 23%;
  margin: 2px;
  align-items: center;
  border-bottom: 1px solid #8d8d8d;
  position: relative;
}

.custom-input {
  font-weight: 600;
  height: 2.5rem;
  flex-grow: 1;
  padding-right: 2rem; /* Space for the icon */
  padding-left: 2.5rem; /* Space for the icon */
}

.icon-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 2.5rem; /* Width of the icon container */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Style the SVG icon as needed */
.bi-pencil {
  width: 16px; /* Icon width */
  height: 16px; /* Icon height */
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer; /* Add a cursor pointer for interaction */
}


.animated-text{
  animation: pop-out 2s infinite;
  margin: auto;
  margin-right: auto;
  font-style: italic;
  font-size: 12px;
  margin-right: 15px;
  font-weight: 700;
  background: linear-gradient(90deg,#0a4f91,#00264d);
  background-clip: border-box;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

@keyframes pop-out {
    0% {
    transform: scale(1) translateX(0);
  }
  25% {
    transform: scale(1.1) translateX(0);
  }
  30% {
    transform: scale(1.1) translateX(-1px);
  }
  35% {
    transform: scale(1.1) translateX(1px);
  }
  40% {
    transform: scale(1.1) translateX(-1px);
  }
  45% {
    transform: scale(1.1) translateX(1px);
  }
  50% {
    transform: scale(1.1) translateX(0);
  }
  75% {
    transform: scale(1) translateX(0);
  }
  100% {
    transform: scale(1) translateX(0);
  }
}
</style>