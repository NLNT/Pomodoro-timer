import Model from "./model";
import View from "./view";
import { elements } from './base';

////////////////////////////////////////////////////////
//                                                    //
// Global State                                       //
// - Current tab                                      //
// - Current running timer (focus/break/longbreak)    //
// + Modified countdown timer object                  //
//                                                    //
////////////////////////////////////////////////////////
window.state = {};


// Control the timer data & UI
function startTimer() {
  state.activeTimer = true;

  Model.runTimer();
}

// event listener
elements.start.addEventListener('click', startTimer);




function pauseTimer() {
  clearInterval(state.timerId);
  state.pausedTimer = true;
}
elements.pause.addEventListener('click', pauseTimer);



function resetTimer() {
  state.resetTimer = true;
  Model.clearTimer();
  Model.runTimer();
}
elements.reset.addEventListener('click', resetTimer);






// Check when tab is change
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

  //-------- Tab isn't changed
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
  state.resetTimer = false;

  state.remainingTime = 0;
  state.focus.time = 25;
  state.break.time = 5;
  state.longBreak.time = 30;
}
init();
