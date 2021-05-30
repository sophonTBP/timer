import logo from './logo.svg';
import './App.css';
import React  from 'react';

import ReactFCCtest from 'react-fcctest';

function FormatSecToMINSEC(props) {
  let sec=  props.sec
  let min = (sec%=60)
  min=min.pad(2,0)
   return(sec-(min))/60+(9<sec?':':':0')+sec}
   
   
    function FancyTimeFormat(seconds){
   function str_pad_left(string,pad,length){   

     return (
     new Array(length+1).join(pad)+string).slice(-length);
     
        }
   
   
   
  
   
    let duration= seconds  
       // Hours, minutes and seconds
       
       var mins = ~~((duration % 3600) / 60);
       var secs = ~~duration % 60;
   var finalTime = str_pad_left(mins,'0',2)+':'+str_pad_left(secs,'0',2);
       // Output like "1:01" or "4:03:59" or "123:03:59"
       
   
       
       return finalTime;
   }







 class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPeriod:"Session",
      
      btnLabelStart:true,
      sessionRestarted:true,
      breakMin:5,
      
      sessionMin:25,
      
      count:1500,
     
    };
      
     
  
this.onClickButtonStart = this.onClickButtonStart.bind(this)
this.onClickButtonRestart = this.onClickButtonRestart.bind(this)

this.onClickButtonPause = this.onClickButtonPause.bind(this)  

this.incrementBreak = this.incrementBreak.bind(this)
this.decrementBreak = this.decrementBreak.bind(this)

this.incrementSession = this.incrementSession.bind(this)
this.decrementSession = this.decrementSession.bind(this)

this.reset = this.reset.bind(this)

}


 
 

onClickButtonStart (){
  
  
  
  
  this.setState({
    btnLabelStart: false,
    sessionRestarted:false,
    currentPeriod:"Session",
    count:(this.state.sessionMin*60)
  })
  this.timer = setInterval(() => this.setState({
    
    count: this.state.count -1
  }), 1000)
  if((this.state.currentPeriod==="Session")&(this.state.count===0)){
    this.setState({
      count:(this.state.breakMin*60),
      currentPeriod:"Break"
    })
 
  }
}

onClickButtonRestart (){
  this.setState({
    btnLabelStart: false,
    sessionRestarted:true,
    count:this.state.count
  })
  this.timer = setInterval(() => this.setState({
    
    count: this.state.count -1
  }), 1000)
  if((this.state.currentPeriod==="Session")&(this.state.count===0)){
    this.setState({
      count:(this.state.breakMin*60),
      currentPeriod:"Break"
    })
 
  }
}

onClickButtonPause (){
  
  clearInterval(this.timer)
  this.setState({
    btnLabelStart: true,
    sessionRestarted:false,
    count:this.state.count});

}
reset(){
  clearInterval(this.timer)
  document.getElementById('beep').pause();
  document.getElementById('beep').currentTime = 0

  this.setState(state=>({
    btnLabelStart: true,
    sessionRestarted:true,
    currentPeriod:"Session",
    breakMin : 5,
    sessionMin : 25,
    count:1500
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




  
  

  // Change code above this line
  render() {
  
  const time=FancyTimeFormat(this.state.count)
  const buttonStart = <div id="start_stop" onClick={this.onClickButtonStart}>Start</div>;
  const buttonRestart = <div id="start_stop" onClick={this.onClickButtonRestart}>Start</div>
  const buttonStop = <div id="start_stop" onClick={this.onClickButtonPause}>Pause</div>;
  
  let label= this.state.btnLabelStart;
  let status= this.state.sessionRestarted;
  
  if((this.state.currentPeriod==="Session")&(this.state.count===0)){
    
    
    document.getElementById('beep').play()
    this.setState({
      count:(this.state.breakMin*60),
      currentPeriod:"Break"
    })
    
   
  
 
  }
  if((this.state.currentPeriod==="Break")&(this.state.count===0)){
    
    
    document.getElementById('beep').play()
    this.setState({
      count:(this.state.SessionMin*60),
      currentPeriod:"Session"
    })
    
   
 
  }
  
  

function Buttons () {     
    if((label)&&(status)) {
    return buttonStart} else {if(label){return buttonRestart}else {return buttonStop
   } }
  } 

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
    
    <div className="display">
      <p id="timer-label">{this.state.currentPeriod}</p>       
       <p id="time-left">{time}</p>
       
      <audio src="/audio/Break2.mp3" id="beep"></audio> 
           
    </div>  <Buttons/>  <div id="reset" onClick={this.reset}>Reset</div>   
<ReactFCCtest />    
</div>)
    
  }

};







export default App;
