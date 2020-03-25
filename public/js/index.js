import modelClass from "./model";
import View from "./view";
import { elements } from './base';
// Classes from model and view
const Model = new modelClass('focus');

////////////////////////////////////////////////////////
//                                                    //
// Global State                                       //
// - Current tab                                      //
// - Current running timer (focus/break/longbreak)    //
// + Modified countdown timer object                  //
//                                                    //
////////////////////////////////////////////////////////
var state = {};


// Control the timer data & UI
const controlTimer = () => {
  // 1. Get current tab

    // 2. Execute timer in model with currentTab as parameter

    // 3. Update title

    // 4. Update state

    // 5. Update UI with currentTab as parameter
}

// event listener
elements.focusStart.addEventListener('click',(e) => {
  console.log('Timer started');
});





// Check when tab is change
function controlTab() {
  // check if there's any running timer
    // yes => run timer on changed tab

  // check if the new tab is same to the previous currentTab
    // update the UI (bg - illustration - timer - tab)
    View.renderTab(state.currentTab);

  // test
  //console.log(state.currentTab);
}


// Focus tab - listener
elements.focusTab.addEventListener('click', () => {
  state.currentTab = "focus";
  controlTab();
});
// Break tab - listener
elements.breakTab.addEventListener('click', () => {
  state.currentTab = "break";
  controlTab();
});
// Long break - listener
elements.longBreakTab.addEventListener('click', () => {
  state.currentTab = "longBreak";
  controlTab();
});




// Init - set default state
const init = () => {
  state.currentTab = "focus";
  // Render focus timer block
}
init()
