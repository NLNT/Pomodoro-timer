import { elements } from './base';




// View
export default {
  tabs: {
    activeTab: ['text-gray-800', 'bg-gray-300', 'shadow-sm']
  },
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
  markup: {
    start: '<a id="js-start" class="flex font-semibold text-xl items-center py-1 px-6 border-r fill-current transition-color duration-200 text-red-700 cursor-pointer hover:text-red-800"><span><svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs/><path d="M16 10v28l22-14z"/></svg></span>Start</a>',
    pause: '<a id="js-pause" class="flex text-lg items-center py-1 px-6 border-r fill-current transition-color duration-200 text-gray-700 cursor-pointer hover:text-gray-900"><span><svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg></span>Pause</a>',
  },


  renderTab(currentTab, previousTab) {
    // 1) Change background color
    this.renderBackgroundColor(currentTab, previousTab);
    
    // 2) Change the tab style (bg & shadow & text)
    this.renderTabStyle(currentTab, previousTab);

    // 3) Update illustration
    this.renderIllustration(currentTab);
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


  // Switch active styles from previous tab to current tab
  renderTabStyle(currentTab, previousTab) {
    let active, nonActive;
    // 1) Get previousTab DOM element
    if (previousTab === 'focus') {active = elements.focusTab}
    else if (previousTab === 'break') {active = elements.breakTab}
    else if (previousTab === 'longBreak') {active = elements.longBreakTab};

    // 2) Get currentTab DOM element
    if (currentTab === 'focus') {nonActive = elements.focusTab}
    else if (currentTab === 'break') {nonActive = elements.breakTab}
    else if (currentTab === 'longBreak') {nonActive = elements.longBreakTab};

    // 3) remove active styles from previousTab
    this.tabs.activeTab.forEach(item => active.classList.remove(item));
    // 4) add active styles to currentTab
    this.tabs.activeTab.forEach(item => nonActive.classList.add(item));

  },


  renderIllustration(currentTab) {
    // get HTML code using:   this.[focus/break/longBreak].illustration
    let illustrationMarkup = this[currentTab].illustration;
    elements.blockIllustration.innerHTML = illustrationMarkup;
  },


  renderTimer(currentTab) {
    
  },
  

  renderSuggestion(currentTab) {

  },

  toggleStartPause() {
    elements.start.classList.add('hidden');
    elements.pause.classList.remove('hidden');
  },

  togglePauseStart() {
    elements.pause.classList.add('hidden');
    elements.start.classList.remove('hidden');
  },
}
