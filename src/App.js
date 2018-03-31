import React, { Component } from 'react'
import axios from 'axios'
import Slider from 'rc-slider';
import $ from "jquery";

import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ToggleButtonGroup } from 'react-bootstrap';
import { ToggleButton } from 'react-bootstrap';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import './index.css'

class App extends Component {

  /**
  * On load
  */
  constructor (props, context) {
    super(props, context);

    this.state = {
      reading: 0
    }

    this.state.colours = {};
    this.state.colours.white = 210;
    this.state.colours.yellow = 220;
    this.state.colours.red = 230;
    this.state.colours.green = 240;
    this.state.colours.blue = 250;

    this.state.mode = "ADAPTIVE";

    document.body.style.backgroundColor = "#63ccff";
  }

  componentDidMount = () => {
    // this.interval = setInterval(this.updateController, 10000);
  }

  parseData(data) {
    console.log(data.data);
    this.setState({reading: data.data.reading})
    this.setState({PARAM01: data.data.PARAM01})
    this.setState({PARAM02: data.data.PARAM02})
  }

  updateController = () => {
    let data = this.getAllData();
    this.performRequest(data);
  }

  updateSlidersState = () => {

  //   this.setState(
  //     {
  //       colours: {
  //         white: this.whiteSlider.state.value,
  //         yellow: this.yellowSlider.state.value,
  //         red: this.redSlider.state.value,
  //         green: this.greenSlider.state.value,
  //         blue: this.blueSlider.state.value,
  //       }
  //     }
  //   )
  }

  onAfterChange = (value) => {
    this.updateController();
  }

  performRequest = (data) => {
      let getString = this.dataToString(data);
      console.log(getString);

      axios.get('http://192.168.1.46/?&' + getString + '|')
        .then(response => this.parseData(response))
  }

  dataToString = (data) => {
      console.log(data);
      return this.join(data, "=", "&");
  }

  getAllData() {
    let values = {
      "PARAM01": 1,
      "PARAM02": 2,
      "PARAM03": this.whiteSlider.state.value,
      // "PARAM04": this.yellowSlider.state.value,
      // "PARAM05": this.redSlider.state.value,
      // "PARAM06": this.greenSlider.state.value,
      // "PARAM07": this.blueSlider.state.value,
    };

    return values;
  }

  join = (object, glue, separator) => {
    var object = object;

    if (glue == undefined) {
      glue = '=';
    }

    if (separator == undefined) {
      separator = ',';
    }

    return $.map(Object.getOwnPropertyNames(object), function(k) { return [k, object[k]].join(glue) }).join(separator);
  }

  render () {

      let that = this;
      setTimeout(function(){that.updateController()}, 5);

    return (
      <div>
        <div>
          <ButtonToolbar>
            <ToggleButtonGroup type="radio" name="state" defaultValue={1}>
              <ToggleButton value={1}>ON</ToggleButton>
              <ToggleButton value={2}>OFF</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </div>

        <div>
          <ButtonToolbar>
            <ToggleButtonGroup type="radio" name="mode" defaultValue={1}>
              <ToggleButton value={1}>ADAPTIVE</ToggleButton>
              <ToggleButton value={2}>MANUAL</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </div>

        <div className="light-level-reading-container">
          {this.state.reading}
        </div>
        <div className="mode-container">
          <div className="mode-reading-container">{this.state.mode}</div>
        </div>


        <div>
          <div className="left-div">{this.state.colours.white}</div>
          <div className="right-div">
            <Slider
                ref={(input) => { this.whiteSlider = input; }}

                defaultValue={this.state.colours.white}

                onAfterChange={this.onAfterChange}
                min={0}
                max={255}

                handleStyle={{
                          borderColor: 'black',
                          height: 28,
                          width: 28,
                          marginLeft: -14,
                          marginTop: -9,
                          backgroundColor: 'white',
                        }}
                railStyle={{ backgroundColor: 'white', height: 10 }}
                trackStyle={{ backgroundColor: 'white', height: 10 }}
             />
           </div>
           <div style={{clear: 'both'}}></div>
        </div>

        <div>
          <Slider
              ref={(input) => { this.yellowSlider = input; }}

              defaultValue={this.state.colours.yellow}
              min={0}
              max={255}

              handleStyle={{
                        borderColor: 'black',
                        height: 28,
                        width: 28,
                        marginLeft: -14,
                        marginTop: -9,
                        backgroundColor: 'yellow',
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
              ref={(input) => { this.redSlider = input; }}

              defaultValue={this.state.colours.red}
              min={0}
              max={255}

              handleStyle={{
                        borderColor: 'black',
                        height: 28,
                        width: 28,
                        marginLeft: -14,
                        marginTop: -9,
                        backgroundColor: 'red',
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
              ref={(input) => { this.greenSlider = input; }}

              defaultValue={this.state.colours.green}
              min={0}
              max={255}

              handleStyle={{
                        borderColor: 'black',
                        height: 28,
                        width: 28,
                        marginLeft: -14,
                        marginTop: -9,
                        backgroundColor: 'green',
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
              ref={(input) => { this.blueSlider = input; }}

              defaultValue={this.state.colours.blue}
              min={0}
              max={255}

              handleStyle={{
                        borderColor: 'black',
                        height: 28,
                        width: 28,
                        marginLeft: -14,
                        marginTop: -9,
                        backgroundColor: 'blue',
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
