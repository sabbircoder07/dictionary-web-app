import * as model from "./model.js";
import * as config from "./config.js";
import dictionaryAPPView from "./views/dictionaryAPPView.js";

const controlDictionaryAPP = async function () {
  try {
    const givenWord = dictionaryAPPView.getWordQuery();
    if (!givenWord) return;
    //dictionaryAPPView.renderSpinner();
    dictionaryAPPView.renderSpinner();

    await model.getDictionaryWordInformation(givenWord);

    /*
    const data = model.state;
    if (data.length === 0) {
      dictionaryAPPView.renderError();
      return;
    }
    dictionaryAPPView.render(data);
    */

    setTimeout(function () {
      const data = model.state;
      if (data.length === 0) {
        dictionaryAPPView.renderError();
        return;
      }
      dictionaryAPPView.render(data);
    }, config.SHOW_COUNTRIES_SEC * 1000);
  } catch (err) {
    // Handle any errors that occur during the execution of the function
    console.error(err);
    dictionaryAPPView.renderError();
  }
};
const palyAudio = function () {
  if (!model.state.audioSource) return;
  const audio = new Audio(model.state.audioSource);
  audio.play();
};

const init = function () {
  dictionaryAPPView.addLoadHandler(controlDictionaryAPP);
  dictionaryAPPView.addClickHandlerToPlayButton(palyAudio);
  dictionaryAPPView.addClickHandlerToModeSwitcher();
  dictionaryAPPView.addHandlerFontChange();
  dictionaryAPPView.addHandlerInputSearch(controlDictionaryAPP);
};

init();
