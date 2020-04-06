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
  
  // Update total & today pomodoro every focus
  updateHistory() {
    if (state.currentTab === 'focus') {
      localStorage.totalPomodoro = parseInt(localStorage.totalPomodoro) + 1;
      localStorage.todayPomodoro = parseInt(localStorage.todayPomodoro) + 1;
    }
  },




////////////////////////////////
//                            //
//          Setting           //
//                            //
////////////////////////////////

// Push the setting form => localStorage
updateLocalStorage() {
  // Check for invalid inputs
  if (elements.settingFocus.value < 1) {elements.settingFocus.value = 1};
  if (elements.settingFocus.value > 60) {elements.settingFocus.value = 60};
  if (elements.settingBreak.value < 1) {elements.settingBreak.value = 1};
  if (elements.settingBreak.value > 60) {elements.settingBreak.value = 60};
  if (elements.settingLongBreak.value < 1) {elements.settingLongBreak.value = 1};
  if (elements.settingLongBreak.value > 60) {elements.settingLongBreak.value = 60};

  // 1) Push time settings
  localStorage.setItem('focus', elements.settingFocus.value);
  localStorage.setItem('break', elements.settingBreak.value);
  localStorage.setItem('longBreak', elements.settingLongBreak.value);

  // 2) Push loop
  localStorage.setItem('loop', elements.settingLoop.value);

  // 3) Push alarm sound
  localStorage.setItem('alarm', elements.settingAlarm.value);

  // TEST
  console.log(localStorage);
},


updateOtherSettings() {
  // Title
  if (elements.settingTitle.checked === true) {
    localStorage.setItem('title', 'on');
  } else if (elements.settingTitle.checked === false) {
    localStorage.setItem('title', 'off');
  };
  
  // Notification
  if (elements.settingNotification.checked === true) {
    localStorage.setItem('notification', 'on');
  } else if (elements.settingNotification.checked === false) {
    localStorage.setItem('notification', 'off');
  };
},






////////////////////////////////
//                            //
//          History           //
//                            //
////////////////////////////////

// Reset pomodoroToday everyday
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


// Update last online status
updateLastOnline() {
  let today = new Date();

  localStorage.setItem('lastOnlineDate', today.getDate());
  localStorage.setItem('lastOnlineMonth', today.getMonth());
  localStorage.setItem('lastOnlineYear', today.getFullYear());
},


}