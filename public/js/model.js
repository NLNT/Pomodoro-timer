import { elements } from './base';


/////////////////
//    Model    //
/////////////////

export default {

  resetTime() {
    // Reset timer only if pausedTimer is set to false

    if (state.resetTimer === true){
      if (state.currentTab === 'focus') {state.remainingTime = localStorage.focus * 60}
      else if (state.currentTab === 'break') {state.remainingTime = localStorage.break * 60}
      else if (state.currentTab === 'longBreak') {state.remainingTime = localStorage.longBreak * 60};
    } 

    else if (state.resetTimer === false) {state.resetTimer = true};
  },

  interval() {
    state.remainingTime = state.remainingTime - 1;
  },

  clearTimer() {
    clearInterval(state.timerId);
  },
  
  playAudio() {
    elements.audio.play();
  },
  
  updateHistory() {
    if (state.currentTab === 'focus') {
      localStorage.totalPomodoro = parseInt(localStorage.totalPomodoro) + 1;
      localStorage.todayPomodoro = parseInt(localStorage.todayPomodoro) + 1;
    }
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
    
    // 4) Others - not in sync with ui
    localStorage.setItem('title', elements.settingTitle.value);
    localStorage.setItem('notification', elements.settingNotification.value);

    //TEST
    console.log(localStorage);
  },


  /////////////////////
  //     History     //
  /////////////////////

  // Check if it's a new day ? yes = reset
  checkNewDay() {
    let today = new Date();

    if (today.getFullYear() > localStorage.lastOnlineYear) {
      resetPomoToday();
    } else if (today.getMonth() > localStorage.lastOnlineMonth) {
      resetPomoToday();
    } else if (today.getDate() > localStorage.lastOnlineDate && today.getMonth() == localStorage.lastOnlineMonth) {
      resetPomoToday();
    };
    
    function resetPomoToday() {
      localStorage.setItem('todayPomodoro', '0');
    };
  },

  updateLastOnline() {
    let today = new Date();

    localStorage.setItem('lastOnlineDate', today.getDate());
    localStorage.setItem('lastOnlineMonth', today.getMonth());
    localStorage.setItem('lastOnlineYear', today.getFullYear());
  },


}