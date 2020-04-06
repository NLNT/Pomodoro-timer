import Model from "./model";
import View from "./view";
import { elements } from './base';


window.state = {};



// Missing Features
// 1) Reset setting
// 2) Data dashboard
// 3) Display indicator in title that timer is finished
// 4) task as 3rd tab
// 5) settings saved indicator

// Bugs
// 1) if user double click start too fast, there will be 2 timer

// Suggestion



/////////////////////////////////
//                             //
//        Start Event          //
//                             //
/////////////////////////////////
function startTimer() {
  // 1) Update State
  state.activeTimer = true;
  // 2) Toggle start -> pause
  View.toggleStartPause();
  // 3) Change timer title
  elements.timerTitle.innerHTML = 'Pomodoro Timer';
  // 4) Check & update timer setting
  Model.updateLocalStorage();
  // 5) Run the timer
  Model.resetTime();
  // 6) Start the timming setInterval function
  state.timerId = setInterval( () => {
    Model.interval();
    View.formatTimer();
    if (state.remainingTime <= 0) {
      timerFinished();
    };
  }, 1000);
}
// start timer event listener
elements.start.addEventListener('click', startTimer);



/////////////////////////////////
//                             //
//        Pause Event          //
//                             //
/////////////////////////////////
function pauseTimer() {
  // Run only before timer has finished
  if (state.remainingTime > 0) {
    // 1) Toggle start/pause button
    View.togglePauseStart();
    // 2) Clear the existing interval (aka pause)
    clearInterval(state.timerId);
    // 3) set the pausedTimer to true => So timer won't reset time value
    state.resetTimer = false;
  };
};
// Reset timer event listenner
elements.pause.addEventListener('click', pauseTimer);



/////////////////////////////////
//                             //
//         Reset Event         //
//                             //
/////////////////////////////////
function resetTimer() {
  // 1) incase timer is paused, change back to reset
  state.resetTimer = true;
  // 2) Clear the existing Interval => To avoid duplicating timer
  Model.clearTimer();
  // 3) Start timer
  startTimer();
};
// Reset timer event listenner
elements.reset.addEventListener('click', resetTimer);



/////////////////////////////////
//                             //
//       Timer Finished        //
//                             //
/////////////////////////////////
function timerFinished() {
  Model.clearTimer();
  if (localStorage.getItem('notification') === 'on') { 
    Model.playAudio(); 
  };
  Model.updateHistory();
  View.renderTimerFinished();
};






/////////////////////////////////
//                             //
//         Change Tab          //
//                             //
/////////////////////////////////
function controlTab() {
  // Tab is changed
  if (state.currentTab !== state.newTab) {
    // 1) Update previous tab in state
    state.previousTab = state.currentTab;
    // 2) update currentTab in state
    state.currentTab = state.newTab;
    // 3) Update timer settings
    //Model.updateLocalStorage();
    // 4) Update default time in timer
    View.renderTimer();
    // 5) update the UI (bg - illustration - timer - tab)
    View.renderTab();
    // 6) if there's running timer => runTimer on new tab
    if (state.activeTimer) {
      resetTimer();
      View.toggleStartPause();
    };
  };
  // // Tab isn't changed
  // else if (state.currentTab === state.newTab) {
  //   state.newTab = "";
  // }
}


// Focus tab - listener
elements.focusTab.addEventListener('click', () => {
  state.newTab = "focus";
  controlTab();
});
// Break tab - listener
elements.breakTab.addEventListener('click', () => {
  state.newTab = "break";
  controlTab();
});
// Long break - listener
elements.longBreakTab.addEventListener('click', () => {
  state.newTab = "longBreak";
  controlTab();
});





/////////////////////////////////
//                             //
//           Setting           //
//                             //
/////////////////////////////////

// function settingSubmit() {
//   Model.updateLocalStorage();
// };


// // Submit event Listenner
// elements.settingSubmit.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   settingSubmit();
  //   if (state.activeTimer === false) {View.renderTimer();} // if there's no runnnig timer, show changes
  // });
  



// init setting
function settingInit() {
  if (localStorage.getItem('focus') === null) {
    Model.updateLocalStorage(); // Form -> Storage
  } else if (localStorage.getItem('focus') !== null) {
    View.updateSettingForm(); // Storage -> Form
  }
};


// Init Other settings
function otherSettingInit() {
  // Create default other settings & maintain other settings after refresh
  if (localStorage.getItem('title') === null ) {
    localStorage.setItem('title', 'on');
    localStorage.setItem('notification', 'on');
  }
  View.updateOtherSettings();
};
// Other settings event listenner
elements.settingTitle.addEventListener('click', Model.updateOtherSettings);
elements.settingNotification.addEventListener('click', Model.updateOtherSettings);



/////////////////////////////////
//                             //
//        Reset Setting        //
//                             //
/////////////////////////////////
function resetSetting() {
  Model.resetSettingStorage();
  View.updateSettingForm();
  View.updateOtherSettings();
}
elements.settingReset.addEventListener('click', resetSetting);





// Sound tester event listenner
elements.settingAlarm.addEventListener('change', () => {
  Model.changeAudio(); 
  Model.updateLocalStorage();
});
elements.alarmTester.addEventListener('click', Model.playAudio);





// Custom timer autosave event listenners
let settingInputs = [elements.settingFocus, elements.settingBreak, elements.settingLongBreak];

settingInputs.forEach((evt) => {
  evt.addEventListener('input', () => {
    if (state.activeTimer === false) {
      Model.updateLocalStorage();
      View.renderTimer();}
  });
});


// Loop setting autosave
elements.settingLoop.addEventListener('input',Model.updateLocalStorage);







/////////////////////////////////
//                             //
//           History           //
//                             //
/////////////////////////////////

// Create / maintaint pomodoro history
function historyInit() {
  // Total pomodoro
  if (localStorage.getItem('totalPomodoro') === null) {
    localStorage.setItem('totalPomodoro', '0');
  };
  // Today pomodoro
  if (localStorage.getItem('todayPomodoro') === null) {
    localStorage.setItem('todayPomodoro', '0');
  }
}

// Check for new date to reset & update last online status
function checkPomoToday() {
  Model.checkNewDay();
  Model.updateLastOnline();
}






// Init - set default state
const init = () => {
  // state.focus = {}; 
  // state.break = {};
  // state.longBreak = {};

  
  state.currentTab = "focus";
  state.newTab = "";
  state.previousTab = "";
  state.activeTimer = false;
  state.resetTimer = true;
  state.remainingTime = 0;
  
  // Check to get or create setting info
  settingInit();
  otherSettingInit();
  // Check & create history (if doesn't exist)
  historyInit();
  // Check for new date & reset today pomodoro
  checkPomoToday();
  // Render default timer
  View.renderTimer();
}
init();
