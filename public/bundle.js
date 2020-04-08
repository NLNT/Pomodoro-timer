!function(t){var e={};function a(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=e,a.d=function(t,e,o){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(o,r,function(e){return t[e]}.bind(null,r));return o},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=0)}([function(t,e,a){"use strict";a.r(e);const o={start:document.getElementById("js-start"),pause:document.getElementById("js-pause"),reset:document.getElementById("js-reset"),title:document.getElementById("js-title"),audio:document.getElementById("js-alarm"),alarmTester:document.getElementById("js-sound-tester"),alarmDiv:document.getElementById("js-alarm-container"),timerTitle:document.getElementById("js-timer-title"),timer:document.getElementById("js-timer"),focusTab:document.getElementById("js-focus-tab"),breakTab:document.getElementById("js-break-tab"),longBreakTab:document.getElementById("js-longbreak-tab"),blockBackgound:document.getElementById("js-block-background"),blockIllustration:document.getElementById("js-block-illustration"),settingReset:document.getElementById("js-reset-setting"),settingFocus:document.getElementById("setting-focus"),settingBreak:document.getElementById("setting-break"),settingLongBreak:document.getElementById("setting-longBreak"),settingLoop:document.getElementById("setting-loop"),settingAlarm:document.getElementById("setting-alarms"),settingTitle:document.getElementById("setting-title"),settingNotification:document.getElementById("setting-notification"),tabSetting:document.getElementById("js-tab-setting"),tabHistory:document.getElementById("js-tab-history"),contentSetting:document.getElementById("js-content-setting"),contentHistory:document.getElementById("js-content-history"),historyToday:document.getElementById("js-history-today"),historyMonth:document.getElementById("js-history-month"),historyMonthBadge:document.getElementById("js-history-month-badge"),historyTotal:document.getElementById("js-history-total"),weekChart:document.getElementById("js-week-chart").getContext("2d"),dayChart:document.getElementById("js-day-chart").getContext("2d")};var r={resetTime(){!0===state.resetTimer?state.remainingTime=60*localStorage[state.currentTab]:!1===state.resetTimer&&(state.resetTimer=!0)},interval(){state.remainingTime=state.remainingTime-1},clearTimer(){clearInterval(state.timerId)},playAudio(){o.audio.play()},changeAudio(){o.audio.src=`alarms/${o.settingAlarm.value}.mp3`},updateLocalStorage(){o.settingFocus.value<1&&(o.settingFocus.value=1),o.settingFocus.value>60&&(o.settingFocus.value=60),o.settingBreak.value<1&&(o.settingBreak.value=1),o.settingBreak.value>60&&(o.settingBreak.value=60),o.settingLongBreak.value<1&&(o.settingLongBreak.value=1),o.settingLongBreak.value>60&&(o.settingLongBreak.value=60),localStorage.setItem("focus",o.settingFocus.value),localStorage.setItem("break",o.settingBreak.value),localStorage.setItem("longBreak",o.settingLongBreak.value),localStorage.setItem("loop",o.settingLoop.value),localStorage.setItem("alarm",o.settingAlarm.value),console.log(localStorage)},updateOtherSettings(){!0===o.settingTitle.checked?localStorage.setItem("title","on"):!1===o.settingTitle.checked&&localStorage.setItem("title","off"),!0===o.settingNotification.checked?localStorage.setItem("notification","on"):!1===o.settingNotification.checked&&localStorage.setItem("notification","off")},resetSettingStorage(){localStorage.setItem("focus","25"),localStorage.setItem("break","5"),localStorage.setItem("longBreak","30"),localStorage.setItem("loop","4"),localStorage.setItem("alarm","beep-alarm"),localStorage.setItem("title","on"),localStorage.setItem("notification","on")},checkNewDay(){let t=new Date;function e(){localStorage.setItem("todayPomodoro","0")}(t.getFullYear()>localStorage.lastOnlineYear||t.getMonth()>localStorage.lastOnlineMonth||t.getDate()>localStorage.lastOnlineDate&&t.getMonth()==localStorage.lastOnlineMonth)&&e()},checkNewMonth(){let t=new Date;function e(){localStorage.setItem("monthPomodoro","0")}(t.getFullYear()>localStorage.lastOnlineYear||t.getMonth()>localStorage.lastOnlineMonth)&&e()},updateHistory(){"focus"===state.currentTab&&(localStorage.totalPomodoro=parseInt(localStorage.totalPomodoro)+1,localStorage.todayPomodoro=parseInt(localStorage.todayPomodoro)+1,localStorage.monthPomodoro=parseInt(localStorage.monthPomodoro)+1,this.updateHistoryWeek(),this.updateHistoryDay())},updateHistoryWeek(){let t=(new Date).getDay(),e=JSON.parse(localStorage.getItem("weekPomodoro"));e[t]=e[t]+1,localStorage.setItem("weekPomodoro",JSON.stringify(e))},updateHistoryDay(){let t=(new Date).getHours(),e=JSON.parse(localStorage.getItem("dayPomodoro"));e[t]=e[t]+1,localStorage.setItem("dayPomodoro",JSON.stringify(e))},updateLastOnline(){let t=new Date;localStorage.setItem("lastOnlineDate",t.getDate()),localStorage.setItem("lastOnlineMonth",t.getMonth()),localStorage.setItem("lastOnlineYear",t.getFullYear())},updateCharts(){weekchart.data.datasets[0].data=JSON.parse(localStorage.getItem("weekPomodoro")),weekchart.update(),daychart.data.datasets[0].data=JSON.parse(localStorage.getItem("dayPomodoro")),daychart.update()}},n={tabs:{activeTab:["text-gray-800","bg-gray-300","shadow-sm"]},focus:{bgClass:"bg-red-200",illustration:'<img class="my-px pt-px md:p-0 md:m-0" src="https://raw.githubusercontent.com/NLNT/Pomodoro-timer/master/img/focus-illustration.svg?sanitize=true" alt="Woman working illustration">'},break:{bgClass:"bg-teal-200",illustration:'<img class="py-1 -my-px md:my-px md:py-px" src="https://raw.githubusercontent.com/NLNT/Pomodoro-timer/master/img/break-illustration.svg?sanitize=true" alt="Woman mediatating illustration">'},longBreak:{bgClass:"bg-blue-200",illustration:'<img class="my-1 pt-px" src="https://raw.githubusercontent.com/NLNT/Pomodoro-timer/master/img/long-break-illustartion.svg?sanitize=true" alt="two people resting during a trip illustration">'},settingHistory:{activeTab:["text-gray-800","bg-gray-300","shadow-sm"]},renderTab(){this.renderBackgroundColor(),this.renderTabStyle(),this.renderIllustration()},renderBackgroundColor(){o.blockBackgound.classList.replace(this[state.previousTab].bgClass,this[state.currentTab].bgClass)},renderTabStyle(){let t,e,a=state.previousTab,r=state.currentTab;"focus"===a?t=o.focusTab:"break"===a?t=o.breakTab:"longBreak"===a&&(t=o.longBreakTab),"focus"===r?e=o.focusTab:"break"===r?e=o.breakTab:"longBreak"===r&&(e=o.longBreakTab),this.tabs.activeTab.forEach(e=>t.classList.remove(e)),this.tabs.activeTab.forEach(t=>e.classList.add(t))},renderIllustration(){let t=this[state.currentTab].illustration;o.blockIllustration.innerHTML=t},renderTimer(){let t;t=localStorage[state.currentTab]<10?"0":"",o.timer.innerHTML=`${t}${localStorage[state.currentTab]}:00`},formatTimer(){let t=Math.floor(state.remainingTime/60),e=state.remainingTime%60;t=t<10?`0${t}`:t,e=e<10?`0${e}`:e,0==state.remainingTime&&(o.timer.innerHTML="00:00"),o.timer.innerHTML=`${t}:${e}`,"on"===localStorage.getItem("title")&&(o.title.innerHTML=`${t}:${e} - Pomodoro Online`)},renderTimerFinished(){let t,e,a=parseInt(localStorage.loop)-parseInt(localStorage.todayPomodoro)%parseInt(localStorage.loop);a===parseInt(localStorage.loop)&&"focus"===state.currentTab?t="Have a long break":"longBreak"===state.currentTab?t="Start working":(e=a>1?"s":"",t=`${a} pomodoro${e} untill long break`),o.timerTitle.innerHTML=t},toggleStartPause(){o.start.classList.add("hidden"),o.pause.classList.remove("hidden")},togglePauseStart(){o.pause.classList.add("hidden"),o.start.classList.remove("hidden")},updateSettingForm(){o.settingFocus.value=localStorage.getItem("focus"),o.settingBreak.value=localStorage.getItem("break"),o.settingLongBreak.value=localStorage.getItem("longBreak"),o.settingLoop.value=localStorage.getItem("loop"),""===localStorage.getItem("alarm")&&localStorage.setItem("alarm","beep-alarm"),o.settingAlarm.value=localStorage.getItem("alarm")},updateOtherSettings(){"on"===localStorage.title?o.settingTitle.checked=!0:o.settingTitle.checked=!1,"on"===localStorage.notification?o.settingNotification.checked=!0:o.settingNotification.checked=!1},updateTabContent(){o.contentSetting.classList.toggle("hidden"),o.contentHistory.classList.toggle("hidden")},updateSecondTabActive(){this.settingHistory.activeTab.forEach(t=>{o.tabSetting.classList.toggle(t),o.tabHistory.classList.toggle(t)})},updateHistoryContent(){this.updateHistoryToday(),this.updateHistoryMonth(),this.updateHistoryTotal()},updateHistoryToday(){o.historyToday.innerHTML=localStorage.getItem("todayPomodoro")},updateHistoryMonth(){o.historyMonth.innerHTML=localStorage.getItem("monthPomodoro");o.historyMonthBadge.innerHTML=`In ${["January","February","March","April","May","June","July","August","September","October","November","December"][parseInt(localStorage.getItem("lastOnlineMonth"))]}`},updateHistoryTotal(){o.historyTotal.innerHTML=localStorage.getItem("totalPomodoro")}};function l(){state.activeTimer=!0,n.toggleStartPause(),o.timerTitle.innerHTML="Pomodoro Timer",r.updateLocalStorage(),r.resetTime(),state.timerId=setInterval(()=>{r.interval(),n.formatTimer(),state.remainingTime<=0&&function(){r.clearTimer(),"on"===localStorage.getItem("notification")&&r.playAudio();r.updateHistory(),n.renderTimerFinished(),n.updateHistoryContent(),r.updateCharts()}()},1e3)}function s(){state.resetTimer=!0,r.clearTimer(),l()}function i(){state.currentTab!==state.newTab&&(state.previousTab=state.currentTab,state.currentTab=state.newTab,n.renderTimer(),n.renderTab(),state.activeTimer&&(s(),n.toggleStartPause()))}function g(){state.secondCurTab!==state.secondNewTab&&(state.secondCurTab=state.secondNewTab,n.updateTabContent(),n.updateSecondTabActive())}window.state={},o.start.addEventListener("click",l),o.pause.addEventListener("click",(function(){state.remainingTime>0&&(n.togglePauseStart(),clearInterval(state.timerId),state.resetTimer=!1)})),o.reset.addEventListener("click",s),o.focusTab.addEventListener("click",()=>{state.newTab="focus",i()}),o.breakTab.addEventListener("click",()=>{state.newTab="break",i()}),o.longBreakTab.addEventListener("click",()=>{state.newTab="longBreak",i()}),o.settingTitle.addEventListener("click",r.updateOtherSettings),o.settingNotification.addEventListener("click",r.updateOtherSettings),o.settingReset.addEventListener("click",(function(){r.resetSettingStorage(),n.updateSettingForm(),n.updateOtherSettings()})),o.settingAlarm.addEventListener("change",()=>{r.changeAudio(),r.updateLocalStorage()}),o.alarmTester.addEventListener("click",r.playAudio),[o.settingFocus,o.settingBreak,o.settingLongBreak].forEach(t=>{t.addEventListener("input",()=>{!1===state.activeTimer&&(r.updateLocalStorage(),n.renderTimer())})}),o.settingLoop.addEventListener("input",r.updateLocalStorage),o.tabSetting.addEventListener("click",()=>{state.secondNewTab="setting",g()}),o.tabHistory.addEventListener("click",()=>{state.secondNewTab="history",g()}),window.weekchart=new Chart(o.weekChart,{type:"bar",data:{labels:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],datasets:[{label:"Pomodoros",backgroundColor:"#FEB2B2",borderColor:"#FEB2B2",data:JSON.parse(localStorage.getItem("weekPomodoro"))}]},options:{scales:{xAxes:[{gridLines:{display:!1}}]},legend:{display:!1}}}),window.daychart=new Chart(o.dayChart,{type:"bar",data:{labels:["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],datasets:[{label:"Pomodoros",backgroundColor:"#FEB2B2",borderColor:"#FEB2B2",data:JSON.parse(localStorage.getItem("dayPomodoro"))}]},options:{scales:{xAxes:[{gridLines:{display:!1}}]},legend:{display:!1}}});state.currentTab="focus",state.newTab="",state.previousTab="",state.activeTimer=!1,state.resetTimer=!0,state.remainingTime=0,state.secondCurTab="history",state.secondNewTab="",null===localStorage.getItem("focus")?r.updateLocalStorage():null!==localStorage.getItem("focus")&&n.updateSettingForm(),null===localStorage.getItem("title")&&(localStorage.setItem("title","on"),localStorage.setItem("notification","on")),n.updateOtherSettings(),null===localStorage.getItem("totalPomodoro")&&localStorage.setItem("totalPomodoro","0"),null===localStorage.getItem("todayPomodoro")&&localStorage.setItem("todayPomodoro","0"),null===localStorage.getItem("monthPomodoro")&&localStorage.setItem("monthPomodoro","0"),null===localStorage.getItem("weekPomodoro")&&localStorage.setItem("weekPomodoro","[0, 0, 0, 0, 0, 0, 0]"),null===localStorage.getItem("dayPomodoro")&&localStorage.setItem("dayPomodoro","[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]"),r.checkNewDay(),r.checkNewMonth(),r.updateLastOnline(),n.renderTimer(),n.updateHistoryContent()}]);