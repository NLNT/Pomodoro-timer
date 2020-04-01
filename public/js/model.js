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
    if (state.remainingTime <= 0) {this.clearTimer(); this.playAudio()};
  },

  clearTimer() {
    clearInterval(state.timerId);
    // state.activeTimer = false;
  },

  playAudio() {
    elements.audio.play();
  },



  /////////////////////
  //     Setting     //
  /////////////////////
  updateLocalStorage() {
    // 1) push focus/break/longBreak
    localStorage.setItem('focus', elements.settingFocus.value);
    localStorage.setItem('break', elements.settingBreak.value);
    localStorage.setItem('longBreak', elements.settingLongBreak.value);

    // 2) Push loop
    localStorage.setItem('loop', elements.settingLoop.value);

    // 3) Alarm sound
    localStorage.setItem('alarm', elements.settingAlarm.value);
    
    // 4) Others
    localStorage.setItem('title', elements.settingTitle.value);
    localStorage.setItem('notification', elements.settingNotification.value);

    //TEST
    console.log(localStorage);
  },

}