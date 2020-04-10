import Model from "./model";
import View from "./view";
import { elements } from './base';


window.state = {};



// Missing Features
// 2) Data dashboard
// 3) Display indicator in page title that timer is finished
// 4) task as 3rd tab
// 5) settings saved indicator

// Bugs
// 1) if user double click start too fast, there will be 2 timer

// Suggestion



/////////////////////////////////
//                             //
//        Start Event          //
//                             //
/////////////////////////////////
function startTimer() {
  // 1) Update State
  state.activeTimer = true;
  // 2) Toggle start -> pause
  View.toggleStartPause();
  // 3) Change timer title
  elements.timerTitle.innerHTML = 'Pomodoro Timer';
  // 4) Check & update timer setting
  Model.updateLocalStorage();
  // 5) Run the timer
  Model.resetTime();
  // 6) Start the timming setInterval function
  state.timerId = setInterval( () => {
    Model.interval();
    View.formatTimer();
    if (state.remainingTime <= 0) {
      timerFinished();
    };
  }, 1000);
}
// start timer event listener
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
  };
};
// Reset timer event listenner
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
  // 3) Start timer
  startTimer();
};
// Reset timer event listenner
elements.reset.addEventListener('click', resetTimer);



/////////////////////////////////
//                             //
//       Timer Finished        //
//                             //
/////////////////////////////////
function timerFinished() {
  Model.clearTimer();
  if (localStorage.getItem('notification') === 'on') { 
    Model.playAudio(); 
  };
  Model.updateHistory();
  View.renderTimerFinished();
  View.updateHistoryContent();
  Model.updateCharts();
};



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
    // 3) Update default time in timer
    View.renderTimer();
    // 4) update the UI (bg - illustration - timer - tab)
    View.renderTab();
    // 5) if there's running timer => runTimer on new tab
    if (state.activeTimer) {
      resetTimer();
      View.toggleStartPause();
    };
  };
};

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

// init setting
function settingInit() {
  if (localStorage.getItem('focus') === null) {
    Model.updateLocalStorage(); // Form -> Storage
  } else if (localStorage.getItem('focus') !== null) {
    View.updateSettingForm(); // Storage -> Form
  }
};


// Init Other settings
function otherSettingInit() {
  // Create default other settings & maintain other settings after refresh
  if (localStorage.getItem('title') === null ) {
    localStorage.setItem('title', 'on');
    localStorage.setItem('notification', 'on');
  }
  View.updateOtherSettings();
};
// Other settings event listenner
elements.settingTitle.addEventListener('click', Model.updateOtherSettings);
elements.settingNotification.addEventListener('click', Model.updateOtherSettings);



/////////////////////////////////
//                             //
//        Reset Setting        //
//                             //
/////////////////////////////////
function resetSetting() {
  Model.resetSettingStorage();
  View.updateSettingForm();
  View.updateOtherSettings();
}
elements.settingReset.addEventListener('click', resetSetting);





// Sound tester event listenner
elements.settingAlarm.addEventListener('change', () => {
  Model.changeAudio(); 
  Model.updateLocalStorage();
});
elements.alarmTester.addEventListener('click', Model.playAudio);





// Custom timer autosave event listenners
let settingInputs = [elements.settingFocus, elements.settingBreak, elements.settingLongBreak];

settingInputs.forEach((evt) => {
  evt.addEventListener('input', () => {
    if (state.activeTimer === false) {
      Model.updateLocalStorage();
      View.renderTimer();}
    });
  });
  
  
  // Loop setting autosave
  elements.settingLoop.addEventListener('input',Model.updateLocalStorage);
  
  
  
  
  
  
  
/////////////////////////////////
//                             //
//           History           //
//                             //
/////////////////////////////////

// Create / maintaint pomodoro history
function createHistory() {
  // Total pomodoro
  if (localStorage.getItem('totalPomodoro') === null || localStorage.getItem('totalPomodoro') === 'NaN') {
    localStorage.setItem('totalPomodoro', '0');
  };
  // Today pomodoro
  if (localStorage.getItem('todayPomodoro') === null || localStorage.getItem('todayPomodoro') === 'NaN') {
    localStorage.setItem('todayPomodoro', '0');
  };
  // This month pomodoro
  if (localStorage.getItem('monthPomodoro') === null || localStorage.getItem('monthPomodoro') === 'NaN') {
    localStorage.setItem('monthPomodoro', '0');
  };
  if (localStorage.getItem('weekPomodoro') === null) {
    localStorage.setItem('weekPomodoro', '[0, 0, 0, 0, 0, 0, 0]');
  };
  if (localStorage.getItem('dayPomodoro') === null) {
    localStorage.setItem('dayPomodoro', '[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]');
  };
};

// Check for new date to reset & update last online status
function checkDateMonth() {
  Model.checkNewDay();
  Model.checkNewMonth();
  Model.updateLastOnline();
}



/////////////////////////////////
//                             //
//    Setting/History Tab      //
//                             //
/////////////////////////////////
function tabSettingHistory() {
  if (state.secondCurTab !== state.secondNewTab) {
    // 1) update secondCurTab in state
    state.secondCurTab = state.secondNewTab;

    // 2) View.change tab content
    View.updateTabContent();

    // 3) View.change tab active style
    View.updateSecondTabActive();
  };
};


elements.tabSetting.addEventListener('click', () => {
  state.secondNewTab = 'setting';
  tabSettingHistory();
});
elements.tabHistory.addEventListener('click', () => {
  state.secondNewTab = 'history';
  tabSettingHistory();
});


//////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////
//                             //
//         Week Chart          //
//                             //
/////////////////////////////////
window.weekchart = new Chart(elements.weekChart, {
  // The type of chart we want to create
  type: 'bar',

  // The data for our dataset
  data: {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{
          label: 'Pomodoros',
          backgroundColor: '#FEB2B2',
          borderColor: '#FEB2B2',
          data: JSON.parse(localStorage.getItem('weekPomodoro')), // parse array in localstorage
      }]
  },

  // Configuration options go here
  options: {
    scales: {
      xAxes: [{
          gridLines: {
              display:false
          }
      }],
    },
    legend: {
      display: false
    },
  }
  
});


window.daychart = new Chart(elements.dayChart, {
  // The type of chart we want to create
  type: 'bar',

  // The data for our dataset
  data: {
      labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
      datasets: [{
          label: 'Pomodoros',
          backgroundColor: '#FEB2B2',
          borderColor: '#FEB2B2',
          data: JSON.parse(localStorage.getItem('dayPomodoro')), // parse array in localstorage
      }],
  },

  // Configuration options go here
  options: {
    scales: {
      xAxes: [{
          gridLines: {
              display:false
          }
      }],
    },
    legend: {
      display: false
    },
  },
});
//////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////
//                             //
//        Reset History        //
//                             //
/////////////////////////////////

function resetHistory() {
  Model.resetHistory();
  Model.updateCharts();
  View.updateHistoryContent();
}

elements.historyReset.addEventListener('click', resetHistory);




// Init - set default state
const init = () => {
  state.currentTab = "focus";
  state.newTab = '';
  state.previousTab = '';
  state.activeTimer = false;
  state.resetTimer = true;
  state.remainingTime = 0;
  state.secondCurTab = 'history';
  state.secondNewTab = '';

  
  // Check to get or create setting info
  settingInit();
  otherSettingInit();
  // Check & create history (if doesn't exist)
  createHistory();
  // Check for new date & reset today pomodoro
  checkDateMonth();
  // Render default timer
  View.renderTimer();
  // Render history content
  View.updateHistoryContent();
}
init();
