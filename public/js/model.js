import { elements } from './base';


/////////////////
//    Model    //
/////////////////

export default {

  resetTime() {
    // 2) reset the timer if it's not pause but if you click reset, run this => add or here
    if (state.pausedTimer === false){
      if (state.currentTab === 'focus') {state.remainingTime = state.focus.time * 60}
      else if (state.currentTab === 'break') {state.remainingTime = state.break.time * 60}
      else if (state.currentTab === 'longBreak') {state.remainingTime = state.longBreak.time * 60};
    } 
    else if (state.pausedTimer === true) {state.pausedTimer = false};
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