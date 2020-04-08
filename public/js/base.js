export const elements = {
  // Start/Pause/Reset buttons
  start: document.getElementById('js-start'),
  pause: document.getElementById('js-pause'),
  reset: document.getElementById('js-reset'),

  // Title
  title: document.getElementById('js-title'),

  // Audio
  audio: document.getElementById('js-alarm'),
  alarmTester: document.getElementById('js-sound-tester'),
  alarmDiv: document.getElementById('js-alarm-container'),

  // Timer
  timerTitle: document.getElementById('js-timer-title'),
  timer: document.getElementById('js-timer'),

  // Tabs
  focusTab: document.getElementById('js-focus-tab'),
  breakTab: document.getElementById('js-break-tab'),
  longBreakTab: document.getElementById('js-longbreak-tab'),

  // Block & illustration
  blockBackgound: document.getElementById('js-block-background'),
  blockIllustration: document.getElementById('js-block-illustration'),


  // Setting - Custom time
  settingReset: document.getElementById('js-reset-setting'),

  settingFocus: document.getElementById('setting-focus'),
  settingBreak: document.getElementById('setting-break'),
  settingLongBreak: document.getElementById('setting-longBreak'),

  settingLoop: document.getElementById('setting-loop'),

  settingAlarm: document.getElementById('setting-alarms'),
  
  settingTitle: document.getElementById('setting-title'),
  settingNotification: document.getElementById('setting-notification'),


  // Tab: Settings & History
  tabSetting: document.getElementById('js-tab-setting'),
  tabHistory: document.getElementById('js-tab-history'),

  contentSetting: document.getElementById('js-content-setting'),
  contentHistory: document.getElementById('js-content-history'),

  // History content
  historyToday: document.getElementById('js-history-today'),
  historyMonth: document.getElementById('js-history-month'),
  historyMonthBadge: document.getElementById('js-history-month-badge'),
  historyTotal: document.getElementById('js-history-total'),
  
  // Charts
  weekChart: document.getElementById('js-week-chart').getContext('2d'),
  dayChart: document.getElementById('js-day-chart').getContext('2d'),
  
}