import { elements } from './base';


/////////////////
//    Model    //
/////////////////

export default {

  // Reset time when start(not paused) or restart is clicked
  resetTime() {
    if (state.resetTimer === true){
      state.remainingTime = localStorage[state.currentTab] * 60;
    } 

    else if (state.resetTimer === false) {state.resetTimer = true};
  },

  // Timer function - run every 1s once timer has started
  interval() {
    state.remainingTime = state.remainingTime - 1;
  },

  clearTimer() {
    clearInterval(state.timerId);
  },
  
  playAudio() {
    elements.audio.play();
  },

  changeAudio() {
    elements.audio.src = `alarms/${elements.settingAlarm.value}.mp3`;
  },
  
  // Update total & today pomodoro every focus is finished
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
    // Check for invalid input & fix it
    if (elements.settingFocus.value < 1) {elements.settingFocus.value = 1};
    if (elements.settingFocus.value > 60) {elements.settingFocus.value = 60};

    if (elements.settingBreak.value < 1) {elements.settingBreak.value = 1};
    if (elements.settingBreak.value > 60) {elements.settingBreak.value = 60};

    if (elements.settingLongBreak.value < 1) {elements.settingLongBreak.value = 1};
    if (elements.settingLongBreak.value > 60) {elements.settingLongBreak.value = 60};

    // 1) push focus/break/longBreak
    localStorage.setItem('focus', elements.settingFocus.value);
    localStorage.setItem('break', elements.settingBreak.value);
    localStorage.setItem('longBreak', elements.settingLongBreak.value);

    // 2) Push loop
    localStorage.setItem('loop', elements.settingLoop.value);

    // 3) Alarm sound
    localStorage.setItem('alarm', elements.settingAlarm.value);

    //TEST
    console.log(localStorage);
  },

  updateOtherSettings() {
    localStorage.setItem('title', 'on');
    localStorage.setItem('notification', 'on');
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