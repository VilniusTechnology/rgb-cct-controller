import React, { Component } from 'react'
import axios from 'axios'
import Slider from 'rc-slider';
import $ from "jquery";

import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ToggleButtonGroup } from 'react-bootstrap';
import { ToggleButton } from 'react-bootstrap';

import { network } from './libs/http.js';
import { sliders } from './libs/sliders.js';

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
      reading: 0,
      ledState: 0,
      ledMode: 2,
    }

    this.state.getDataOnly = 1;

    this.state.colours  = {};
    this.state.colours.white = 255;
    this.state.colours.yellow = 255;
    this.state.colours.red = 255;
    this.state.colours.green = 255;
    this.state.colours.blue = 255;

    document.body.style.backgroundColor = "#63ccff";

    console.log('State INIT: ', this.state);

  }

  componentDidMount = () => {
    document.title = "RGB CCT Controller";
    this.updateControllerInit();
    this.updateSlidersState();
    // this.interval = setInterval(this.updateController, 25000);
  }

  updateColoursReadingsAndSliders = (data) => {
    // console.log(data);
    this.setState(
      {
        reading: data.reading,

        colours: {
          white: data.coldWhite,
          yellow: data.warmWhite,
          red: data.red,
          green: data.green,
          blue: data.blue,
        },

        ledState: data.ledState,
        ledMode: data.ledMode,
      }
    );

    this.whiteSlider.state.value = data.coldWhite;
    this.yellowSlider.state.value = data.warmWhite;

    this.redSlider.state.value = data.red;
    this.greenSlider.state.value = data.green;
    this.blueSlider.state.value = data.blue;
  }

  getAllData() {
    let values = {
      "1": 1,
      "2": 1,
      "3": this.whiteSlider.state.value,
      "4": this.yellowSlider.state.value,
      "5": this.redSlider.state.value,
      "6": this.greenSlider.state.value,
      "7": this.blueSlider.state.value,
    };

    console.log('Values to send: ', values);

    console.log('State getAllData: ', this);

    return values;
  }

  parseData(data) {
    console.log("data from server", data.data);
    this.setState(
      {
        reading: data.data.reading,
        ledState: data.data.ledState,
        ledMode: data.data.ledMode,
      }
    );

    this.updateColoursReadingsAndSliders(data.data);

    this.ledState = data.data.ledState;
    this.ledMode = data.data.ledMode;

    console.log('State parseData: ', this.state);
  }



  updateController = () => {
    this.state.getDataOnly = 0;
    let data = this.getAllData();
    this.performRequest(data);
  }

  updateControllerInit = () => {
    let data = {
      "1": "3"
    };
    this.performRequest(data);
  }

  updateSlidersState = () => {

    let freshColours = {};
    freshColours.white = this.whiteSlider.state.value;
    freshColours.yellow = this.yellowSlider.state.value;

    freshColours.red = this.redSlider.state.value;
    freshColours.green = this.greenSlider.state.value;
    freshColours.blue = this.blueSlider.state.value;

    this.setState({colours: freshColours});
  }

  onAfterChange = (value) => {
    this.updateController();
    this.updateSlidersState();
  }

  handleLedStateChange = (value) => {
    // this.state.ledState = value;

    this.setState(
      {
        ledState: value,
      }
    );

    this.updateController();
    // console.log(this.state);
  }

  handleLedModeChange = (value) => {
    // this.state.ledMode = value;

    this.setState(
      {
        ledMode: value,
      }
    );

    this.updateController();
    // console.log(this.state);
  }

  performRequest = (data) => {
      let getString = this.dataToString(data);
      // console.log(getString);

      var url = 'http://192.168.1.46/?&';
      // var url = 'http://127.0.0.1/?&';

      axios.get(url + getString + '|')
        .then(response => this.parseData(response))
  }

  dataToString = (data) => {
      // console.log(data);
      return this.join(data, "=", "&");
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
      // setTimeout(function(){that.updateController()}, 5);

    return (
      <div>
        <div>
          <ButtonToolbar>
            <ToggleButtonGroup type="radio" name="ledState"

              ref={(input) => { this.ledState = input; }}

              defaultValue={0}
              onChange={this.handleLedStateChange}>
                <ToggleButton value={1}>ON</ToggleButton>
                <ToggleButton value={0}>OFF</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </div>

        <div>
          <ButtonToolbar>
            <ToggleButtonGroup type="radio" name="ledMode"

            ref={(input) => { this.ledMode = input; }}

            defaultValue={2} onChange={this.handleLedModeChange}>
              <ToggleButton value={0}>ADAPTIVE</ToggleButton>
              <ToggleButton value={2}>MANUAL</ToggleButton>
              <ToggleButton value={3}>DEMO</ToggleButton>
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
          <div className="left-div left-div-white">{this.state.colours.white}</div>
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
          <div className="left-div left-div-yellow">{this.state.colours.yellow}</div>
          <div className="right-div">
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
           </div>
           <div style={{clear: 'both'}}></div>
        </div>

        <div>
          <div className="left-div left-div-red">{this.state.colours.red}</div>
          <div className="right-div">
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
           </div>
           <div style={{clear: 'both'}}></div>
        </div>


        <div>
          <div className="left-div left-div-green">{this.state.colours.green}</div>
          <div className="right-div">
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
           </div>
           <div style={{clear: 'both'}}></div>
        </div>

        <div>
          <div className="left-div left-div-blue">{this.state.colours.blue}</div>
          <div className="right-div">
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
           <div style={{clear: 'both'}}></div>
        </div>

      </div>
    )
  }
}


export default App
