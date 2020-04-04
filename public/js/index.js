import Model from "./model";
import View from "./view";
import { elements } from './base';

/////////////////////////////////
//                             //
//        Global State         //
//                             //
/////////////////////////////////
window.state = {};



// Missing Features
// 1) Reset pomodoro till long break everyday - done using pomodoro today
// Formula: timeToBreak = loop - (pomoToday % loop)
// Reset pomoToday every 24hrs at 2am
// pomoToday&totalPomo = pomoToday&totalPomo +1 every pomo finished 

// 2) Reset setting
// 3) Data dashboard



/////////////////////////////////
//                             //
//        Start Event          //
//                             //
/////////////////////////////////
function startTimer() {

  // 1) setting state of activeTimer to true
  state.activeTimer = true;

  // 2) Toggle to pause button
  View.toggleStartPause();

  // 3) Change timer title
  elements.timerTitle.innerHTML = 'Pomodoro Timer';

  // 4) Check & update timer setting
  settingSubmit();

  // 5) Reset timer
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

// event listener
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
  }
}
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

  // 3) Change timer title
  elements.timerTitle.innerHTML = 'Pomodoro Timer';

  // 4) Check & update timer setting
  settingSubmit();
  
  // 5) Run the timer
  Model.resetTime();

  // 6) Start the timming setInterval function - here
  state.timerId = setInterval( () => {
    Model.interval();
    View.formatTimer();
    if (state.remainingTime <= 0) {
      timerFinished();
    };
  }, 1000);
  state.activeTimer = true;

}
elements.reset.addEventListener('click', resetTimer);



/////////////////////////////////
//                             //
//       Timer Finished        //
//                             //
/////////////////////////////////
function timerFinished() {
  Model.clearTimer(); 
  Model.playAudio(); 
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
    settingSubmit();

    // 4) Update default time in timer
    View.renderTimer();

    // 5) update the UI (bg - illustration - timer - tab)
    View.renderTab(state.currentTab, state.previousTab);

    // 6) if there's running timer => runTimer on new tab
    if (state.activeTimer) {
      resetTimer();
      View.toggleStartPause();
    }
  }
  // Tab isn't changed
  else if (state.currentTab === state.newTab) {
    state.newTab = "";
  }
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

// run this upon onload
function settingSubmit() {
  Model.updateLocalStorage();
};
// Submit event Listenner
elements.settingSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  settingSubmit();
  if (state.activeTimer === false) {View.renderTimer();} // if there's no runnnig timer, show changes
});

// Save setting form before refresh
window.addEventListener('beforeunload', settingSubmit);


// init setting
function settingInit() {
  if (localStorage.getItem('focus') === null) {
    Model.updateLocalStorage();

  } else if (localStorage.getItem('focus') !== null) {
    View.updateSettingForm();
  }
};




/////////////////////////////////
//                             //
//           History           //
//                             //
/////////////////////////////////

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

// Manage & reset pomodoro today everyday
function resetPomodoroToday() {
  Model.checkNewDay();
  Model.updateLastOnline();
}



// Init - set default state
const init = () => {
  state.focus = {}; 
  state.break = {};
  state.longBreak = {};

  // Get setting
  settingInit();

  state.currentTab = "focus";
  state.newTab = "";
  state.previousTab = "";
  state.activeTimer = false;
  state.resetTimer = true;

  state.remainingTime = 0;

  // Check & create history if it doesn't exist
  historyInit();
  // Check for new date & reset today pomodoro
  resetPomodoroToday();
  // Render default timer
  View.renderTimer();
}
init();
