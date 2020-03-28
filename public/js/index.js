import Model from "./model";
import View from "./view";
import { elements } from './base';

/////////////////////////////////
//                             //
//        Global State         //
//                             //
/////////////////////////////////
window.state = {};





/////////////////////////////////
//                             //
//        Start Event          //
//                             //
/////////////////////////////////
function startTimer() {
  // 1) setting state of activeTimer to true - here
  state.activeTimer = true;

  // 2) change or reset to timer value to current tab (except when pausedTimer is false or resetTimer is true) - call func
  Model.resetTime();

  // 3) Start the timming setInterval function - here
  state.timerId = setInterval(Model.interval, 1000); // add calculate time and render time in this callback later

    // 4) Function of things to do in interval - call func
      
    // 4.1) Reduce remainingTime
    // 4.2) Log the remaintingTime
    // 4.3) Clear the Interval when Timer is finish

    // 4.4) Calculate the remaining time to minute & second
    // 4.5) Render the time to block & title

  //Model.runTimer();
}

// event listener
elements.start.addEventListener('click', startTimer);



/////////////////////////////////
//                             //
//        Pause Event          //
//                             //
/////////////////////////////////
function pauseTimer() {

  // 1) Clear the existing interval (aka pause)
  clearInterval(state.timerId);
  // 2) set the pausedTimer to true => So timer won't reset time value
  state.pausedTimer = true;
  
}
elements.pause.addEventListener('click', pauseTimer);



/////////////////////////////////
//                             //
//         Reset Event         //
//                             //
/////////////////////////////////
function resetTimer() {

  // 1) Set resetTimer to true => So timer will reset
  //state.resetTimer = true;

  state.pausedTimer = false;

  // 2) Clear the existing Interval => To avoid duplicating timer
  Model.clearTimer();

  // 3) Run the timer
  state.activeTimer = true;
  Model.resetTime();

  // 3) Start the timming setInterval function - here
  state.timerId = setInterval(Model.interval, 1000); // add calculate time and render time in this callback later

    // 4.1) setting state of activeTimer to true

    // 4.2) Reset time value
    // 4.3) Start the timming setInterval functio
    // 4.4) Function of things to do in interval
      // 4.1) Reduce remainingTime
      // 4.2) Log the remaintingTime
      // 4.3) Clear the Interval when Timer is finish
      // 4.4) Calculate the remaining time to minute & second
      // 4.5) Render the time to block & title
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

    // 3) update the UI (bg - illustration - timer - tab)
    View.renderTab(state.currentTab, state.previousTab);

    // 4) if there's running timer => runTimer on new tab
    if (state.activeTimer) {
      state.resetTimer = true;

      Model.clearTimer();
      startTimer();
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




// Init - set default state
const init = () => {
  state.focus = {}; 
  state.break = {};
  state.longBreak = {};

  state.currentTab = "focus";
  state.newTab = "";
  state.previousTab = "";
  state.activeTimer = false;

  state.pausedTimer = false;
  //state.resetTimer = false;

  state.remainingTime = 0;
  state.focus.time = 25;
  state.break.time = 5;
  state.longBreak.time = 30;
}
init();
