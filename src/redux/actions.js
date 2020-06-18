export const CHANGE_TITLE = 'CHANGE_TITLE';
export const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';
export const CHANGE_URL = 'CHANGE_URL';
export const ADD_MARK = 'ADD_MARK';
export const DELETE_MARK = 'DELETE_MARK';
export const CHECK_TEST = 'CHECK_TEST';
export const CHECK_QUESTION = 'CHECK_QUESTION';
export const RETURNED = 'RETURNED';

export function changeTitle (title) {
  return { type: CHANGE_TITLE, payload: {title} };
}

export function changeDescription (description) {
  return { type: CHANGE_DESCRIPTION, payload: {description} };
}

export function changeUrl (url) {
  return { type: CHANGE_URL, payload: {url} };
}

export function addMark (mark) {
  return { type: ADD_MARK, payload: {mark} };
}

export function deleteMark (mark) {
  return { type: DELETE_MARK, payload: {mark} };
}

export function checkTest (index, selected) {
  return { type: CHECK_TEST, payload: {index, selected} };
}

export function checkQuestion (index, selected) {
  return { type: CHECK_QUESTION, payload: {index, selected} };
}

export function returned (index) {
  return { type: RETURNED , payload: {index} };
}
