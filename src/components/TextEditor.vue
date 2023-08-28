<template>
  <div class="text-editor">
    <div>
      <button @click="applyFormat('bold')">
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Bold (Ctrl+B)" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon">
            <path d="M18.25,25H9V7h8.5a5.25,5.25,0,0,1,4,8.65A5.25,5.25,0,0,1,18.25,25ZM12,22h6.23a2.25,2.25,0,1,0,0-4.5H12Zm0-7.5h5.5a2.25,2.25,0,1,0,0-4.5H12Z"></path>
          </svg>
      </button>
      <button @click="applyFormat('italic')">
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Italic (Ctrl+I)" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon">
            <path d="M25 9L25 7 12 7 12 9 17.14 9 12.77 23 7 23 7 25 20 25 20 23 14.86 23 19.23 9 25 9z"></path>
          </svg>
      </button>
      <button>
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Link" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon">
            <path d="M29.25,6.76a6,6,0,0,0-8.5,0l1.42,1.42a4,4,0,1,1,5.67,5.67l-8,8a4,4,0,1,1-5.67-5.66l1.41-1.42-1.41-1.42-1.42,1.42a6,6,0,0,0,0,8.5A6,6,0,0,0,17,25a6,6,0,0,0,4.27-1.76l8-8A6,6,0,0,0,29.25,6.76Z"></path>
            <path d="M4.19,24.82a4,4,0,0,1,0-5.67l8-8a4,4,0,0,1,5.67,0A3.94,3.94,0,0,1,19,14a4,4,0,0,1-1.17,2.85L15.71,19l1.42,1.42,2.12-2.12a6,6,0,0,0-8.51-8.51l-8,8a6,6,0,0,0,0,8.51A6,6,0,0,0,7,28a6.07,6.07,0,0,0,4.28-1.76L9.86,24.82A4,4,0,0,1,4.19,24.82Z"></path>
          </svg>
      </button>
      <div class="divider"/>
      <button>
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Image response type" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon">
            <path d="M19,14a3,3,0,1,0-3-3A3,3,0,0,0,19,14Zm0-4a1,1,0,1,1-1,1A1,1,0,0,1,19,10Z"></path>
            <path d="M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4Zm0,22H6V20l5-5,5.59,5.59a2,2,0,0,0,2.82,0L21,19l5,5Zm0-4.83-3.59-3.59a2,2,0,0,0-2.82,0L18,19.17l-5.59-5.59a2,2,0,0,0-2.82,0L6,17.17V6H26Z"></path>
          </svg>
      </button>
      <div class="divider"/>
      <button>
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Pause response type" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" role="img" class="bx--btn__icon">
            <path d="M6 4v8H4V4H6M6 3H4C3.4 3 3 3.4 3 4v8c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V4C7 3.4 6.6 3 6 3zM12 4v8h-2V4H12M12 3h-2C9.4 3 9 3.4 9 4v8c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V4C13 3.4 12.6 3 12 3z"></path>
          </svg>
      </button>
      <div class="divider"/>
      <button style="margin-left: auto;">
        <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Switch to JSON editor" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon">
          <path d="M31 16L24 23 22.59 21.59 28.17 16 22.59 10.41 24 9 31 16zM1 16L8 9 9.41 10.41 3.83 16 9.41 21.59 8 23 1 16z"></path>
          <path d="M5.91 15H26.080000000000002V17H5.91z" transform="rotate(-75 15.996 16)"></path>
        </svg>
      </button>
    </div>
    <textarea v-model="editorContent" ref="textareaRef" class="editor" placeholder="Odnosi li se Vaš upit na besplatnu ili naplatnu .hr domenu?"></textarea>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const editorContent = ref('');
    const textareaRef = ref(null);

    const applyFormat = (format) => {
      const textarea = textareaRef.value;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      const selectedText = editorContent.value.substring(selectionStart, selectionEnd);

      if (selectedText.length > 0) {
        const formattedText = `<${format}>${selectedText}</${format}>`;
        const newText =
          editorContent.value.substring(0, selectionStart) +
          formattedText +
          editorContent.value.substring(selectionEnd);
        editorContent.value = newText;
        // Update the textarea's value and reselect the formatted text
        textarea.value = newText;
        textarea.setSelectionRange(selectionStart, selectionStart + formattedText.length);
        textarea.focus();
      }
    };

    return {
      editorContent,
      textareaRef,
      applyFormat,
    };
  },
};
</script>

<style scoped>
.text-editor {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--background);
}

.text-editor button{
  padding:0.4375rem;
}

.text-editor button:hover{
  background: var(--hover__color);
  transition: .2s;
}

.editor {
  padding: 10px 0 13px 0px;
  box-sizing: border-box;
  text-indent: 10px;
  width: 100%;
  height: 100px;
  resize: vertical;
  background: var(--background);
  border: none;
  border-top: 1px solid grey;
}
</style>
