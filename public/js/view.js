import { elements } from './base';




// View
export default {
  focus: {
    bgClass: 'bg-red-200',
    illustration: `<img class="my-px pt-px md:p-0 md:m-0" src="https://raw.githubusercontent.com/NLNT/Pomodoro-timer/master/img/focus-illustration.svg?sanitize=true" alt="Woman working illustration">`,
  },
  break: {
    bgClass: 'bg-teal-200',
    illustration: `<img class="py-1 -my-px md:my-px md:py-px" src="https://raw.githubusercontent.com/NLNT/Pomodoro-timer/master/img/break-illustration.svg?sanitize=true" alt="Woman mediatating illustration">`,
  },
  longBreak: {
    bgClass: 'bg-blue-200',
    illustration: `<img class="my-1 pt-px" src="https://raw.githubusercontent.com/NLNT/Pomodoro-timer/master/img/long-break-illustartion.svg?sanitize=true" alt="two people resting during a trip illustration">`,
  },


  renderTab(currentTab, previousTab) {
    // 1) Change background color
    this.renderBackgroundColor(currentTab, previousTab);
    
    // 2) Change the tab style (bg & shadow)

    // 3) Update illustration
    this.renderIllustration(currentTab);

    // 4) Change the timer

    // 5) Change the illustration
  },


  renderBackgroundColor(currentTab, previousTab) {
    let removeBgClass, addBgClass;
    // 1) convert the previous tab parameter to tailwind bg class
    if (previousTab === "focus") {removeBgClass = this.focus.bgClass}
    else if (previousTab === "break") {removeBgClass = this.break.bgClass}
    else if (previousTab === "longBreak") {removeBgClass = this.longBreak.bgClass};
    // 2) convert the current tab parameter to tailwind bg class
    if (currentTab === "focus") {addBgClass = this.focus.bgClass}
    else if (currentTab === "break") {addBgClass = this.break.bgClass}
    else if (currentTab === "longBreak") {addBgClass = this.longBreak.bgClass};
    // 3) Replace previous bg with new bg
    elements.blockBackgound.classList.replace(removeBgClass, addBgClass);
  },


  renderTabStyle(currentTab) {

  },


  renderIllustration(currentTab) {
    // get HTML code using:   this.[focus/break/longBreak].illustration
    let illustrationMarkup = this[currentTab].illustration;
    elements.blockIllustration.innerHTML = illustrationMarkup;
  },


  renderTimer(currentTab) {
    
  },

}


/*

list of things to update when tab is change"
  + Illustration
  + bg-color
  + timer
  + active tab (shadow & color)
  + suggestion list


*/