import { API_URL_FOR_DICTIONARY } from "./config.js";
import { getJSON } from "./helper.js";

// State management
export const state = {
  searchWord: "",
  resultWord: "",
  phoneticsName: "",
  meanings: [],
  sourceUrls: "",
  audioSource: "",
};

/**
 * Retrieves the information of a specific word from the API.
 * @param {string} searchWord - The word to search for.
 * @returns {Promise<void>} - A Promise that resolves after the data has been
 * retrieved and the state has been updated.
 * @throws {Error} - If the request was unsuccessful or timed out.
 */
export const getDictionaryWordInformation = async function (searchWord) {
  try {
    // Update the state with the search word
    state.searchWord = searchWord;

    // Fetch the word information from the API
    const wordInformation = await getJSON(
      `${API_URL_FOR_DICTIONARY}${searchWord}`
    );

    console.log(wordInformation);

    // Update the state with the retrieved data
    state.resultWord = wordInformation[0].word;

    // If the word has a phonetic transcription, update the state with it
    if (wordInformation[0].phonetics.length > 0) {
      state.phoneticsName = wordInformation[0].phonetics[1].text;
    } else {
      // If the word has no phonetic transcription, add a default value
      state.phoneticsName = "/No phonetics/";
    }

    // Update the state with the meanings of the word
    state.meanings = wordInformation[0].meanings;

    // Update the state with the URL of the source of the word
    state.sourceUrls = wordInformation[0].sourceUrls[0];

    // Iterate over the phonetics of the word and retrieve the first audio URL
    wordInformation[0].phonetics.forEach((el) => {
      if (el.audio.length > 0) {
        state.audioSource = el.audio;
        return;
      }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
