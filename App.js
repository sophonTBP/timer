import logo from './logo.svg';
import './App.css';
import React  from 'react';
import Clock  from './Clock.js'
import ReactFCCtest from 'react-fcctest';








  


 class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date:new Date(),
      currentPeriod:"Please Select your Session and Break legnths",
      btnLabelStart:true,
      breakMin:5,
      sessionMin:25,
      count:0,
      
    };
      
     
      this.incrementBreak = this.incrementBreak.bind(this)
      this.decrementBreak = this.decrementBreak.bind(this)

      this.incrementSession = this.incrementSession.bind(this)
      this.decrementSession = this.decrementSession.bind(this)

      this.onClickButtonStart = this.onClickButtonStart.bind(this)
      this.onClickButtonPause = this.onClickButtonPause.bind(this) 
      this.reset = this.reset.bind(this)


}




onClickButtonStart (){
  this.setState({
  btnLabelStart: !this.state.btnLabelStart,
  count:this.props.session
  });
}




  onClickButtonPause (){
  this.setState({btnLabelStart: !this.state.btnLabelStart});

}
  reset(){
  this.setState(state=>({
    breakMin : 5,
    sessionMin : 25,
    count:0
  }))
  }






incrementBreak(){
this.setState(state=>({
  breakMin : state.breakMin+1}))
}
decrementBreak(){
this.setState(state=>({
  breakMin : state.breakMin-1}))
}

incrementSession(){
this.setState(state=>({
  sessionMin : state.sessionMin+1}))
}
decrementSession(){
this.setState(state=>({
  sessionMin : state.sessionMin-1}))
}




  
  

  // Change code above this line
  render() {
    
    const buttonStart = <button id="start_stop" onClick={this.onClickButtonStart}>Start</button>;
    const buttonStop = <button id="start_stop" onClick={this.onClickButtonPause}>Pause</button>;
    const sessionL = (this.state.sessionMin)*60;
    const breakL = (this.state.breakMin)*60;
    const count = this.state.count
    return(
         
  
  
  <div className="App">
    <ReactFCCtest />
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <p>
          Prodomo Timer
        </p>
      
      <div className="settings">
        <div className="Break Tab">
          <button className='inc' id="break-increment" onClick={this.incrementBreak}>+</button>
          <button className='dec' id="break-decrement" onClick={this.decrementBreak}>-</button>
          
          <div id="break-label">Break Length:
            <h1 id="break-length">{this.state.breakMin && Math.max(0, this.state.breakMin)&& Math.min(this.state.breakMin, 60)}</h1>
          </div>
        </div>

        <div className="Session Tab">
          <button className='inc' id="session-increment"  onClick={this.incrementSession}>+</button>
          <button className='dec' id="session-decrement" onClick={this.decrementSession}>-</button>
          
          <div id="session-label">Session Length:
            <h1 id="session-length"> {this.state.sessionMin && Math.max(0, this.state.sessionMin) && Math.min(this.state.sessionMin, 60)}</h1>
          </div>
        </div>

        
      </div>

    </header>
    <div id="timer-label">{this.state.currentPeriod}</div>
    
    <div className="display">
       {(this.state.btnLabelStart) ? buttonStart : buttonStop}      
        <button id="reset" onClick={this.reset}>Reset</button>   
            
      {(!this.state.btnLabelStart) &&
        <Clock session={sessionL} break={breakL} count={count}/>}
      
      
     
    </div>     
</div>)
    
  }

};







export default App;
