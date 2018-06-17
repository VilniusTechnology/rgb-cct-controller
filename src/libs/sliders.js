
export const sliders = class Sliders {

  setSliderAndLabelValue(sliderId, data) {
    this.setSliderLabelValue(sliderId);
    this.setSliderValue(sliderId, data);
  }

  updateSlidersGroup(data) {
    console.log(this.scope);

    this.scope.whiteSlider.state.value = data.coldWhite;
    this.scope.yellowSlider.state.value = data.warmWhite;

    this.scope.redSlider.state.value = data.red;
    this.scope.greenSlider.state.value = data.green;
    this.scope.blueSlider.state.value = data.blue;

    let newColours = {
        white: parseInt(data.coldWhite, 0),
        yellow: parseInt(data.warmWhite, 0),
        red: parseInt(data.red, 0),
        green: parseInt(data.green, 0),
        blue: parseInt(data.blue, 0),
    }

    this.scope.setState({colours: newColours});
  }

  updateButtons = (data) => {
    this.scope.setState({ledState: String(data.state)});
    this.scope.setState({ledMode: String(data.mode)});
  }

  setState = (state) => {
    this.scope = state;
  }
}
