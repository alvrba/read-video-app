import {combineReducers} from 'redux';
import {CHECK_TEST, RETURNED, CHECK_QUESTION} from './actions';

function titleReducer(state = null, action = {}) {
  switch(action.type){
    default:
      return state;
  }
}

function descriptionReducer(state = null, action = {}) {
  switch(action.type){
    default:
      return state;
  }
}

function urlReducer(state = null, action = {}) {
  switch(action.type){
    default:
      return state;
  }
}

function marksReducer(state = [], action = {}) {
  switch(action.type){
    case CHECK_TEST:
      const newState = JSON.parse(JSON.stringify(state));

        var correct = newState[action.payload.index].content.answer === action.payload.selected ? true : false;

        newState[action.payload.index].content.correct = correct;

        if (newState[action.payload.index].content.correct) {
          newState[action.payload.index].content.returned = true;
        }

        newState[action.payload.index].content.completed = true;

        return newState;

    case CHECK_QUESTION:
      const newState2 = JSON.parse(JSON.stringify(state));

        var correct2 = true;
        newState2[action.payload.index].content.correctAnswers.map((result, index) => {
          if (result !== action.payload.selected[index]) {
            correct2 = false;
          }
        });
        newState2[action.payload.index].content.correct = correct2;

        if (newState2[action.payload.index].content.correct2) {
          newState2[action.payload.index].content.returned = true;
        }

        newState2[action.payload.index].content.completed = true;

        return newState2;

    case RETURNED:
      const newState3 = JSON.parse(JSON.stringify(state));

      newState3[action.payload.index].content.returned  = true;
      return newState3;

    default:
      return state;
  }
}





const GlobalState = (combineReducers({
  title: titleReducer,
  description: descriptionReducer,
  url: urlReducer,
  marks: marksReducer
}));

export default GlobalState;
