<template>
  <base-dialog
    :show="show"
    @click-submit="triggerUploadImage"
    @close="$emit('close-dialog')"
    :isSubmitDisabled="isImageNull"
    :isDisabledClass="isImageNull"
    :rightButtonText="'Umetni'"
  >
    <h3>Uključite sliku u svoj odgovor</h3>
    <p>Umetnite sliku s računala</p>
    <div class="main-content">
      <section class="form-section">
        <div class="form-control">
          <div class="counter-label">
            <label for="alt-text">Zamjenski tekst (preporučeno)</label>
            <span>{{ altCounter }}</span>
          </div>
          <input
            type="text"
            id="alt-text"
            placeholder="Zamjenski tekst za sliku"
            maxlength="60"
            v-model.trim="altText"
          />
        </div>
        <div class="form-control">
          <div class="counter-label">
            <label for="title-text">Naslov (opcionalno)</label>
            <span>{{ titleCounter }}</span>
          </div>
          <input
            type="text"
            id="title-text"
            placeholder="Tekst opisa za sliku"
            maxlength="60"
            v-model.trim="imageTitle"
          />
        </div>
        <div class="form-control">
          <input
            type="file"
            accept="image/*"
            @change="onFileChange"
            v-if="fileButtonReady"
          />
          <input
            type="button"
            value="Reset"
            @click="resetImage"
            v-if="resetButtonReady"
          />
        </div>
      </section>
      <div class="preview-card">
        <header class="image-preview-title">Pregled slike</header>
        <div class="image-container">
          <img :src="image" :alt="this.altText" :title="this.imageTitle" />
        </div>
      </div>
    </div>
  </base-dialog>
</template>

<script>
export default {
  props: ["show", "uploadImage"],
  emits: ["close-dialog"],
  data() {
    return {
      altText: "",
      imageTitle: "",
      file: false,
      image: null,
    };
  },
  methods: {
    async onFileChange(event) {
      const imageFile = event.target.files[0];
      if (imageFile) {
        const base64String = await convertFileToBase64(imageFile);
        this.image = base64String;
      }
      function convertFileToBase64(imageFile) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => {
            const fileType = imageFile.type.split("/")[1];
            const base64String = reader.result.split(",")[1];
            resolve(`data:image/${fileType};base64,${base64String}`);
          };

          reader.onerror = (error) => {
            reject(error);
          };

          reader.readAsDataURL(imageFile);
        });
      }
      this.file = true;
    },
    resetInput() {
      this.altText = "";
      this.imageTitle = "";
      this.file = false;
      this.image = null;
    },
    resetImage() {
      this.image = null;
      this.file = false;
    },
    triggerUploadImage() {
      this.$emit("get-data", this.altText, this.imageTitle, this.image);
      this.uploadImage();
      this.resetInput();
      this.$emit("close-dialog");
    },
  },
  computed: {
    altCounter() {
      return this.altText.length + "/" + "60";
    },
    titleCounter() {
      return this.imageTitle.length + "/" + "60";
    },
    isImageNull() {
      return this.image === null;
    },
    fileButtonReady() {
      return !this.file;
    },
    resetButtonReady() {
      return this.image !== null && this.file;
    },
  },
};
</script>

<style scoped>
.main-content {
  display: flex;
  margin-bottom: 3rem;
  gap: 2rem;
}

.form-control {
  margin: 10px 0;
}

input,
label {
  display: block;
  font: inherit;
}

.counter-label {
  display: flex;
  justify-content: space-between;
}

.form-control:nth-child(4) {
  display: flex;
  justify-content: center;
}

label,
span {
  color: #555353;
  margin-bottom: 6px;
  font-size: 11px;
}

input[type="text"] {
  background-color: #f4f4f4;
  border: none;
  border-bottom: 1px solid #8d8d8d;
  color: #161616;
  font-size: 0.875rem;
  font-weight: 400;
  height: 2.5rem;
  letter-spacing: 0.16px;
  line-height: 1.28572;
  outline: 2px solid transparent;
  outline-offset: -2px;
  padding-left: 10px;
  width: calc(100% - 10px);
  transition: background-color 70ms cubic-bezier(0.2, 0, 0.38, 0.9),
    outline 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
}

.form-section {
  flex-basis: 55%;
}

.preview-card {
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  background-color: #f5f7f7;
  flex-basis: 45%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  height: fit-content;
  min-height: 40vh;
  min-width: 340px;
}

.image-preview-title {
  text-align: center;
  box-shadow: 0 9.5px 12.7px 0 rgba(0, 0, 0, 0.05);
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  padding: 10px 20px;
  background-color: #fff;
}

.image-container {
  height: 100%;
  margin: 20px;
}

img {
  width: 100%;
  height: auto;
}

.disable {
  background-color: red;
}
</style>
