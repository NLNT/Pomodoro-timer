import { elements } from './base';


/////////////////
//    Model    //
/////////////////

export default {

  runTimer() {
    console.log
    let time = state.focusTime;

    var timerId = setInterval(() => {

      console.log(time = time - 1);
      if (time === 0) {clearInterval(timerId);}
      
    }, 1000);
  },



  pauseTimer() {
    // clearinterval using timerID for both function
  },
}