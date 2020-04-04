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
    //time: '05:00',
    bgClass: 'bg-teal-200',
    illustration: `<img class="py-1 -my-px md:my-px md:py-px" src="https://raw.githubusercontent.com/NLNT/Pomodoro-timer/master/img/break-illustration.svg?sanitize=true" alt="Woman mediatating illustration">`,
  },
  longBreak: {
    bgClass: 'bg-blue-200',
    illustration: `<img class="my-1 pt-px" src="https://raw.githubusercontent.com/NLNT/Pomodoro-timer/master/img/long-break-illustartion.svg?sanitize=true" alt="two people resting during a trip illustration">`,
  },


  renderTab(currentTab, previousTab) {
    // 1) Change background color
    this.renderBackgroundColor();
    
    // 2) Change the tab style (bg & shadow & text)
    this.renderTabStyle();

    // 3) Update illustration
    this.renderIllustration();
  },

  // Replace previousTab background with currentTab background
  renderBackgroundColor() {
    elements.blockBackgound.classList.replace(this[state.previousTab].bgClass, this[state.currentTab].bgClass);
  },


  // Switch active styles from previous tab to current tab
  renderTabStyle() {
    let active, nonActive;
    let prevTab = state.previousTab;
    let currTab = state.currentTab;
    // 1) Get previousTab DOM element
    if (prevTab === 'focus') {active = elements.focusTab}
    else if (prevTab === 'break') {active = elements.breakTab}
    else if (prevTab === 'longBreak') {active = elements.longBreakTab};

    // 2) Get currentTab DOM element
    if (currTab === 'focus') {nonActive = elements.focusTab}
    else if (currTab === 'break') {nonActive = elements.breakTab}
    else if (currTab === 'longBreak') {nonActive = elements.longBreakTab};

    // 3) remove active styles from previousTab
    this.tabs.activeTab.forEach(item => active.classList.remove(item));
    // 4) add active styles to currentTab
    this.tabs.activeTab.forEach(item => nonActive.classList.add(item));
  },


  // Changing illustration
  renderIllustration() {
    let illustrationMarkup = this[state.currentTab].illustration;
    elements.blockIllustration.innerHTML = illustrationMarkup;
  },
  
  // Change default time value in timer
  renderTimer() {
    let zero;
    localStorage[state.currentTab] < 10 ? zero = "0" : zero = "";
    elements.timer.innerHTML = `${zero}${localStorage[state.currentTab]}:00`;
  },

  // Turn remaining time into timer format
  formatTimer() {
    let minute = Math.floor(state.remainingTime / 60);
    let second = state.remainingTime % 60;

    // Add 0 infront of number < 10
    minute < 10 ? minute = `0${minute}` : minute = minute;
    second < 10 ? second = `0${second}` : second = second;
    if (state.remainingTime == 0) {
      elements.timer.innerHTML = `00:00`;
    }
    elements.timer.innerHTML = `${minute}:${second}`;

    // If the setting allow:
    elements.title.innerHTML = `${minute}:${second} - Pomodoro Online`;
  },

  renderTimerFinished() {
    let title,plural;
    let timeToLongBreak = localStorage.loop - (parseInt(localStorage.todayPomodoro) % localStorage.loop);

    if (timeToLongBreak === localStorage.loop && state.currentTab === 'focus') {
      title = 'Have a long break';
    } else if (state.currentTab === 'longBreak'){
      title = 'Start working';
    } else {
      timeToLongBreak > 1 ? plural = "s" : plural = "";
      title = `${timeToLongBreak} pomodoro${plural} untill long break`;
    };

    elements.timerTitle.innerHTML = title;
  },

  toggleStartPause() {
    elements.start.classList.add('hidden');
    elements.pause.classList.remove('hidden');
  },

  togglePauseStart() {
    elements.pause.classList.add('hidden');
    elements.start.classList.remove('hidden');
  },

  // Settings
  updateSettingForm() {
    // 1) push focus/break/longBreak
    elements.settingFocus.value = localStorage.getItem('focus');
    elements.settingBreak.value = localStorage.getItem('break');
    elements.settingLongBreak.value = localStorage.getItem('longBreak');
    // 2) Push loop
    elements.settingLoop.value = localStorage.getItem('loop');

    // 3) Alarm sound
    elements.settingAlarm.value = localStorage.getItem('alarm');

    // 4) Others
    if (localStorage.getItem('title') === 'on') {
      elements.settingTitle.checked = true;
    } else {elements.settingTitle.checked = false;}
    
    localStorage.getItem('notification');
  },
}
