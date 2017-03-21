//
import {createBST, searchForKommune, searchForFylke} from '../utilities/utils';
createBST();

//functions for handling input in all searchfields

export function inputKommune(input){
  return function(dispatch) {
    searchForKommune(input.text)
    .then((result) => {
      dispatch({type: "INPUT_KOMMUNE", payload: result})
    })
    .catch((err) => {
      dispatch({type: "KOMMUNE_INPUT_NOT_VALID", payload: err})
    })
  }
}

export function inputFylke(input){
  return function(dispatch) {
    searchForFylke(input.text)
    .then((result) => {
      if(result.length==1){
        dispatch({type: "INPUT_FYLKE_SINGLE", payload: {
          result: result,
          fylke_text: input.text,
        }})
      }
      else {
        dispatch({type: "INPUT_FYLKE_MULTIPLE", payload: {
          result: result,
          fylke_text: input.text,
        }})
      }
    })
    .catch((err) => {
      dispatch({type: "FYLKE_INPUT_NOT_VALID", payload: input.text})
    })
  }
}

export function chooseFylke(input){
  return{
    type: "CHOOSE_FYLKE",
    payload: input,
  }
}


export function combineSearchParameters(kommune){
  var combinedSearchParameters = [kommune];
  return {
    type: "COMBINE_PARAMETERS",
    payload: combinedSearchParameters,
  }
}

export function resetSearchParameters(){
  return {
    type: "RESET_SEARCH_PARAMETERS"
  }
}
