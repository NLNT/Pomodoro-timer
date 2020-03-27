import { elements } from './base';


/////////////////
//    Model    //
/////////////////

export default {


  runTimer() {
    // 1) Update state
    state.activeTimer = true;

    // 2) get the current tab's time value
    if (state.currentTab === 'focus') {state.remainingTime = state.focus.time * 60}
    else if (state.currentTab === 'break') {state.remainingTime = state.break.time * 60}
    else if (state.currentTab === 'longBreak') {state.remainingTime = state.longBreak.time * 60};

    // Start the timing function
    state.timerId = setInterval(duringInterval, 1000);

    // Do during a timer interval
    function duringInterval() {
      // 1) Update remainingTime
      console.log(state.remainingTime = state.remainingTime - 1);
      // 2) Clear timer when finished
      if (state.remainingTime === 0) {this.clearTimer()};
    };

  },

  clearTimer() {
    clearInterval(state.timerId);
    state.clearTimer = false
  },


  pauseTimer() {
    // clearinterval using timerID for both function
  },
}