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
// 1) Suggestion on how many focus left until long break
// 2) Settings
//  2.1)
//  2.2)
//  2.3)
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

  // 3) Reset timer
  Model.resetTime();

  // 4) Start the timming setInterval function
  state.timerId = setInterval( () => {
    Model.interval();
    View.formatTimer();
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
  
  // 3) Run the timer
  Model.resetTime();
  
  // 3) Start the timming setInterval function - here
  state.timerId = setInterval( () => {
    Model.interval();
    View.formatTimer();
  }, 1000);
  state.activeTimer = true;

}
elements.reset.addEventListener('click', resetTimer);






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

    // Update default time in timer
    View.renderTimer();

    // 3) update the UI (bg - illustration - timer - tab)
    View.renderTab(state.currentTab, state.previousTab);

    // 4) if there's running timer => runTimer on new tab
    if (state.activeTimer) {
      // Model.clearTimer();
      resetTimer();
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
function settingSubmit(event) {
  // 1) Form => local storage
  Model.updateLocalStorage();

  // 2) Reload

};
// Submit event Listenner
elements.settingSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  settingSubmit();
});



// Save form after reload, keep storage not empty
function settingOnload() {
  if (localStorage.getItem('focus') === null) {
    Model.updateLocalStorage();

  } else if (localStorage.getItem('focus') !== null) {
    View.updateSettingForm();
  }
};


// Init - set default state
const init = () => {
  state.focus = {}; 
  state.break = {};
  state.longBreak = {};

  state.currentTab = "focus";
  state.newTab = "";
  state.previousTab = "";
  state.activeTimer = false;
  state.resetTimer = true;

  state.remainingTime = 0;
  state.focus.time = 25;
  state.break.time = 5;
  state.longBreak.time = 30;

  settingOnload();
}
init();
