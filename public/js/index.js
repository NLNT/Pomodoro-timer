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
  // 1. Update state
  state.activeTimer = true;

  // 2. Run timer
  Model.runTimer();

  // 3. Update title
  // Model.runTimerTitle();

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

    // 1) update currentTab in state
    state.currentTab = state.newTab;

    // 2) update the UI (bg - illustration - timer - tab)
    View.renderTab(state.currentTab, state.previousTab);


    // 3) check if there's any running timer
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
  state.currentTab = "focus";
  state.newTab = "";
  state.previousTab = "";
  state.activeTimer = false;

  state.focusTime = 25;
  state.breakTime = 5;
  state.longBreakTime = 30;
}
init();
