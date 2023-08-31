<template>
  <transition name="fade_main" mode="out-in">
    <router-view />
  </transition>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
:root {
  --hover__color: #E5E5E5;
  --background: #f4f4f4;
  --main__color: #0f62fe;
  --border__color: #d2d2d2;

  --font__size: 15px;
  --font__family: IBM Plex Sans,Helvetica Neue,Arial,sans-serif;
}

html, body {
  margin:0;
}

ul, li{
  list-style: none;
  padding: unset;
}

hr{
    background-color: var(--border__color);
    border: 0;
    height: 1px;
    margin: 0.5rem 0 0;
    padding-bottom: 0;
}

button{
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

button:focus{
  outline:.125rem solid #0f62fe
}

.color-button{
  color: var(--main__color);
  padding: calc(0.375rem - 3px) 16px;
  min-height: 2rem;
}

.main-button{
  color: #000;
  font-weight: unset;
  background: white;
  padding:5px;
  align-items: center;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  cursor: pointer;
  margin: 0 10px;
}


.main-button:hover{
  background-color: var(--hover__color);
  transition: .2s;
}

.color-button:hover{
  background: var(--hover__color);
  transition: .2s;
}

.background-button{
    background-color: #0f62fe;
    border: 1px solid transparent;
    color: #fff;
    min-width: 10rem;
    padding: calc(0.675rem - 3px) 60px calc(0.675rem - 3px) 12px;
}

.background-button:hover{
    background-color: #0b4ecd;
    transition: .2s;
}

p{
  margin:unset;
}

input[type=text]{
  background-color: #fff;
  border: none;
  color: #161616;
  font-size: .875rem;
  font-weight: 400;
  letter-spacing: .16px;
  line-height: 1.28572;
  outline: 2px solid transparent;
  outline-offset: -2px;
  padding: 0 1rem;
  transition: background-color 70ms cubic-bezier(.2,0,.38,.9),outline 70ms cubic-bezier(.2,0,.38,.9);
  width: 100%;
}

input[type=text]:focus {
  outline: 2px solid #0f62fe;
}

.svg{
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

.text-style{
  font-size: .75rem;
  font-style: italic;
  font-weight: 400;
  letter-spacing: .32px;
  line-height: 1.33333;
  margin-top: .75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fade_main-enter-active, .fade_main-leave-active {
  transition: opacity 0.5s;
}
.fade_main-enter, .fade_main-leave-to {
  opacity: 0;
}
</style>
