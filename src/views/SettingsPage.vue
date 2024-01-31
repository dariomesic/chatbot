<template>
  <div style="padding: 3.5rem 0 0 1rem;flex-grow: 1;overflow: auto;position: relative;">
    <section v-if="show">
      <transition name="fade" appear>
        <div
          class="card-header"
          :style="{
            backgroundColor:
              message === message
                ? 'rgb(105, 222, 64)'
                : '#cd5c5c',
          }"
        >
          <span>{{ message }}</span>
          <div @click="show = false" class="cross">✕</div>
        </div>
      </transition>
    </section>
    <!-- TABS -->
    <div class="tabs">
      <button @click="activeTab = 'synonyms'" :class="{ 'active': activeTab === 'synonyms' }">Sinonimi i pragovi</button>
      <button @click="activeTab = 'subjects'" :class="{ 'active': activeTab === 'subjects' }">Lista tema</button>
      <button @click="activeTab = 'documents'" :class="{ 'active': activeTab === 'documents' }">Baza znanja</button>
      <button @click="activeTab = 'live'" :class="{ 'active': activeTab === 'live' }">Live</button>
      <!-- Add more buttons for additional tabs -->
    </div>

      <!-- SYNONYMS TAB CONTENT -->
      <div v-if="activeTab === 'synonyms'" class="tabcontent">
        <h3>Popis sinonima</h3>
        <div v-for="(new_value, index) in newValues" :key="index" class="synonym-group">
          {{ index + 1 + ". " }}
          <div class="synonym-info">
            <div class="input-container">
              <div contenteditable="true" @blur="handleBlurKey($event.target.textContent, index)" placeholder="Prazno polje" aria-describedby="" maxlength="128" class="custom-input">{{ new_value }}</div>
              <div class="icon-container">
                <svg class="bi-pencil" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" fill="none"> <g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m104.175 90.97-4.252 38.384 38.383-4.252L247.923 15.427V2.497L226.78-18.646h-12.93zm98.164-96.96 31.671 31.67" class="cls-1" style=" fill: none; fill-opacity: 1; fill-rule: nonzero; stroke: #000000; stroke-width: 12; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: none; stroke-opacity: 1; " transform="translate(-77.923 40.646)" ></path> <path d="m195.656 33.271-52.882 52.882" style=" fill: none; fill-opacity: 1; fill-rule: nonzero; stroke: #000000; stroke-width: 12; stroke-linecap: round; stroke-linejoin: round; stroke-miterlimit: 5; stroke-dasharray: none; stroke-opacity: 1; " transform="translate(-77.923 40.646)" ></path> </g> </svg>
              </div>
            </div>
            &larr;
            <div class="old-values">
            <div contenteditable="true" @blur="handleBlurValue($event, index)" style="min-width:115px; background: var(--background); padding-right: 2rem; scroll-margin-bottom: 2rem; width: 100%; padding: 10px; line-height: 17px; box-sizing: border-box; word-wrap: break-word;">{{ editedOldValues[index] }}</div>
          </div>
          <div>
            <button @click="deleteSynonyms(index)" style="align-items: center; display: inline-flex;">
              <svg style="margin-top: 6px" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Close" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon"> <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path></svg>
              </button>
            </div>
          </div>
        </div>
        <button class="color-button" @click="addSynonymGroup">Dodaj novu grupu sinonima +</button>
        <h3>Pragovi</h3>
        <div>
          <div style="align-items: center; display: flex; flex-wrap: wrap;">
            <span>1. Unesite gornji prag za koji chatbot direktno vraća odgovor:</span>
            <div contenteditable="true" @blur="upperThreshold = $event.target.innerText" style="background: var(--background); padding-right: 2rem; scroll-margin-bottom: 2rem; padding: 8px 15px 8px 15px; line-height: 17px; box-sizing: border-box; word-wrap: break-word; margin: 0px 7px 0px 7px;">{{ upperThreshold }}</div>
            <p style="font-size: 9px;">(0.0 - 100.0)</p>
          </div>
          <div style="align-items: center; flex-wrap: wrap; display: flex; flex-wrap: wrap;">
            <span>2. Unesite donji prag za koji chatbot traži korisnika da ponovno pita pitanje:</span>
            <div contenteditable="true" @blur="lowerThreshold = $event.target.innerText" style="background: var(--background); padding-right: 2rem; scroll-margin-bottom: 2rem; padding: 8px 15px 8px 15px; line-height: 17px; box-sizing: border-box; word-wrap: break-word; margin: 0px 7px 0px 7px;">{{ lowerThreshold }}</div>
            <p style="font-size: 9px;">(0.0 - 100.0)</p>
          </div>
        </div>
        <button @click="saveSynonyms" class="background-button" tabindex="0" type="button" style="margin-top: 2rem;">Spremi sinonime i pragove
          <svg class="svg" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Saved" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" role="img"><path d="M13.9,4.6l-2.5-2.5C11.3,2.1,11.1,2,11,2H3C2.4,2,2,2.4,2,3v10c0,0.6,0.4,1,1,1h10c0.6,0,1-0.4,1-1V5	C14,4.9,13.9,4.7,13.9,4.6z M6,3h4v2H6V3z M10,13H6V9h4V13z M11,13V9c0-0.6-0.4-1-1-1H6C5.4,8,5,8.4,5,9v4H3V3h2v2c0,0.6,0.4,1,1,1	h4c0.6,0,1-0.4,1-1V3.2l2,2V13H11z"></path></svg>
        </button>

      </div>

      <!-- Subjects TAB CONTENT -->
      <div v-if="activeTab === 'subjects'" class="tabcontent">
        <h3>Popis početnih tema za chatbot</h3>
        <div class="input-control" style="width: 20vw">
          <label>Pretraži sve namjere</label>
          <div class="custom-checkbox-select" tabindex="1">
            <div class="selected-items" @click="toggleDropdown" ref="selectedItemsSettingsRef">
              <span v-if="selectedIntents.length === 0" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;color: #757575;min-width: 1rem;">Odaberite namjere...</span>
              <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 1rem;" v-else>
                {{ selectedIntents.map(intent => intent.name).join(", ") }}
              </span>
              <svg class="dropdown-arrow" viewBox="0 0 16 16"><path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path><title>Open menu</title></svg>
            </div>
            <div v-show="isDropdownOpen" class="dropdown" ref="dropdownSettingsRef">
              <button style="display: block; padding: 8px; color: var(--main__color)" @click="removeChosenIntents">Ukloni sve...</button>
              <label v-for="intent in uniqueIntents" :key="intent.key" class="checkbox-label">
                <input
                  type="checkbox"
                  :value="intent"
                  v-model="selectedIntents"
                />
                {{ intent.name }}
              </label>
            </div>
          </div>
        </div>
        <div style="padding: 1rem 0 0 0.5rem;">
          <h4>Odabrane namjere:</h4>
          <div v-for="(intent, index) in selectedIntents" :key="index">
            <p>{{ index + 1 }}. {{ intent.name }}</p>
          </div>
        </div>
        <button @click="saveSubjects" class="background-button" tabindex="0" type="button" style="margin-top: 2rem;">Spremi teme
          <svg class="svg" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Saved" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" role="img"><path d="M13.9,4.6l-2.5-2.5C11.3,2.1,11.1,2,11,2H3C2.4,2,2,2.4,2,3v10c0,0.6,0.4,1,1,1h10c0.6,0,1-0.4,1-1V5	C14,4.9,13.9,4.7,13.9,4.6z M6,3h4v2H6V3z M10,13H6V9h4V13z M11,13V9c0-0.6-0.4-1-1-1H6C5.4,8,5,8.4,5,9v4H3V3h2v2c0,0.6,0.4,1,1,1	h4c0.6,0,1-0.4,1-1V3.2l2,2V13H11z"></path></svg>
        </button>
      </div>

      <!-- Documents TAB CONTENT -->
      <div v-if="activeTab === 'documents'" class="tabcontent">
        <h3>Lista dokumenata koji služe za pretraživanje baze znanja u chatbotu</h3>
        <div class="file-upload-container">
          <!-- File Upload Section -->
          <div class="upload-container">
            <DropZone class="upload-box" @files-dropped="saveUploadedFile" #default="{ dropZoneActive }">
              <section v-if="!uploadedFile">
                <span v-if="dropZoneActive" style="display:flex;justify-content:center;align-items: center;font-size:x-large">
                  <div>
                    <div class="upload-icon">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#003366"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="none" d="M0 0h24v24H0z"></path> <path fill-rule="nonzero" d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z"></path> </g> </g></svg>
                    </div>
                    <span>Drop Them Here</span>
                  </div>
                </span>
                <span v-else>
                  <div class="upload-icon">
                    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#003366" fill-rule="evenodd" d="M9 12a1 1 0 102 0V4.26l3.827 3.48a1 1 0 001.346-1.48l-5.5-5a1 1 0 00-1.346 0l-5.5 5a1 1 0 101.346 1.48L9 4.26V12zm-5.895-.796A1 1 0 001.5 12v3.867a2.018 2.018 0 002.227 2.002c1.424-.147 3.96-.369 6.273-.369 2.386 0 5.248.236 6.795.383a2.013 2.013 0 002.205-2V12a1 1 0 10-2 0v3.884l-13.895-4.68zm0 0L2.5 11l.605.204zm0 0l13.892 4.683a.019.019 0 01-.007.005h-.006c-1.558-.148-4.499-.392-6.984-.392-2.416 0-5.034.23-6.478.38h-.009a.026.026 0 01-.013-.011V12a.998.998 0 00-.394-.796z"></path> </g></svg>
                  </div>
                  <div class="upload-text">Drag and drop files to upload</div>
                  <div style="margin:5px">or</div>
                  <button class="upload-button" @click="this.$refs.fileInput.click();">Select files</button>
                  <div class="supported-format-text">*Supported format: pdf, docx, doc, html</div>
                </span>
              </section>
              <section v-else>
                <p>{{uploadedFile.name}}</p>
                <button class="upload-button" @click="uploadFile">Upload</button>
              </section>
            </DropZone>
            <input type="file" ref="fileInput" style="display: none" @change="saveUploadedFile($event.target.files)" />
        </div>

          <!-- Documents uploaded -->
          <div class="uploaded-files-container" style="padding-left: 10rem;">
            <h4 style="margin-top:unset">Učitani dokumenti</h4>
            <div v-for="document in documents" :key="document.id_doc" class="uploaded-file-item">
              <div style="display:flex;align-items: center;">
                <div class="file-icon">
                  <svg v-if="document.title.slice(document.title.lastIndexOf('.') + 1) === 'pdf'" version="1.1" id="_x35_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" width="150px" height="150px" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <polygon style="fill:#B12A27;" points="475.435,117.825 475.435,512 47.791,512 47.791,0.002 357.613,0.002 412.491,54.881 "></polygon> <rect x="36.565" y="34.295" style="fill:#F2F2F2;" width="205.097" height="91.768"></rect> <g> <g> <path style="fill:#B12A27;" d="M110.132,64.379c-0.905-2.186-2.111-4.146-3.769-5.804c-1.658-1.658-3.694-3.015-6.031-3.92 c-2.412-0.98-5.126-1.432-8.141-1.432H69.651v58.195h11.383V89.481h11.157c3.015,0,5.729-0.452,8.141-1.432 c2.337-0.905,4.372-2.261,6.031-3.92c1.659-1.658,2.865-3.543,3.769-5.804c0.829-2.186,1.282-4.523,1.282-6.935 C111.413,68.902,110.961,66.565,110.132,64.379z M97.844,77.118c-1.508,1.432-3.618,2.186-6.181,2.186H81.034V63.323h10.629 c2.563,0,4.674,0.754,6.181,2.261c1.432,1.432,2.186,3.392,2.186,5.804C100.031,73.726,99.277,75.686,97.844,77.118z"></path> <path style="fill:#B12A27;" d="M164.558,75.761c-0.075-2.035-0.151-3.844-0.377-5.503c-0.226-1.659-0.603-3.166-1.131-4.598 c-0.528-1.357-1.206-2.714-2.111-3.92c-2.035-2.94-4.523-5.126-7.312-6.483c-2.865-1.357-6.257-2.035-10.252-2.035h-20.956 v58.195h20.956c3.995,0,7.387-0.678,10.252-2.035c2.789-1.357,5.277-3.543,7.312-6.483c0.905-1.206,1.583-2.563,2.111-3.92 c0.528-1.432,0.905-2.94,1.131-4.598c0.226-1.658,0.301-3.468,0.377-5.503c0.075-1.96,0.075-4.146,0.075-6.558 C164.633,79.908,164.633,77.721,164.558,75.761z M153.175,88.2c0,1.734-0.151,3.091-0.302,4.297 c-0.151,1.131-0.377,2.186-0.678,2.94c-0.301,0.829-0.754,1.583-1.281,2.261c-1.885,2.412-4.749,3.543-8.518,3.543h-8.669V63.323 h8.669c3.769,0,6.634,1.206,8.518,3.618c0.528,0.678,0.98,1.357,1.281,2.186s0.528,1.809,0.678,3.015 c0.151,1.131,0.302,2.563,0.302,4.221c0.075,1.659,0.075,3.694,0.075,5.955C153.251,84.581,153.251,86.541,153.175,88.2z"></path> <path style="fill:#B12A27;" d="M213.18,63.323V53.222h-38.37v58.195h11.383V87.823h22.992V77.646h-22.992V63.323H213.18z"></path> </g> <g> <path style="fill:#B12A27;" d="M110.132,64.379c-0.905-2.186-2.111-4.146-3.769-5.804c-1.658-1.658-3.694-3.015-6.031-3.92 c-2.412-0.98-5.126-1.432-8.141-1.432H69.651v58.195h11.383V89.481h11.157c3.015,0,5.729-0.452,8.141-1.432 c2.337-0.905,4.372-2.261,6.031-3.92c1.659-1.658,2.865-3.543,3.769-5.804c0.829-2.186,1.282-4.523,1.282-6.935 C111.413,68.902,110.961,66.565,110.132,64.379z M97.844,77.118c-1.508,1.432-3.618,2.186-6.181,2.186H81.034V63.323h10.629 c2.563,0,4.674,0.754,6.181,2.261c1.432,1.432,2.186,3.392,2.186,5.804C100.031,73.726,99.277,75.686,97.844,77.118z"></path> </g> </g> <polygon style="opacity:0.08;fill:#040000;" points="475.435,117.825 475.435,512 47.791,512 47.791,419.581 247.705,219.667 259.54,207.832 266.098,201.273 277.029,190.343 289.995,177.377 412.491,54.881 "></polygon> <polygon style="fill:#771B1B;" points="475.435,117.836 357.599,117.836 357.599,0 "></polygon> <g> <path style="fill:#F2F2F2;" d="M414.376,370.658c-2.488-4.372-5.88-8.518-10.101-12.287c-3.467-3.166-7.538-6.106-12.137-8.82 c-18.544-10.93-45.003-16.207-80.961-16.207h-3.618c-1.96-1.809-3.995-3.618-6.106-5.503 c-13.644-12.287-24.499-25.63-32.942-40.48c16.584-36.561,24.499-69.126,23.519-96.867c-0.151-4.674-0.829-9.046-2.035-13.117 c-1.809-6.558-4.824-12.363-9.046-17.112c-0.075-0.075-0.075-0.075-0.151-0.151c-6.709-7.538-16.056-11.835-25.555-11.835 c-9.574,0-18.393,4.146-24.801,11.76c-6.332,7.538-9.724,17.866-9.875,30.002c-0.226,18.544,1.281,36.108,4.448,52.315 c0.301,1.282,0.528,2.563,0.829,3.844c3.166,14.7,7.84,28.645,13.87,41.611c-7.086,14.398-14.247,26.836-19.223,35.279 c-3.769,6.408-7.915,13.117-12.212,19.826c-19.373,3.468-35.807,7.689-50.129,12.966c-19.373,7.011-34.902,16.056-46.059,26.836 c-7.237,6.935-12.137,14.323-14.549,22.012c-2.563,7.915-2.412,15.83,0.452,22.916c2.638,6.558,7.387,12.061,13.72,15.83 c1.508,0.905,3.091,1.658,4.749,2.337c4.825,1.96,10.101,3.015,15.604,3.015c12.74,0,25.856-5.503,36.937-15.378 c20.655-18.469,41.988-48.169,54.577-66.94c10.327-1.583,21.559-2.94,34.224-4.297c14.926-1.508,28.118-2.412,40.104-2.865 c3.694,3.317,7.237,6.483,10.629,9.498c18.846,16.81,33.168,28.947,46.134,37.465c0,0.075,0.075,0.075,0.151,0.075 c5.126,3.392,10.026,6.181,14.926,8.443c5.503,2.563,11.081,3.92,16.81,3.92c7.237,0,14.021-2.186,19.675-6.181 c5.729-4.146,9.875-10.101,11.76-16.81C420.18,387.694,418.899,378.724,414.376,370.658z M247.705,219.667 c-1.055-9.348-1.508-19.072-1.357-29.324c0.151-9.724,3.694-16.283,8.895-16.283c3.92,0,8.066,3.543,9.95,10.327 c0.528,2.035,0.905,4.372,0.98,7.01c0.151,3.166,0.075,6.483-0.075,9.875c-0.452,9.574-2.111,19.75-4.975,30.681 c-1.734,7.011-3.995,14.323-6.784,21.936C251.173,243.186,248.911,231.803,247.705,219.667z M121.967,418.073 c-1.282-3.166,0.151-9.272,7.991-16.81c11.986-11.458,30.756-20.504,56.914-27.364c-4.975,6.784-9.875,12.966-14.624,18.619 c-7.237,8.744-14.172,16.132-20.429,21.71c-5.352,4.824-11.232,7.84-16.81,8.594c-0.98,0.151-1.96,0.226-2.94,0.226 C127.168,423.049,123.173,421.089,121.967,418.073z M242.428,337.942l0.528-0.829l-0.829,0.151 c0.151-0.377,0.377-0.754,0.603-1.055c3.166-5.352,7.161-12.212,11.458-20.127l0.377,0.829l0.98-2.035 c3.166,4.523,6.634,8.971,10.252,13.267c1.734,2.035,3.543,3.995,5.352,5.955l-1.206,0.075l1.055,0.98 c-3.091,0.226-6.332,0.528-9.574,0.829c-2.035,0.226-4.146,0.377-6.257,0.603C250.796,337.037,246.499,337.49,242.428,337.942z M369.297,384.98c-8.971-5.729-18.996-13.795-31.359-24.575c17.564,1.809,31.359,5.654,41.159,11.383 c4.297,2.488,7.538,5.051,9.724,7.538c3.618,3.844,4.9,7.312,4.221,9.649c-0.603,2.337-3.241,3.92-6.483,3.92 c-1.885,0-3.844-0.452-5.88-1.432c-3.468-1.658-7.086-3.694-10.93-6.181C369.598,385.282,369.448,385.131,369.297,384.98z"></path> </g> </g> </g></svg>
                  <svg v-else viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><linearGradient id="a" x1="4.494" y1="-1712.086" x2="13.832" y2="-1695.914" gradientTransform="translate(0 1720)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2368c4"></stop><stop offset="0.5" stop-color="#1a5dbe"></stop><stop offset="1" stop-color="#1146ac"></stop></linearGradient></defs><title>file_type_word</title><path d="M28.806,3H9.705A1.192,1.192,0,0,0,8.512,4.191h0V9.5l11.069,3.25L30,9.5V4.191A1.192,1.192,0,0,0,28.806,3Z" style="fill:#41a5ee"></path><path d="M30,9.5H8.512V16l11.069,1.95L30,16Z" style="fill:#2b7cd3"></path><path d="M8.512,16v6.5L18.93,23.8,30,22.5V16Z" style="fill:#185abd"></path><path d="M9.705,29h19.1A1.192,1.192,0,0,0,30,27.809h0V22.5H8.512v5.309A1.192,1.192,0,0,0,9.705,29Z" style="fill:#103f91"></path><path d="M16.434,8.2H8.512V24.45h7.922a1.2,1.2,0,0,0,1.194-1.191V9.391A1.2,1.2,0,0,0,16.434,8.2Z" style="opacity:0.10000000149011612;isolation:isolate"></path><path d="M15.783,8.85H8.512V25.1h7.271a1.2,1.2,0,0,0,1.194-1.191V10.041A1.2,1.2,0,0,0,15.783,8.85Z" style="opacity:0.20000000298023224;isolation:isolate"></path><path d="M15.783,8.85H8.512V23.8h7.271a1.2,1.2,0,0,0,1.194-1.191V10.041A1.2,1.2,0,0,0,15.783,8.85Z" style="opacity:0.20000000298023224;isolation:isolate"></path><path d="M15.132,8.85H8.512V23.8h6.62a1.2,1.2,0,0,0,1.194-1.191V10.041A1.2,1.2,0,0,0,15.132,8.85Z" style="opacity:0.20000000298023224;isolation:isolate"></path><path d="M3.194,8.85H15.132a1.193,1.193,0,0,1,1.194,1.191V21.959a1.193,1.193,0,0,1-1.194,1.191H3.194A1.192,1.192,0,0,1,2,21.959V10.041A1.192,1.192,0,0,1,3.194,8.85Z" style="fill:url(#a)"></path><path d="M6.9,17.988c.023.184.039.344.046.481h.028c.01-.13.032-.287.065-.47s.062-.338.089-.465l1.255-5.407h1.624l1.3,5.326a7.761,7.761,0,0,1,.162,1h.022a7.6,7.6,0,0,1,.135-.975l1.039-5.358h1.477l-1.824,7.748H10.591L9.354,14.742q-.054-.222-.122-.578t-.084-.52H9.127q-.021.189-.084.561c-.042.249-.075.432-.1.552L7.78,19.871H6.024L4.19,12.127h1.5l1.131,5.418A4.469,4.469,0,0,1,6.9,17.988Z" style="fill:#fff"></path></g></svg>
                </div>
                <div class="file-title">{{ document.title }}</div>
              </div>
              <div class="delete-icon" @click="deleteFile(index)">
                <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Delete" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon"><path d="M12 12H14V24H12zM18 12H20V24H18z"></path><path d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- LIVE TAB CONTENT -->
      <div v-if="activeTab === 'live'" class="tabcontent">
        <h3>Ažuriranje sustava</h3>
        <div style="display:flex"><p style="font-style:italic">Posljednje ažuriranje sustava</p>: <p style="text-decoration:underline;margin-left:10px">7.siječnja 2024.</p></div>
        <button
          @click="live"
          class="background-button"
          tabindex="0"
          type="button"
          style="margin-top: 2rem;color:white;background:black"
        >
          Verzioniranje sustava
          <svg class="svg" viewBox="-0.5 0 25 25" style="fill:white" height="25px" width="25px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.8887 10.25C18.5395 10.2462 18.1974 10.151 17.8964 9.97387C17.5954 9.79677 17.3461 9.54393 17.1731 9.24053C17.0002 8.93714 16.9097 8.59372 16.9107 8.2445C16.9117 7.89528 17.0041 7.55241 17.1787 7.24999L17.2987 7.03997C17.4297 6.81781 17.5133 6.57097 17.5443 6.31493C17.5753 6.0589 17.553 5.79924 17.4788 5.55224C17.4046 5.30524 17.2801 5.07626 17.1132 4.87969C16.9462 4.68312 16.7404 4.52317 16.5087 4.40996V4.40996C16.0227 4.17652 15.467 4.13332 14.9507 4.28875C14.4345 4.44418 13.995 4.78704 13.7187 5.24999V5.24999C13.5404 5.54389 13.2894 5.78686 12.9899 5.9555C12.6903 6.12413 12.3524 6.21276 12.0087 6.21276C11.665 6.21276 11.327 6.12413 11.0275 5.9555C10.728 5.78686 10.4769 5.54389 10.2987 5.24999C10.0224 4.78704 9.58291 4.44418 9.06665 4.28875C8.5504 4.13332 7.99469 4.17652 7.5087 4.40996V4.40996C7.27697 4.52317 7.07116 4.68312 6.90421 4.87969C6.73726 5.07626 6.61277 5.30524 6.53858 5.55224C6.46438 5.79924 6.44209 6.0589 6.47309 6.31493C6.50408 6.57097 6.5877 6.81781 6.71869 7.03997L6.83869 7.24999C7.01332 7.55241 7.10571 7.89528 7.10669 8.2445C7.10767 8.59372 7.01721 8.93714 6.84427 9.24053C6.67134 9.54393 6.42196 9.79677 6.12097 9.97387C5.81999 10.151 5.4779 10.2462 5.12869 10.25C4.64217 10.238 4.16698 10.3979 3.78659 10.7015C3.40621 11.005 3.14493 11.4329 3.04868 11.91C2.99868 12.1996 3.01314 12.4967 3.09101 12.7801C3.16887 13.0635 3.30826 13.3263 3.49921 13.5497C3.69016 13.7731 3.92799 13.9516 4.1958 14.0727C4.46362 14.1937 4.75481 14.2543 5.04868 14.25H5.1687C5.5179 14.2538 5.86 14.349 6.16098 14.5261C6.46196 14.7032 6.71131 14.9561 6.88425 15.2595C7.05718 15.5628 7.14768 15.9063 7.1467 16.2555C7.14572 16.6047 7.05333 16.9476 6.87869 17.25L6.82868 17.33C6.56685 17.7935 6.4956 18.3407 6.62998 18.8558C6.76435 19.3709 7.0938 19.8135 7.54868 20.09V20.09C8.00218 20.351 8.53992 20.4239 9.04654 20.293C9.55316 20.1622 9.98834 19.838 10.2587 19.39L10.2787 19.25C10.457 18.9561 10.708 18.7131 11.0075 18.5445C11.307 18.3759 11.6449 18.2872 11.9887 18.2872C12.3324 18.2872 12.6704 18.3759 12.9699 18.5445C13.2694 18.7131 13.5204 18.9561 13.6987 19.25L13.7687 19.39C14.0391 19.8407 14.4761 20.1668 14.9851 20.2978C15.4942 20.4288 16.0343 20.3542 16.4887 20.09C16.9367 19.8197 17.2609 19.3845 17.3917 18.8779C17.5226 18.3712 17.4497 17.8335 17.1887 17.38L17.1287 17.27C16.9541 16.9676 16.8617 16.6247 16.8607 16.2754C16.8597 15.9262 16.9502 15.5829 17.1231 15.2795C17.296 14.9761 17.5454 14.7232 17.8464 14.5461C18.1474 14.369 18.4895 14.2738 18.8387 14.27H18.9587C19.2525 14.2743 19.5438 14.2138 19.8116 14.0927C20.0794 13.9717 20.3172 13.793 20.5082 13.5696C20.6991 13.3462 20.8385 13.0835 20.9164 12.8001C20.9942 12.5167 21.0087 12.2196 20.9587 11.93C20.8669 11.451 20.6088 11.0198 20.2301 10.7124C19.8514 10.405 19.3763 10.2413 18.8887 10.25V10.25Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 14.79C13.3807 14.79 14.5 13.6707 14.5 12.29C14.5 10.9093 13.3807 9.78998 12 9.78998C10.6193 9.78998 9.5 10.9093 9.5 12.29C9.5 13.6707 10.6193 14.79 12 14.79Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
      </div>

      <!-- Add more divs for additional tab contents -->
    </div>

    <!-- Grey background at the bottom -->
    <div class="bottom-section"/>
</template>
<script>
import DataService from "../services/data.services";
import DropZone from "./ui/DropZone.vue"
export default {
  components: {DropZone},
  data() {
    return {
      editing: false,
      newValues: [],
      oldValuesMap: new Map(),
      editedOldValues: [],
      isEditable: [],
      upperThreshold: null,
      lowerThreshold: null,
      show: false,
      message: "",
      activeTab: 'synonyms', // Set the default active tab
      uniqueIntents: [],
      isDropdownOpen: false,
      documents: [], // Replace with your document data
      hoveredDocument: null,
      uploadedFile: null,
      selectedIntents: [],
    };
  },
  async created() {
    this.filterOldValues();
    this.getDocuments();
    this.getIntents();
    try {
      let res = await DataService.getThresholdsBySystemId(
        this.$route.query.system_id
      );
      this.upperThreshold = res[0].percentage_upper;
      this.lowerThreshold = res[0].percentage_lower;
    } catch (error) {
      console.error("Error fetching thresholds:", error);
    }
  },
  methods: {
    async filterOldValues() {
      try {
        let synonyms = await DataService.getSynonyms(
          this.$route.query.system_id
        );

        if (Array.isArray(synonyms) && synonyms.length > 0) {
          const synonymMap = new Map();

          synonyms.forEach((item) => {
            const { new_value, old_value } = item;

            if (!synonymMap.has(new_value)) {
              synonymMap.set(new_value, [old_value]);
            } else {
              synonymMap.get(new_value).push(old_value);
            }
          });

          this.newValues = Array.from(synonymMap.keys());
          this.oldValuesMap = synonymMap;
          this.editedOldValues = this.newValues.map((value) =>
            this.oldValuesMap.get(value).join(", ")
          );
          this.isEditable = new Array(this.newValues.length).fill(false);
        } else {
          this.newValues = [];
          this.oldValuesMap = new Map();
          this.editedOldValues = [];
          this.isEditable = [];
        }
      } catch (error) {
        console.error("Error fetching synonyms:", error);
      }
    },
    async getIntents() {
      let objects = await DataService.getIntentsForSystem(this.$route.query.system_id);
      this.uniqueIntents = objects.map(element => ({ name: element.name, key: element.id }));
      this.uniqueIntents.sort((a, b) => a.name.localeCompare(b.name));
      objects = await DataService.getThemes(this.$route.query.system_id)
      objects[0].intents ? this.selectedIntents = JSON.parse(objects[0].intents) : this.selectedIntents = []
    },
    deleteSynonyms(index) {
      const newValueToDelete = this.newValues[index];
      this.newValues.splice(index, 1);
      this.oldValuesMap.delete(newValueToDelete);
      this.editedOldValues.splice(index, 1);
      this.isEditable.splice(index, 1);
    },
    addSynonymGroup() {
      this.newValues.push("New Value");
      this.oldValuesMap.set("New Value", ["Old Value"]);
      this.editedOldValues.push("");
      this.isEditable.push(true);
    },
    handleBlurKey(value, index) {
      // Handle the input on blur
      const oldKey = this.newValues[index];
      const oldValueArray = this.oldValuesMap.get(oldKey) || [];

      // Remove the old key-value pair
      this.oldValuesMap.delete(oldKey);

      // Set the new key and value in the map
      this.oldValuesMap.set(value, oldValueArray);
      this.newValues[index] = value;
    },

    handleBlurValue(event, index) {
      let [key, values] = Array.from(this.oldValuesMap.entries())[index];
      if (key !== undefined && values !== undefined) {
        this.oldValuesMap.delete(key);
        const newValues = event.target.innerText
          .split(",")
          .map((value) => value.trim());
        this.oldValuesMap.set(key, newValues);
      }
    },
    async saveSynonyms() {
      try {
        const synonymsObject = {};

        this.oldValuesMap.forEach((value, key) => {
          synonymsObject[key] = value;
        });

        await DataService.updateSynonyms(
          this.$route.query.system_id,
          synonymsObject
        );
        await DataService.updateThresholdsBySystemId(
          this.$route.query.system_id,
          this.upperThreshold,
          this.lowerThreshold
        );
        this.show = true;
        this.message = "Uspješno spremljene promjene.";
        setTimeout(() => {
          this.show = false;
        }, 4000);
      } catch (error) {
        this.show = true;
        this.message =
          "Pogreška prilikom spremanja promjena. Molim Vas pokušajte ponovno.";
        setTimeout(() => {
          this.show = false;
        }, 4000);
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      if (this.isDropdownOpen) {
        document.addEventListener("click", this.closeDropdownOnOutsideClick);
      } else {
        document.removeEventListener("click", this.closeDropdownOnOutsideClick);
      }
    },
    closeDropdownOnOutsideClick(event) {
      const dropdown = this.$refs.dropdownSettingsRef;
      const selectedItems = this.$refs.selectedItemsSettingsRef;
      if (dropdown && selectedItems) {
        if (
          !dropdown.contains(event.target) &&
          !selectedItems.contains(event.target)
        ) {
          this.isDropdownOpen = false;
          document.removeEventListener("click", this.closeDropdownOnOutsideClick);
        }
      }
    },
    removeChosenIntents() {
      this.selectedIntents = [];
    },
    async saveSubjects(){
      try{
        await DataService.updateThemes(this.$route.query.system_id, this.selectedIntents)
        this.show = true;
        this.message = "Uspješno spremljene promjene.";
        setTimeout(() => {
          this.show = false;
        }, 4000);
      }
      catch (error) {
        this.show = true;
        this.message =
          "Pogreška prilikom spremanja promjena. Molim Vas pokušajte ponovno.";
        setTimeout(() => {
          this.show = false;
        }, 4000);
      }
    },
    async getDocuments(){
      this.documents = await DataService.getDocumentsBySystemId(this.$route.query.system_id);
    },
    handleFileDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      this.uploadedFile = files
    },
    saveUploadedFile(event) {
      this.uploadedFile = event[0];
    },
    async uploadFile() {
      const file = this.uploadedFile;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", file.name);

      try {
        // Simulating a response for demonstration purposes
        const response = await DataService.uploadDocument(formData);
        console.log(response.data);
        this.uploadedFile = null
      } catch (error) {
        console.error(error);
      }
    },
    deleteDocument(documentId) {
      // Implement your logic to delete the document
      console.log("Deleting document with ID:", documentId);
    },
  },
};
</script>

<style scoped>
.synonym-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.synonym-info {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.new-value {
  font-weight: bold;
  cursor: pointer;
}

.editable {
  background-color: #f0f8ff; /* Light blue background for editable state */
}

.old-values {
  flex-grow: 1;
  margin-left: 10px;
}

button {
  margin-left: 10px;
}

.input-container {
  display: flex;
  flex: 0 0 13%;
  margin: 2px;
  align-items: center;
  border-bottom: 1px solid #8d8d8d;
  position: relative;
  height: 4vh;
}

.custom-input {
  height: 90%;
  display: flex;
  align-items: center;
  font-weight: 800;
  flex-grow: 1;
  padding-right: 2rem;
  padding-left: 2.5rem;
  min-width: 100px;
}

.icon-container {
  width: 2.5rem; /* Width of the icon container */
  display: flex;
}

/* Style the SVG icon as needed */
.bi-pencil {
  width: 16px; /* Icon width */
  height: 16px; /* Icon height */
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer; /* Add a cursor pointer for interaction */
}

.svg {
  height: 1rem;
  position: absolute;
  right: 1rem;
  width: 1rem;
  margin-right: 4px;
  margin-top: 2px;
}

/*popup message*/
.card-header {
  height: 20px;
  vertical-align: middle;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  line-height: 20px;
  padding: 15px;
  color: white;
  position: absolute;
  top: 1rem;
  right: 1rem;
  min-width: 420px;
  border-radius: 5px;
  padding-right: 5rem;
  box-shadow: 0 0 15px 5px #ccc;
}

.cross {
  position: absolute;
  top: 16px;
  right: 15px;
  font-size: 25px;
  font-weight: 100;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/*tabs style*/
.tabs {
  display: flex;
  margin-bottom: 20px;
}

.tabs button {
  min-width: 13rem;
  text-align: left;
  padding: 0.7rem 1rem;
  margin-right: 10px;
  cursor: pointer;
  background: var(--background);
  border: 1px solid #ccc;
}

.tabs button.active {
  font-weight: bold;
  filter: brightness(85%);
}

.tabcontent{
  -webkit-animation: fadeEffect 1s;
  animation: fadeEffect 1s;
  padding: 1rem 1rem 1rem 2rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 0 1rem;
}

/* Fade in tabs */
@-webkit-keyframes fadeEffect {
  from {opacity: 0;}
  to {opacity: 1;}
}

@keyframes fadeEffect {
  from {opacity: 0;}
  to {opacity: 1;}
}

.file-upload-container {
  display: flex;
  justify-content: space-between;
}

.upload-container,
.uploaded-files-container {
  flex: 1;
  padding-top: 50px;
}

.upload-box {
  border: 4px dashed var(--main__color);
  height: 400px;
  text-align: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-icon{
  background: var(--background);
  border-radius: 60px;
  box-shadow: 0 0 2px #888;
  padding: 0.5em 0.6em;
  width: fit-content;
  margin: auto;
  margin-bottom: 10px;
  margin-top: -10px;
  cursor: pointer;
}

.upload-icon svg {
  width: 40px; /* Adjust the size as needed */
  height: 40px; /* Adjust the size as needed */
}

.upload-button{
  background: var(--main__color);
  padding: 7px 20px;
  color: white;
  border-radius: 5px;
}

.uploaded-file-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.file-icon svg {
  width: 30px; /* Adjust the size as needed */
  height: 30px; /* Adjust the size as needed */
  margin-right: 10px;
}

.delete-icon svg {
  width: 20px; /* Adjust the size as needed */
  height: 20px; /* Adjust the size as needed */
  cursor: pointer;
  padding-left: 3rem;
}
</style>
