<template>
  <div>
    <div class="wrapper">
      <div class="buttons-wrapper">
        <button
          data-title="Bold (Ctrl+B)"
          @click="bold"
          @keydown.ctrl.b="bold"
          :class="{
            active: isBold,
          }"
        >
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-label="Bold (Ctrl+B)"
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            role="img"
            class="bx--btn__icon"
          >
            <path
              d="M18.25,25H9V7h8.5a5.25,5.25,0,0,1,4,8.65A5.25,5.25,0,0,1,18.25,25ZM12,22h6.23a2.25,2.25,0,1,0,0-4.5H12Zm0-7.5h5.5a2.25,2.25,0,1,0,0-4.5H12Z"
            ></path>
          </svg>
        </button>
        <button
          data-title="Italic (Ctrl+I)"
          @click="italic"
          @keydown.ctrl.i="italic"
          :class="{ active: isItalic }"
        >
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-label="Italic (Ctrl+I)"
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            role="img"
            class="bx--btn__icon"
          >
            <path
              d="M25 9L25 7 12 7 12 9 17.14 9 12.77 23 7 23 7 25 20 25 20 23 14.86 23 19.23 9 25 9z"
            ></path>
          </svg>
        </button>
        <button data-title="Insert link" @click="openLinkDialog">
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-label="Link"
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            role="img"
            class="bx--btn__icon"
          >
            <path
              d="M29.25,6.76a6,6,0,0,0-8.5,0l1.42,1.42a4,4,0,1,1,5.67,5.67l-8,8a4,4,0,1,1-5.67-5.66l1.41-1.42-1.41-1.42-1.42,1.42a6,6,0,0,0,0,8.5A6,6,0,0,0,17,25a6,6,0,0,0,4.27-1.76l8-8A6,6,0,0,0,29.25,6.76Z"
            ></path>
            <path
              d="M4.19,24.82a4,4,0,0,1,0-5.67l8-8a4,4,0,0,1,5.67,0A3.94,3.94,0,0,1,19,14a4,4,0,0,1-1.17,2.85L15.71,19l1.42,1.42,2.12-2.12a6,6,0,0,0-8.51-8.51l-8,8a6,6,0,0,0,0,8.51A6,6,0,0,0,7,28a6.07,6.07,0,0,0,4.28-1.76L9.86,24.82A4,4,0,0,1,4.19,24.82Z"
            ></path>
          </svg>
        </button>
        <button
          data-title="Insert Image"
          @click="openImageDialog"
          :class="{ loading: isLoading }"
          :disabled="showImageDialog"
        >
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-label="Image response type"
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            role="img"
            class="bx--btn__icon"
          >
            <path
              d="M19,14a3,3,0,1,0-3-3A3,3,0,0,0,19,14Zm0-4a1,1,0,1,1-1,1A1,1,0,0,1,19,10Z"
            ></path>
            <path
              d="M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4Zm0,22H6V20l5-5,5.59,5.59a2,2,0,0,0,2.82,0L21,19l5,5Zm0-4.83-3.59-3.59a2,2,0,0,0-2.82,0L18,19.17l-5.59-5.59a2,2,0,0,0-2.82,0L6,17.17V6H26Z"
            ></path>
          </svg>
        </button>
        <button data-title="Timer" id="timerButton" @click="openTimerDialog">
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-label="Pause response type"
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 16 16"
            role="img"
            class="bx--btn__icon"
          >
            <path
              d="M6 4v8H4V4H6M6 3H4C3.4 3 3 3.4 3 4v8c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V4C7 3.4 6.6 3 6 3zM12 4v8h-2V4H12M12 3h-2C9.4 3 9 3.4 9 4v8c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V4C13 3.4 12.6 3 12 3z"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="textarea"
        contenteditable="true"
        ref="editor"
        id="editorId"
        @input="handleInput"
        @mouseup="saveSelection"
        @keyup="saveSelection"
        @keydown="handleLineBreak"
        @paste="handlePaste"
        :innerHTML="html"
      ></div>
    </div>
    <image-dialog
      :show="showImageDialog"
      @close-dialog="closeImageDialog"
      @get-data="handleImageData"
      :uploadImage="uploadImage"
      ref="imageDialog"
    ></image-dialog>
    <link-dialog
      :show="showLinkDialog"
      @close-dialog="closeLinkDialog"
      @get-data="handleLinkData"
      :getSelection="storedSelection"
      :insertLink="insertLink"
    ></link-dialog>
    <timer-dialog
      :show="showTimerDialog"
      @close-dialog="closeTimerDialog"
      @get-duration="handleDuration"
      :insertTimer="insertTimer"
      ref="timerDialog"
    ></timer-dialog>
  </div>
  <!-- <button @click="send">send</button>
  <pre id="output"></pre> -->
</template>

<script>
import ImageDialog from "./ImageDialog.vue";
import TimerDialog from "./TimerDialog.vue";
import LinkDialog from "./LinkDialog.vue";
export default {
  props: ["text"],
  emits: ["updateText"],
  components: {
    ImageDialog,
    TimerDialog,
    LinkDialog,
  },
  data() {
    return {
      isBold: false,
      isItalic: false,
      showImageDialog: false,
      showTimerDialog: false,
      showLinkDialog: false,
      isLoading: false,
      receivedDuration: 0,
      isMessageSent: false,
      storedSelection: null,
      editMode: false,
      selectedTimer: null,
      receivedAltText: null,
      receivedImage: null,
      receivedImageTitle: null,
      receivedLinkText: null,
      receivedLinkUrl: null,
      html: this.text,
    };
  },
  methods: {
    insertTimer() {
      const timer = `
          <div class="pause">
            <svg
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              aria-label="Pause response type"
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 16 16"
              role="img"
              class="bx--btn__icon"
            >
              <path
                d="M6 4v8H4V4H6M6 3H4C3.4 3 3 3.4 3 4v8c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V4C7 3.4 6.6 3 6 3zM12 4v8h-2V4H12M12 3h-2C9.4 3 9 3.4 9 4v8c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V4C13 3.4 12.6 3 12 3z"
              ></path>
            </svg>
            <p data-duration="${this.receivedDuration}">Pause (${this.receivedDuration}s)</p>
          </div>
          <div class="timer-buttons">
            <button id="edit">
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5d8ddf"
                aria-label="Edit"
                aria-hidden="true"
                role="img"
                class="edit"
              >
                <path
                  d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                ></path>
                <path
                  d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                ></path>
              </svg>
            </button>
            <button id="delete"
            >
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="#5d8ddf"
                aria-label="Delete"
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 32 32"
                role="img"
                class="delete"
              >
                <path d="M12 12H14V24H12zM18 12H20V24H18z"></path>
                <path
                  d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"
                ></path>
              </svg>
            </button>
          </div>
        `;
      const tempContainer = document.createElement("div");
      tempContainer.className = "timer-content";
      tempContainer.setAttribute("contenteditable", "false");
      tempContainer.innerHTML = timer;

      if (this.editMode) {
        this.selectedTimer.replaceWith(tempContainer);
        this.editMode = false;
      } else {
        if (this.storedSelection) {
          this.storedSelection.deleteContents();
          this.storedSelection.insertNode(tempContainer);
        } else {
          this.$refs.editor.appendChild(tempContainer);
        }
        const previousElement = tempContainer.previousSibling;
        const nextElement = tempContainer.nextSibling;
        if (
          previousElement === null ||
          previousElement.textContent.trim() === ""
        ) {
          const spaceBefore = document.createTextNode("\u00A0");
          tempContainer.parentNode.insertBefore(spaceBefore, tempContainer);
        }
        if (nextElement === null || nextElement.textContent.trim() === "") {
          const spaceAfter = document.createTextNode("\u00A0");
          tempContainer.parentNode.insertBefore(
            spaceAfter,
            tempContainer.nextSibling
          );
        }
      }
      setTimeout(() => {
        const editButton = tempContainer.querySelector("#edit");
        const deleteButton = tempContainer.querySelector("#delete");

        editButton.addEventListener("click", (event) => {
          this.editTimer(event);
        });
        deleteButton.addEventListener("click", (event) => {
          this.deleteTimer(event);
        });
      });
    },
    insertLink() {
      const link = document.createElement("a");
      if (this.receivedLinkText.length === 0) {
        link.textContent = this.receivedLinkUrl;
      } else {
        link.textContent = this.receivedLinkText;
      }
      link.href = this.receivedLinkUrl;
      link.target = "_blank";
      link.setAttribute("contenteditable", "false");
      if (this.storedSelection) {
        this.storedSelection.deleteContents();
        this.storedSelection.insertNode(link);
      } else {
        this.$refs.editor.appendChild(link);
      }
    },
    uploadImage() {
      const imgElement = document.createElement("img");
      imgElement.src = this.receivedImage;
      imgElement.alt = this.receivedAltText;
      imgElement.title = this.receivedImageTitle;

      imgElement.style.width = "100%";
      imgElement.style.height = "auto";

      if (this.storedSelection) {
        this.storedSelection.collapse(false);
        this.storedSelection.insertNode(imgElement);
        this.storedSelection.setStartAfter(imgElement);
        this.storedSelection.collapse(true);
      } else {
        this.$refs.editor.appendChild(imgElement);
      }
    },
    saveSelection() {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        this.storedSelection = selection.getRangeAt(0).cloneRange();
      }
    },
    bold() {
      this.$refs.editor.focus();
      if (!this.isBold) {
        document.execCommand("bold");
        this.isBold = true;
      } else {
        document.execCommand("bold");
        this.isBold = false;
      }
    },
    italic() {
      this.$refs.editor.focus();
      if (!this.isItalic) {
        document.execCommand("italic");
        this.isItalic = true;
      } else {
        document.execCommand("italic");
        this.isItalic = false;
      }
    },
    isActive() {
      const editor = this.$refs.editor;
      setInterval(() => {
        if (document.activeElement === editor) {
          if (document.queryCommandState("bold")) {
            this.isBold = true;
          } else {
            this.isBold = false;
          }
          if (document.queryCommandState("italic")) {
            this.isItalic = true;
          } else {
            this.isItalic = false;
          }
        }
      }, 250);
    },
    isEmpty(event) {
      if (event.target.innerText.length > 0) {
        this.availableButton = true;
      } else {
        this.availableButton = false;
      }
    },
    openImageDialog() {
      this.$refs.editor.focus();
      this.isLoading = true;
      setTimeout(() => {
        this.showImageDialog = true;
        this.isLoading = false;
      }, 500);
    },
    openTimerDialog() {
      this.$refs.editor.focus();
      this.showTimerDialog = true;
      const buttons = document.querySelectorAll(".buttons-wrapper button");
      buttons.forEach((button) => {
        if (button.classList.contains("active")) {
          button.classList.remove("active");
        }
      });
    },
    openLinkDialog() {
      this.showLinkDialog = true;
    },
    closeImageDialog() {
      this.$refs.imageDialog.resetInput();
      this.showImageDialog = false;
      this.$emit("updateText", this.$refs.editor.innerHTML);
    },
    closeTimerDialog() {
      this.showTimerDialog = false;
      this.$refs.timerDialog.resetTimer();
      this.$emit("updateText", this.$refs.editor.innerHTML);
    },
    closeLinkDialog() {
      this.showLinkDialog = false;
      this.$emit("updateText", this.$refs.editor.innerHTML);
    },
    async send() {
      const editor = document.getElementById("editorId");
      let output = document.getElementById("output");
      this.isMessageSent = true;

      const tempElement = document.createElement("div");
      tempElement.innerHTML = editor.innerHTML;

      const processNode = async (node, isFirstNode, isLastNode) => {
        if (node.nodeType === Node.TEXT_NODE) {
          let textNode = document.createTextNode(node.textContent);
          const formattingTags = ["B", "I"];
          const parentNodes = [];
          let parentNode = node.parentNode;
          while (parentNode) {
            if (formattingTags.includes(parentNode.nodeName)) {
              parentNodes.push(parentNode.nodeName);
            }
            parentNode = parentNode.parentNode;
          }
          if (parentNodes.length > 0) {
            let formattedNode = textNode;
            for (const tagName of parentNodes.reverse()) {
              formattedNode = document.createElement(tagName);
              formattedNode.appendChild(textNode);
              textNode = formattedNode;
            }
            if (isFirstNode) {
              formattedNode.textContent = formattedNode.textContent.trimStart();
            }
            if (isLastNode) {
              formattedNode.textContent = formattedNode.textContent.trimEnd();
            }
            output.appendChild(formattedNode);
            output.appendChild(document.createElement("br"));
          } else {
            const trimmedText = isFirstNode
              ? textNode.textContent.trimStart()
              : isLastNode
              ? textNode.textContent.trimEnd()
              : textNode.textContent;
            output.appendChild(document.createTextNode(trimmedText));
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.nodeName === "A") {
            const link = document.createElement("a");
            link.href = node.getAttribute("href");
            link.textContent = node.textContent;
            output.appendChild(link);
          } else if (node.nodeName === "IMG") {
            const image = document.createElement("img");
            image.src = node.getAttribute("src");
            image.alt = node.getAttribute("alt");
            output.appendChild(document.createElement("br"));
            output.appendChild(image);
            output.appendChild(document.createElement("br"));
          } else if (node.nodeName === "BR") {
            output.appendChild(document.createElement("br"));
          } else if (node.classList.contains("timer-content")) {
            const duration = node
              .querySelector("p")
              .getAttribute("data-duration");
            if (!isNaN(duration) && duration > 0) {
              await new Promise((resolve) => {
                setTimeout(resolve, duration * 1000);
              });
              output.appendChild(document.createElement("br"));
            }
          } else {
            const childNodes = node.childNodes;
            for (let i = 0; i < childNodes.length; i++) {
              const childNode = childNodes[i];
              await processNode(
                childNode,
                isFirstNode && i === 0,
                isLastNode && i === childNodes.length - 1
              );
            }
          }
        }
      };
      const childNodes = tempElement.childNodes;
      for (let i = 0; i < childNodes.length; i++) {
        const childNode = childNodes[i];
        await processNode(childNode, i === 0, i === childNodes.length - 1);
      }
      editor.innerHTML = "";
    },
    handleDuration(data) {
      this.receivedDuration = data;
    },
    handleImageData(altText, imageTitle, image) {
      this.receivedAltText = altText;
      this.receivedImageTitle = imageTitle;
      this.receivedImage = image;
    },
    handleLinkData(linkText, linkUrl) {
      this.receivedLinkText = linkText;
      this.receivedLinkUrl = linkUrl;
    },
    handlePaste(event) {
      event.preventDefault();
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedText = clipboardData.getData("text/plain");
      // Insert the cleaned text into the editor
      document.execCommand("insertHTML", false, pastedText);
    },

    deleteTimer(event) {
      const timerDiv = event.target.closest(".timer-content");
      timerDiv.remove();
      this.$emit("updateText", this.$refs.editor.innerHTML);
    },
    editTimer(event) {
      this.editMode = true;
      const timerDiv = event.target.closest(".timer-content");
      const paragraphElement = timerDiv.querySelector("p");
      this.$refs.timerDialog.duration =
        paragraphElement.getAttribute("data-duration");
      this.selectedTimer = timerDiv;
      this.openTimerDialog();
    },
    handleLineBreak(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.execCommand("insertLineBreak");
      }
    },
    handleInput() {
      this.isActive();
      this.saveSelection();
      this.$emit("updateText", this.$refs.editor.innerHTML);
    },
  },
  mounted() {
    this.isActive();
    this.$nextTick(() => {
      const editButton = this.$refs.editor.querySelectorAll("#edit");
      const deleteButton = this.$refs.editor.querySelectorAll("#delete");
      if (editButton && deleteButton) {
        editButton.forEach((edit) => {
          edit.addEventListener("click", (event) => {
            this.editTimer(event);
          });
        });
        deleteButton.forEach((del) => {
          del.addEventListener("click", (event) => {
            this.deleteTimer(event);
          });
        });
      }
    });
  },
};
</script>

<style scoped>
.buttons-wrapper {
  background-color: #f5f7f7;
}

.buttons-wrapper > button {
  border: none;
  background-color: unset;
  cursor: pointer;
  padding: 7px;
  position: relative;
  display: inline-block;
}

.buttons-wrapper > button:disabled {
  cursor: unset;
}

.buttons-wrapper > button:hover {
  background-color: #c0c2c2;
  transition: all 0.5s;
}

.buttons-wrapper > button:hover:before {
  content: attr(data-title);
  white-space: nowrap;
  position: absolute;
  border-radius: 5px;
  bottom: 100%;
  left: 50%;
  margin-left: -50px;
  color: #fff;
  padding: 5px 15px;
  background: #333;
  background: rgba(0, 0, 0, 0.8);
}

.buttons-wrapper > button:nth-child(5):hover:before {
  margin-left: -30px;
}
.buttons-wrapper > button:nth-child(3):hover:before {
  margin-left: -40px;
}
.buttons-wrapper > button:hover:after {
  content: " ";
  position: absolute;
  top: 0%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #333 transparent transparent transparent;
}

.buttons-wrapper > button:nth-child(3),
.buttons-wrapper > button:nth-child(4) {
  border-right: solid rgb(230, 225, 225) 1px;
}

.active {
  background-color: #c0c2c2;
  color: #1354c3;
  box-shadow: inset 1px 2px 5px #777;
}

.disabled-button {
  cursor: not-allowed;
}

.loading {
  cursor: wait !important;
}

.textarea {
  padding: 10px;
  box-sizing: border-box;
  min-height: 150px;
  resize: vertical;
  overflow-y: auto;
  background: var(--background);
  border: none;
  border-top: 1px solid #e0e0e0;
  max-width: 100%;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.32px;
  font-family: "Gill Sans", sans-serif;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
