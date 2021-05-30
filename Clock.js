import React  from 'react';

function FormatSecToMINSEC(props) {
  let sec=  props.sec
   return(sec-(9<(sec%=60)?"":"0"))/60+(9<sec?':':':0')+sec}

class Clock extends React.Component {
  constructor(props){
    super(props);
      this.state={
        btnLabelStart:true,
        date:new Date(),
        count :this.props.session
    
    };
      
      
    }

      
    
      componentDidMount(){
        
      this.timerID = setInterval(
      ()=> this.tick(),
      1000
      );
    }
      componentWillUnmount(){
      clearInterval(this.timerID);
    }
      tick(){
      this.setState({
        date:new Date(),
        count:this.state.count-1
      })
    }
  
    render(){
     
     
      return (
      <div>
        {this.state.date.toLocaleTimeString()} <br />

        
        <FormatSecToMINSEC sec={this.state.count}/>
       
      </div>  
      );
    }
  }
  export default Clock;
  
