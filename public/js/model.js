import { elements } from './base';


/////////////////
//    Model    //
/////////////////

export default {

  resetTime() {
    // Reset timer only if pausedTimer is set to false
    if (state.resetTimer === true){
      if (state.currentTab === 'focus') {state.remainingTime = state.focus.time * 60}
      else if (state.currentTab === 'break') {state.remainingTime = state.break.time * 60}
      else if (state.currentTab === 'longBreak') {state.remainingTime = state.longBreak.time * 60};
    } 
    else if (state.resetTimer === false) {state.resetTimer = true};
  },
  

  interval() {
    state.remainingTime = state.remainingTime - 1;
    console.log(state.remainingTime);
    if (state.remainingTime <= 0) {dis.clearTimer()};
  },

  clearTimer() {
    clearInterval(state.timerId);
    state.activeTimer = false;
  },
}