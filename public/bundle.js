!function(e){var t={};function a(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(r,o,function(t){return e[t]}.bind(null,o));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,a){"use strict";a.r(t);const r={start:document.getElementById("js-start"),pause:document.getElementById("js-pause"),reset:document.getElementById("js-reset"),title:document.getElementById("js-title"),audio:document.getElementById("js-alarm"),timerTitle:document.getElementById("js-timer-title"),timer:document.getElementById("js-timer"),focusTab:document.getElementById("js-focus-tab"),breakTab:document.getElementById("js-break-tab"),longBreakTab:document.getElementById("js-longbreak-tab"),blockBackgound:document.getElementById("js-block-background"),blockIllustration:document.getElementById("js-block-illustration"),settingSubmit:document.getElementById("js-setting-submit"),settingFocus:document.getElementById("setting-focus"),settingBreak:document.getElementById("setting-break"),settingLongBreak:document.getElementById("setting-longBreak"),settingLoop:document.getElementById("setting-loop"),settingAlarm:document.getElementById("setting-alarms"),settingTitle:document.getElementById("setting-title"),settingNotification:document.getElementById("setting-notification")};var o={resetTime(){!0===state.resetTimer?"focus"===state.currentTab?state.remainingTime=60*localStorage.focus:"break"===state.currentTab?state.remainingTime=60*localStorage.break:"longBreak"===state.currentTab&&(state.remainingTime=60*localStorage.longBreak):!1===state.resetTimer&&(state.resetTimer=!0)},interval(){state.remainingTime=state.remainingTime-1},clearTimer(){clearInterval(state.timerId)},playAudio(){r.audio.play()},updateHistory(){"focus"===state.currentTab&&(localStorage.totalPomodoro=parseInt(localStorage.totalPomodoro)+1)},updateLocalStorage(){localStorage.setItem("focus",r.settingFocus.value),localStorage.setItem("break",r.settingBreak.value),localStorage.setItem("longBreak",r.settingLongBreak.value),localStorage.setItem("loop",r.settingLoop.value),localStorage.setItem("alarm",r.settingAlarm.value),localStorage.setItem("title",r.settingTitle.value),localStorage.setItem("notification",r.settingNotification.value),console.log(localStorage)}},n={tabs:{activeTab:["text-gray-800","bg-gray-300","shadow-sm"]},focus:{bgClass:"bg-red-200",illustration:'<img class="my-px pt-px md:p-0 md:m-0" src="https://raw.githubusercontent.com/NLNT/Pomodoro-timer/master/img/focus-illustration.svg?sanitize=true" alt="Woman working illustration">'},break:{bgClass:"bg-teal-200",illustration:'<img class="py-1 -my-px md:my-px md:py-px" src="https://raw.githubusercontent.com/NLNT/Pomodoro-timer/master/img/break-illustration.svg?sanitize=true" alt="Woman mediatating illustration">'},longBreak:{bgClass:"bg-blue-200",illustration:'<img class="my-1 pt-px" src="https://raw.githubusercontent.com/NLNT/Pomodoro-timer/master/img/long-break-illustartion.svg?sanitize=true" alt="two people resting during a trip illustration">'},renderTab(e,t){this.renderBackgroundColor(e,t),this.renderTabStyle(e,t),this.renderIllustration(e)},renderBackgroundColor(e,t){let a,o;"focus"===t?a=this.focus.bgClass:"break"===t?a=this.break.bgClass:"longBreak"===t&&(a=this.longBreak.bgClass),"focus"===e?o=this.focus.bgClass:"break"===e?o=this.break.bgClass:"longBreak"===e&&(o=this.longBreak.bgClass),r.blockBackgound.classList.replace(a,o)},renderTabStyle(e,t){let a,o;"focus"===t?a=r.focusTab:"break"===t?a=r.breakTab:"longBreak"===t&&(a=r.longBreakTab),"focus"===e?o=r.focusTab:"break"===e?o=r.breakTab:"longBreak"===e&&(o=r.longBreakTab),this.tabs.activeTab.forEach(e=>a.classList.remove(e)),this.tabs.activeTab.forEach(e=>o.classList.add(e))},renderIllustration(e){let t=this[e].illustration;r.blockIllustration.innerHTML=t},renderTimer(){let e;e=localStorage[state.currentTab]<10?"0":"",r.timer.innerHTML=`${e}${localStorage[state.currentTab]}:00`},formatTimer(){let e=Math.floor(state.remainingTime/60),t=state.remainingTime%60;e=e<10?`0${e}`:e,t=t<10?`0${t}`:t,0==state.remainingTime&&(r.timer.innerHTML="00:00"),r.timer.innerHTML=`${e}:${t}`,r.title.innerHTML=`${e}:${t} - Pomodoro Online`},renderTimerFinished(){let e,t,a=localStorage.loop-parseInt(localStorage.totalPomodoro)%localStorage.loop;a===localStorage.loop&&"focus"===state.currentTab?e="Have a long break":"longBreak"===state.currentTab?e="Start working":(t=a>1?"s":"",e=`${a} pomodoro${t} untill long break`),r.timerTitle.innerHTML=e},toggleStartPause(){r.start.classList.add("hidden"),r.pause.classList.remove("hidden")},togglePauseStart(){r.pause.classList.add("hidden"),r.start.classList.remove("hidden")},updateSettingForm(){r.settingFocus.value=localStorage.getItem("focus"),r.settingBreak.value=localStorage.getItem("break"),r.settingLongBreak.value=localStorage.getItem("longBreak"),r.settingLoop.value=localStorage.getItem("loop"),r.settingAlarm.value=localStorage.getItem("alarm"),"on"===localStorage.getItem("title")?r.settingTitle.checked=!0:r.settingTitle.checked=!1,localStorage.getItem("notification")}};function i(){state.resetTimer=!0,o.clearTimer(),r.timerTitle.innerHTML="Pomodoro Timer",c(),o.resetTime(),state.timerId=setInterval(()=>{o.interval(),n.formatTimer(),state.remainingTime<=0&&s()},1e3),state.activeTimer=!0}function s(){o.clearTimer(),o.playAudio(),o.updateHistory(),n.renderTimerFinished()}function l(){state.currentTab!==state.newTab?(state.previousTab=state.currentTab,state.currentTab=state.newTab,c(),n.renderTimer(),n.renderTab(state.currentTab,state.previousTab),state.activeTimer&&i()):state.currentTab===state.newTab&&(state.newTab="")}function c(){o.updateLocalStorage()}window.state={},r.start.addEventListener("click",(function(){state.activeTimer=!0,n.toggleStartPause(),r.timerTitle.innerHTML="Pomodoro Timer",c(),o.resetTime(),state.timerId=setInterval(()=>{o.interval(),n.formatTimer(),state.remainingTime<=0&&s()},1e3)})),r.pause.addEventListener("click",(function(){state.remainingTime>0&&(n.togglePauseStart(),clearInterval(state.timerId),state.resetTimer=!1)})),r.reset.addEventListener("click",i),r.focusTab.addEventListener("click",()=>{state.newTab="focus",l()}),r.breakTab.addEventListener("click",()=>{state.newTab="break",l()}),r.longBreakTab.addEventListener("click",()=>{state.newTab="longBreak",l()}),r.settingSubmit.addEventListener("click",e=>{e.preventDefault(),c(),!1===state.activeTimer&&n.renderTimer()}),window.addEventListener("beforeunload",c);state.focus={},state.break={},state.longBreak={},null===localStorage.getItem("focus")?o.updateLocalStorage():null!==localStorage.getItem("focus")&&n.updateSettingForm(),state.currentTab="focus",state.newTab="",state.previousTab="",state.activeTimer=!1,state.resetTimer=!0,state.remainingTime=0,null===localStorage.getItem("totalPomodoro")&&localStorage.setItem("totalPomodoro",0),n.renderTimer()}]);