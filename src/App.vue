<template>
  <transition name="fade_main" mode="out-in">
    <router-view />
  </transition>
</template>

<script>
export default {
  name: "App",
  watch: {
    $route(to) {
      if (to.path === "/actions") {
        document.documentElement.style.overflowY = "scroll";
      } else {
        document.documentElement.style.overflowY = "unset";
      }
    },
  },
};
</script>

<style>
:root {
  --hover__color: #e5e5e5;
  --background: #f4f4f4;
  --main__color: #003366;
  --border__color: #d2d2d2;

  --font__size: 15px;
  --font__family: "Gill Sans", sans-serif;
}

html,
body {
  margin: 0;
  font-family: var(--font__family);
}

ul,
li {
  list-style: none;
  padding: unset;
}

hr {
  background-color: var(--border__color);
  border: 0;
  height: 1px;
  margin: 0.5rem 0 0;
  padding-bottom: 0;
}

button {
  cursor: pointer;
}

button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  position: relative;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}

.color-button {
  color: var(--main__color);
  padding: calc(0.375rem - 3px) 16px;
  min-height: 2rem;
}

.main-button {
  color: #000;
  font-weight: unset;
  background: white;
  padding: 5px;
  align-items: center;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  cursor: pointer;
  margin: 0 10px;
}

.main-button:hover {
  background-color: var(--hover__color);
  transition: 0.2s;
}

.color-button:hover {
  background: var(--hover__color);
  transition: 0.2s;
}

.background-button {
  background-color: var(--main__color);
  border: 1px solid transparent;
  color: #fff;
  min-width: 12rem;
  padding: calc(0.675rem - 3px) 60px calc(0.675rem - 3px) 12px;
}

.background-button:hover {
  background-color: #003d7b;
  transition: 0.2s;
}

p {
  margin: unset;
}

pre {
  font-family: inherit;
  margin: unset;
  white-space: break-spaces;
}

input[type="text"],
.custom-input {
  background-color: #fff;
  border: none;
  color: #161616;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.16px;
  line-height: 1.28572;
  outline: 2px solid transparent;
  outline-offset: -2px;
  transition: background-color 70ms cubic-bezier(0.2, 0, 0.38, 0.9),
    outline 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
  width: 100%;
}

input[type="text"]:focus,
.custom-input:focus {
  outline: 2px solid #0f62fe;
}

input[type="number"]:focus {
  outline: 2px solid #0f62fe;
}

a {
  color: #0f62fe;
  display: inline-flex;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.16px;
  line-height: 1.28572;
  outline: none;
  text-decoration: none;
  transition: color 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}

.svg {
  height: 1rem;
  position: absolute;
  right: 1rem;
  width: 1rem;
  margin-right: 4px;
  margin-top: 2px;
}

.button-container {
  text-align: right;
  background-color: var(--background);
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 25%;
  padding-bottom: 1rem;
  padding-top: 1rem;
}

.text-style {
  font-size: 0.75rem;
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 1.33333;
  margin-top: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.timer-content {
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  font-style: normal;
  font-weight: normal;
  white-space: initial;
}

.option img,
.option div.timer-content,
.option-text img,
.option-text div.timer-content {
  display: none;
}

.option-text > .pause-wrapper {
  display: none;
}

.pause {
  display: flex;
}

.pause > p {
  margin: 0 0 0 5px;
}

.option-text > p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.timer-buttons > button {
  all: unset;
  cursor: pointer;
}

.timer-buttons > button:nth-child(1) {
  margin-right: 12px;
}

.input-control .custom-select {
  box-sizing: border-box;
  width: 100% !important;
}

.new-editor:empty:before {
  content: attr(data-title);
  color: #f5f7f7;
}

.fade_main-enter-active,
.fade_main-leave-active {
  transition: opacity 0.5s;
}
.fade_main-enter-from,
.fade_main-leave-to {
  opacity: 0;
}
.table-list-enter-active,
.table-list-leave-active {
  transition: all 0.5s ease;
}
.table-list-enter-from,
.table-list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* x axis */

.graph .frappe-chart .x.axis text {
  display: none;
}

/* y axis */
.graph .frappe-chart .y.axis .line-horizontal,
.graph .frappe-chart .y.axis text {
  display: none;
}

.graph .chart-container {
  width: 15vw;
}

.main-graph .graph-svg-tip {
  opacity: 0 !important;
}

.main-graph-container .selected-option .exit-svg,
.main-graph-container .selected-option .arrow-icon {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 1rem;
}
</style>
