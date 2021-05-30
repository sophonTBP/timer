
import './App.css';
import React  from 'react';

import ReactFCCtest from 'react-fcctest';




function Play(props) {
  return (
    <button id="start_stop" onClick={props.onClick}>
     Play
    </button>
  );
}

function Pause(props) {
  return (
    <button id="start_stop" onClick={props.onClick}>
     Pause
    </button>
  );
}






 class App  extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      currentPeriod:"Session",

      newSession:true,
      currentPeriodSession:true,
      sessionPaused:true,
      breakMin:5,
      
      sessionMin:25,
      interval:1000,
      count:300,
     
    };
      
     
    this.timer = null
    this.tick=this.tick.bind(this)
this.onClickButtonStart = this.onClickButtonStart.bind(this)


this.onClickButtonPause = this.onClickButtonPause.bind(this)  

this.incrementBreak = this.incrementBreak.bind(this)
this.decrementBreak = this.decrementBreak.bind(this)

this.incrementSession = this.incrementSession.bind(this)
this.decrementSession = this.decrementSession.bind(this)

this.reset = this.reset.bind(this)

}

tick(){ if((this.state.count===0)&&(this.state.currentPeriodSession))
  {document.getElementById('beep').play()
  this.setState({
    count:((this.state.breakMin)*60)+1,
    currentPeriodSession:false
  })}
 
  if((this.state.count===0)&&(!this.state.currentPeriodSession))
  {document.getElementById('beep').play()
  this.setState({
    count:((this.state.sessionMin)*60)+1,
    currentPeriodSession:true
  })
  

}
  this.setState({
    
    count:this.state.count-1
  })

}


onClickButtonStart (){
 
  if (this.state.sessionPaused &this.state.newSession) {
 this.timer=setInterval(this.tick, this.state.interval)
 
 
  
  this.setState({
    sessionPaused:false,
    newSession:false,
    currentPeriod:"Session",
    currentPeriodSession:true,
    count:(this.state.sessionMin*60)
  })}

  else if (this.state.sessionPaused & !this.state.newSession){
    this.timer=setInterval(this.tick, this.state.interval)
    
    this.setState({
      btnLabelStart: false,
      sessionPaused:false,
      currentPeriodSession:true,
      
    })
  }

 

 }  
  



onClickButtonPause (){
  
  clearInterval(this.timer)
  this.setState({
    newSession:false,
    
    
    sessionPaused:true,
    count:this.state.count});

}
reset(){
  clearInterval(this.timer)
  document.getElementById('beep').pause();
  document.getElementById('beep').currentTime = 0

  this.setState(state=>({
    btnLabelStart: true,
    count:0,
    currentPeriod:"Session",
    breakMin : 5,
    sessionMin : 25,
    newSession:true,
    sessionPaused:true,
    currentPeriodSession:true
  }))
  }

incrementBreak(){
  if (this.state.breakMin<60)
this.setState(state=>({
  breakMin : state.breakMin+1}))
}
decrementBreak(){
  if (this.state.breakMin>1)
this.setState(state=>({
  breakMin : state.breakMin-1}))
}

incrementSession(){
  if (this.state.sessionMin<60)
this.setState(state=>({
  sessionMin : state.sessionMin+1}))
}
decrementSession(){
  if (this.state.sessionMin>1)
this.setState(state=>({
  sessionMin : state.sessionMin-1}))
}





  
  

  
  render() {
   
 
  const session= this.state.currentPeriodSession
  const currentlyPaused = this.state.sessionPaused;
  const newSession=this.state.newSession
    let button;
let display;
    if (newSession){display = <div id="time-left">{FancyTimeFormat(this.state.sessionMin*60)}</div>}
    else{display = <div id="time-left">{FancyTimeFormat(this.state.count)}</div>}

  if (!currentlyPaused){button = < Pause onClick={this.onClickButtonPause} />; }
  else 
{button = <Play onClick={this.onClickButtonStart}  />;}

if(this.state.newSession){button = <Play onClick={this.onClickButtonStart}  />;}
let timerLabel;
if (session){timerLabel = <p id="timer-label">Session</p>}
    else{timerLabel = <p id="timer-label">Break</p>}

    return(
         
      
  
  <div className="App">
    
    
      <div className="settings">
        <div className="Break Tab">
          <button className='inc' id="break-increment" onClick={this.incrementBreak}>+</button>
          <button className='dec' id="break-decrement" onClick={this.decrementBreak}>-</button>
          <div id="break-label">Break Length:
          <h1 id="break-length">{this.state.breakMin }</h1>
          </div>
        </div>

        <div className="Session Tab">
          <button className='inc' id="session-increment"  onClick={this.incrementSession}>+</button>
          <button className='dec' id="session-decrement" onClick={this.decrementSession}>-</button>
          
          <div id="session-label">Session Length:
          <h1 id="session-length">{this.state.sessionMin}</h1>
          </div>
        </div>
      </div>
      
      {display} 
      {timerLabel}
      {button}          
    <div id="reset" onClick={this.reset}>Reset</div>
    <audio src="/audio/Break2.mp3" id="beep"></audio>    
<ReactFCCtest />    
</div>)
    
  }

};
function FancyTimeFormat(seconds){
  function str_pad_left(string,pad,length){   
    return (
    new Array(length+1).join(pad)+string).slice(-length);     
   }
        
      
      // Hours, minutes and seconds
   var mins = ~~(seconds/60);
   var secs = ~~seconds % 60;
   var finalTime = str_pad_left(mins,'0',2)+':'+str_pad_left(secs,'0',2);
      // Output like "1:01" or "4:03:59" or "123:03:59"
      console.log(finalTime)
   return finalTime;
  }


  
    
    
    
    
    

  
   

  


export default App;
