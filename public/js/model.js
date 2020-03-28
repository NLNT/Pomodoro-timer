import { elements } from './base';


/////////////////
//    Model    //
/////////////////

export default {


  runTimer() {
    // 1) Update state
    state.activeTimer = true;
    let dis = this;



    // 2) reset the timer if it's not pause but if you click reset, run this => add or here
    if (state.pausedTimer === false || state.resetTimer === true){
      if (state.currentTab === 'focus') {state.remainingTime = state.focus.time * 60}
      else if (state.currentTab === 'break') {state.remainingTime = state.break.time}
      else if (state.currentTab === 'longBreak') {state.remainingTime = state.longBreak.time * 60};
      state.resetTimer = false;
    } 
    else if (state.pausedTimer === true) {state.pausedTimer = false};



    



    // Start the timing function
    state.timerId = setInterval(duringInterval, 1000);





    // create another func like below to clear all godamn timer and run like below
    function duringInterval() {
      state.remainingTime = state.remainingTime - 1;
      console.log(state.remainingTime);
      if (state.remainingTime <= 0) {dis.clearTimer()};
    }
  },
  
  


  clearTimer() {
    clearInterval(state.timerId);
    state.activeTimer = false;
  },


  pauseTimer() {
    // clearinterval using timerID for both function
  },
}