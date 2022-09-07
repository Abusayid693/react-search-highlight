import process from "process";

export const SET_INPUT = 'SET_INPUT';
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const SEARCH_DATA = 'SEARCH_DATA';
export const DEBOUNCE = 'DEBOUNCE'
export const THROTTLE = 'THROTTLE'
export const RESET_STATE = 'RESET_STATE'

export const STRING_MATCHING = 'STRING_MATCHING';
export const CHARACTER_MATCHING = 'CHARACTER_MATCHING';
export const DEFAULT = 'DEFAULT'
export const POPOVER_EXPANDED = 'POPOVER_EXPANDED'

export const __DEV__: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';