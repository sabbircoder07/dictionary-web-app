import errorImage from "../../assets/images/icon-arrow-down.svg";
import crossImage from "../../assets/images/icon-arrow-down.svg";
import playImage from "../../assets/images/icon-play.svg";
import newWindow from "../../assets/images/icon-new-window.svg";

export class DictionaryAPPView {
  _parentElement = document.querySelector(".dictionary-app");
  _data;
  _errorMessage =
    "Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.";
  _audioSource;
  _formWordSearch = document.querySelector("#wordSearchOption");

  render(data) {
    if (!data) return;
    this._data = data;
    let markup = "";
    markup = this._generateMarkup();
    this._clearMarkup();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  getWordQuery() {
    const word = document.querySelector("#wordName").value.trim();
    if (!word) {
      return;
    } else {
      return word;
    }
  }

  _clearMarkup() {
    this._parentElement.innerHTML = "";
  }

  renderError(message = this._errorMessage) {
    const errorMarkup = `
    <div class="message">
      <div class="message-icon">
      😕
      </div>
      <div class="message-header">
      <h3 class="heading-three">No Definitions Found</h3>
      </div>
      <div class="message-content">
        <p>${message}</p>
      </div>
    </div>
  `;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("beforeend", errorMarkup);
  }

  renderSpinner = function () {
    let markup = `<div class="loader-container">
  <div class="loader"></div>
  <div class="loader-text">Loading...</div>
</div>`;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  };

  addLoadHandler(render) {
    window.addEventListener("load", render);
    this._formWordSearch.addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        render();
      }
    });
  }
  addClickHandlerToPlayButton(render) {
    this._parentElement.addEventListener("click", function (event) {
      const playButton = event.target.closest(".dictionary__play");
      if (!playButton) return;
      playButton.addEventListener("click", render);
    });
  }

  addHandlerInputSearch(handler) {
    this._formWordSearch.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  addClickHandlerToModeSwitcher() {
    const label = document.querySelector('label[for="modeSwitcher"]');
    const modeSwitcher = document.querySelector("#modeSwitcher");
    label.addEventListener("click", (e) => {
      modeSwitcher.checked = !modeSwitcher.checked;
      if (modeSwitcher.checked === true) {
        document.querySelector("body").style.backgroundColor = "#050505";
        document.querySelector("body").style.color = "#ffffff";
        document.querySelector(".header").style.backgroundColor = "#1f1f1f";
        document.querySelector("select").style.backgroundColor = "#2d2d2d";
        document.querySelector(
          ".cta__word-form .input__word-name"
        ).style.backgroundColor = "#1f1f1f";
      } else {
        document.querySelector("body").style.backgroundColor = "#ffffff";
        document.querySelector("body").style.color = "#050505";
        document.querySelector(".header").style.backgroundColor = "#f4f4f4";
        document.querySelector("select").style.backgroundColor = "#f4f4f4";
        document.querySelector(
          ".cta__word-form .input__word-name"
        ).style.backgroundColor = "#f4f4f4";
      }
    });
  }

  addHandlerFontChange() {
    const bodyFont = document.querySelector("#font-name");
    bodyFont.addEventListener("change", function (e) {
      document.querySelector("body").style.fontFamily = e.target.value;
    });
  }

  _generateMarkup() {
    const html = `
      <div class="dictionary-app__container">
          <div class="dictionary dictionary-app__active">
            <div class="dictionary__header-word--info">
             <div class="dictionary__header-word">
              <h1 class="dictionary__word-name heading-One">${
                this._data.resultWord
              }
              </h1>
               <span>${this._data.phoneticsName}</span>
              </div>
              <img class="dictionary__play" src="${playImage}" alt="play-icon" />
            </div>
            
            <div class="dictionary__definition">

             ${this._data.meanings
               .map(
                 (el) => `
                 <div class="dictionary__definition-header">
               <h2 class="dictionary__definition-heading-text heading-two">${
                 el.partOfSpeech
               }</h2>
               <hr>
              </div>
              
              <div class="dictionary__definition-content">
                <h3 class="dictionary__definition-text heading-three">Meaning</h3>
                <div class="dictionary__definition-list">
                 ${el.definitions
                   .map(
                     (el) => `
                   <ul>
                   <li>${el.definition}</li>
                   </ul>
                     <spn class="dictionary__definition-example">${
                       el.example === undefined ? "" : el.example
                     }</spn>
                   `
                   )
                   .join("")}
                </div>

                 <div class="dictionary__definition-synonyms">
                 ${
                   el.synonyms.length === 0
                     ? ""
                     : `
                <h3 class="dictionary__definition-text heading-three">Synonyms</h3> 
                <div class="dictionary__definition-synonyms-list">
                ${el.synonyms
                  .map(
                    (synonym) =>
                      `<div class="dictionary__definition-synonym-name" >${synonym}</div>`
                  )
                  .join("")}
                </div>
                 `
                 }
                </div>

              `
               )
               .join("")}
            <hr class="dictionary__definition-hr">
            <div class="dictionary__source">
              <div class="dictionary__source-text">Source</div>
              <div class="dictionary__source-link">
                <a class="dictionary__source-url" href="${
                  this._data.sourceUrls
                }" target="_blank" rel="noopener noreferrer">${
      this._data.sourceUrls
    }
     <img class="dictionary__new-window" src="${newWindow}" alt="New Window" />  
    </a>
   
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;
    return html;
  }
}

export default new DictionaryAPPView();
