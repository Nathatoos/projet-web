import React, { Component } from 'react';


class View  extends Component {
     constructor(props) {
        super(props);
      //  this.state = { date: this.props.date }
    }
    
    render(){
      
        return (
        <div>
            {this.props.time}
            
            </div>
            
        );
    }
    
}

class View_production extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            
            buffer : [] 
            
            
        }
    }
    
    
    render(){
        
        return (
       
           <div> 
            {alert("fzf")}
            bonjour teste bordel de perd
            {this.state.buffer = this.props.prod[0].type}
            {this.state.buffer}
            
            </div>
        
        );
        
        
    }
    
}


export default View ;