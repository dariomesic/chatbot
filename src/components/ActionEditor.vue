<template>
    <div class="header">
        <div class="input-container">
            <input @input="$emit('updateText', $event.target.value)" placeholder="Prazno polje" type="text" aria-describedby="" autocomplete="off" maxlength="128" :value="text" class="custom-input"/>
            <div class="icon-container"><svg class="bi-pencil" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m104.175 90.97-4.252 38.384 38.383-4.252L247.923 15.427V2.497L226.78-18.646h-12.93zm98.164-96.96 31.671 31.67" class="cls-1" style="fill:none;fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1" transform="translate(-77.923 40.646)"></path><path d="m195.656 33.271-52.882 52.882" style="fill:none;fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:5;stroke-dasharray:none;stroke-opacity:1" transform="translate(-77.923 40.646)"></path></g></svg></div>
        </div>
        <div style="flex: 1 1"/>
        <div style="display:flex">
            <span v-show="disableSaveButton" style="margin:auto;font-style:italic;font-size:10px;color:red">Nespremljene promjene !</span>
            <button @click="$emit('save')" tabindex="0" type="button" :disabled="!disableSaveButton">
                <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Saved" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" role="img" class="bx--btn__icon">
                    <path d="M13.9,4.6l-2.5-2.5C11.3,2.1,11.1,2,11,2H3C2.4,2,2,2.4,2,3v10c0,0.6,0.4,1,1,1h10c0.6,0,1-0.4,1-1V5	C14,4.9,13.9,4.7,13.9,4.6z M6,3h4v2H6V3z M10,13H6V9h4V13z M11,13V9c0-0.6-0.4-1-1-1H6C5.4,8,5,8.4,5,9v4H3V3h2v2c0,0.6,0.4,1,1,1	h4c0.6,0,1-0.4,1-1V3.2l2,2V13H11z"></path>
                </svg>
            </button>
            <div></div>
            <button @click="$router.push('/')" tabindex="0" type="button">
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
    emits: ['save']
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
</style>