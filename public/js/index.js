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
const state = {
  currentTab: 'focus'
};





const controlTimer = () => {
  // 1. Get current tab

    // 2. Execute timer in model with currentTab as parameter

    // 3. Update state

    // 4. Update UI with currentTab as parameter
}


const controlTab = () => {
  //
}






// event listener
elements.focusStart.addEventListener('click',(e) => {
  console.log('Timer started');
});
