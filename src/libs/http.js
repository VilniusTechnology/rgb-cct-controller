import axios from 'axios';
import $ from "jquery";

export const Http = class Http {

  performRequest = (data) => {
      let getString = this.dataToString(data);

      let url = 'http://192.168.1.47:8080/?';

      axios.get(url + getString)
        .then(response => this.performCallback(response))
  };

  performCallback = (response) => {
      // console.log('Will callback');
      this.callback[this.callbackName](response.data);
  };

  dataToString = (data) => {
      // console.log(data);
      return this.join(data, "=", "&");
  };

  join = (object, glue, separator) => {
    // var object = object;
    if (glue === undefined) {
      glue = '=';
    }
    if (separator === undefined) {
      separator = ',';
    }
    return $.map(Object.getOwnPropertyNames(object), function(k) { return [k, object[k]].join(glue) }).join(separator);
  };

  getAllData = () => {

    let values = {
      "state": this.scope.state.ledState,
      "mode": this.scope.state.ledMode,
      "coldWhite": this.scope.whiteSlider.state.value,
      "warmWhite": this.scope.yellowSlider.state.value,
      "red": this.scope.redSlider.state.value,
      "green": this.scope.greenSlider.state.value,
      "blue": this.scope.blueSlider.state.value,
    };

    return values;
  };

  getStateAndPerformRequest = () => {
      console.log(this.getAllData());
      this.performRequest(this.getAllData());
  };

  setCallback = (name, callback) => {
    this.callbackName = name;
    this.callback = callback;
  };

  setState = (state) => {
    this.scope = state;
  }

}
