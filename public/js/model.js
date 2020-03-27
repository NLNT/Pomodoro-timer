import { elements } from './base';


/////////////////
//    Model    //
/////////////////

export default {


  runTimer() {
    // 1) Update state
    state.activeTimer = 'true';
    let dis = this;

    // 2) get the current tab's time value
    if (state.pausedTimer !== true){
      if (state.currentTab === 'focus') {state.remainingTime = state.focus.time * 60}
      else if (state.currentTab === 'break') {state.remainingTime = state.break.time * 60}
      else if (state.currentTab === 'longBreak') {state.remainingTime = state.longBreak.time * 60};
    }
    // Start the timing function
    state.timerId = setInterval(duringInterval, 1000);

    // Do every 1s when timer started
    function duringInterval() {
      state.remainingTime = state.remainingTime - 1;
      console.log(state.remainingTime)
      if (state.remainingTime === 0) {dis.clearTimer()};
    }
  },
  

  clearTimer() {
    clearInterval(state.timerId);
    state.clearTimer = false;
  },

  pauseTimer() {
    clearInterval(state.timerId);
    console.log("ASFAS")
  },


  pauseTimer() {
    // clearinterval using timerID for both function
  },
}