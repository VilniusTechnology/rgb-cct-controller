
export const sliders = class Sliders {

  setSliderAndLabelValue(sliderId, data) {
    this.setSliderLabelValue(sliderId);
    this.setSliderValue(sliderId, data);
  };

  updateSlidersGroup(data) {
    console.log('Response DATA: ', data);

    this.scope.whiteSlider.state.value = data.coldWhite.value;
    this.scope.yellowSlider.state.value = data.warmWhite.value;

    this.scope.redSlider.state.value = data.red.value;
    this.scope.greenSlider.state.value = data.green.value;
    this.scope.blueSlider.state.value = data.blue.value;

    let newColours = {
        white: parseInt(data.coldWhite.value, 0),
        yellow: parseInt(data.warmWhite.value, 0),
        red: parseInt(data.red.value, 0),
        green: parseInt(data.green.value, 0),
        blue: parseInt(data.blue.value, 0),
    };

    this.scope.setState({colours: newColours});
    this.scope.setState({reading: data.light_lvl});
  };

  updateButtons = (data) => {
    this.scope.setState({ledState: String(data.state)});
    this.scope.setState({ledMode: String(data.mode)});
  };

  setState = (state) => {
    this.scope = state;
  }
};
