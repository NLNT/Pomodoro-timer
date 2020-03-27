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
  // 2. Run timer
  Model.runTimer();

  // 3. Update title


  // 4. Update UI (start the timer, replace start with pause)

}

// event listener
elements.start.addEventListener('click', startTimer);





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

    // 4) check if there's any running timer
    if (state.activeTimer) {
      Model.clearTimer();
      startTimer();
    }
      // yes => run timer on changed tab
      // no => do nothing
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

  state.remainingTime = 0;
  state.focus.time = 25;
  state.break.time = 5;
  state.longBreak.time = 30;
}
init();
