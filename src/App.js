import React, { Component } from 'react';
import Slider from 'rc-slider';

import { Http } from './libs/http.js';
import { sliders } from './libs/sliders.js';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControl, FormControlLabel } from 'material-ui/Form';

const styles = theme => ({
  root: {
    height: `50 px`
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class App extends Component {

  /**
  * On load
  */
  constructor (props, context) {
    super(props, context);

    this.state = {
      reading: 0,
      ledState: "1",
      ledMode: "1",
    };

    this.state.colours  = {};
    this.state.colours.white = 0;
    this.state.colours.yellow = 0;
    this.state.colours.red = 0;
    this.state.colours.green = 0;
    this.state.colours.blue = 0;

    document.body.style.backgroundColor = "#63ccff";

    this.container = {};
  }

  componentDidMount = () => {
    document.title = "RGB CCT Controller";

    const sliderz = new sliders();
    sliderz.setState(this);

    this.container.sliders = sliderz;

    const network = new Http();
    network.setCallback('updateSlidersGroup', sliderz);

    this.container.network = network;

    network.setState(this);

    let data = {
      "state": "3"
    };
    network.performRequest(data);

    //this.interval = setInterval(this.updateController, 25000);
  }

  onAfterSliderChange = (value) => {
    this.container.network.getStateAndPerformRequest();
  }

  handleChangeLedState = event => {
    console.log(event.target.value);
    this.setState({ ledState: event.target.value });
    this.state.ledState = event.target.value;
    console.log(this.state);

    this.container.network.getStateAndPerformRequest();
  };

  handleChangeLedMode = event => {
    this.setState({ ledMode: event.target.value });
    this.state.ledMode = event.target.value;
    console.log(this.state);

    this.container.network.getStateAndPerformRequest();
  };


  render () {
    // let that = this;
    // setTimeout(function(){that.updateController()}, 5);

    const { classes } = this.props;

    return (
      <div>
        <div>
          <FormControl component="fieldset" required className={classes.formControl}>
            <RadioGroup style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
              aria-label="ledState"
              name="ledState"
              value={this.state.ledState}
              onChange={this.handleChangeLedState}
            >
              <FormControlLabel value="0" control={<Radio color="primary" />}  label="OFF"/>
              <FormControlLabel value="1" control={<Radio color="primary" />} label="ON" />

            </RadioGroup>
          </FormControl>
        </div>


        <div>
          <FormControl component="fieldset" required className={classes.formControl}>
            <RadioGroup style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
              aria-label="ledMode"
              name="ledMode"
              value={this.state.ledMode}
              onChange={this.handleChangeLedMode}
            >

              <FormControlLabel value="0" control={<Radio color="primary" />}  label="AUTO"/>
              <FormControlLabel value="1" control={<Radio color="primary" />} label="MANUAL" />
              <FormControlLabel value="2" control={<Radio color="primary" />} label="TIMED" />
              <FormControlLabel value="3" control={<Radio color="primary" />} label="SHOW" />

            </RadioGroup>
          </FormControl>
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

                onAfterChange={this.onAfterSliderChange}
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

                onAfterChange={this.onAfterSliderChange}
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

                onAfterChange={this.onAfterSliderChange}
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

                onAfterChange={this.onAfterSliderChange}
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

                  onAfterChange={this.onAfterSliderChange}
               />
           </div>
           <div style={{clear: 'both'}}></div>
        </div>

      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (App)
