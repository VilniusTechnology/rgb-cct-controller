import React, { Component } from 'react'
import './App.css'
import './index.css'

import axios from 'axios'
import { SketchPicker } from 'react-color';

import ReactDOM from 'react-dom';
import Slider, { Range } from 'rc-slider';


import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';



const handle = {
  position: "absolute",
  transform: 'translate(-50%, -50%)',
  width: "14px",
  height: "14px",
  cursor: "pointer",
  borderRadius: "50%",
  border: "solid 2px #000",
  backgroundColor: "#fff"
};


class App extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      reading: ''
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    axios.get('http://192.168.1.46/?&PAR01=100&PAR02=200|')
      .then(response => this.parseData(response))
  }


  parseData(data) {
    console.log(data.data);
    this.setState({temperature: data.data.reading})
    this.setState({PARAM01: data.data.PARAM01})
    this.setState({PARAM02: data.data.PARAM02})

  }

  handleChangeComplete() {

  }

  getAllData() {

  }

  dataToString() {

  }

  onAfterChange = (value) => {
    console.log(value); //eslint-disable-line
  }

  render () {
    return (
      <div>
        <div class="light-level-reading-container">
          {this.state.reading} 0
        </div>
        <div class="mode-container">
          <div class="mode-reading-container">MODE</div>
        </div>


        <div>
          <Slider 

              defaultValue={50} 
              min={0} 
              max={255}

              handleStyle={{
                        borderColor: 'blue',
                        height: 28,
                        width: 28,
                        marginLeft: -14,
                        marginTop: -9,
                        backgroundColor: 'black',
                      }}
              railStyle={{ backgroundColor: 'white', height: 10 }}
              trackStyle={{ backgroundColor: 'white', height: 10 }}

              onAfterChange={this.onAfterChange}
           />
           <br/><br/>
           <div></div>
        </div>

        <div>
          <Slider 

              defaultValue={50} 
              min={0} 
              max={255}

              handleStyle={{
                        borderColor: 'blue',
                        height: 28,
                        width: 28,
                        marginLeft: -14,
                        marginTop: -9,
                        backgroundColor: 'black',
                      }}
              railStyle={{ backgroundColor: 'yellow', height: 10 }}
              trackStyle={{ backgroundColor: 'yellow', height: 10 }}

              onAfterChange={this.onAfterChange}
           />
           <br/><br/>
           <div></div>
        </div>

        <div>
          <Slider 

              defaultValue={50} 
              min={0} 
              max={255}

              handleStyle={{
                        borderColor: 'blue',
                        height: 28,
                        width: 28,
                        marginLeft: -14,
                        marginTop: -9,
                        backgroundColor: 'black',
                      }}
              railStyle={{ backgroundColor: 'red', height: 10 }}
              trackStyle={{ backgroundColor: 'red', height: 10 }}

              onAfterChange={this.onAfterChange}
           />
           <br/><br/>
           <div></div>
        </div>
        
        

        <div>
          <Slider 

              defaultValue={50} 
              min={0} 
              max={255}

              handleStyle={{
                        borderColor: 'blue',
                        height: 28,
                        width: 28,
                        marginLeft: -14,
                        marginTop: -9,
                        backgroundColor: 'black',
                      }}
              railStyle={{ backgroundColor: 'green', height: 10 }}
              trackStyle={{ backgroundColor: 'green', height: 10 }}

              onAfterChange={this.onAfterChange}
           />
           <br/><br/>
           <div></div>
        </div>
        
        

      <div>
        <Slider 

              defaultValue={50} 
              min={0} 
              max={255}

              handleStyle={{
                        borderColor: 'blue',
                        height: 28,
                        width: 28,
                        marginLeft: -14,
                        marginTop: -9,
                        backgroundColor: 'black',
                      }}
              railStyle={{ backgroundColor: 'blue', height: 10 }}
              trackStyle={{ backgroundColor: 'blue', height: 10 }}

              onAfterChange={this.onAfterChange}
           />

        </div>

        

        <div className='button__container'>
          <p>P1: {this.state.PARAM01}</p>
          <p>P2: {this.state.PARAM02}</p>
        </div>
      </div>
    )
  }
}





export default App
