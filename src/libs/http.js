import axios from 'axios';
import $ from "jquery";

export const Http = class Http {

  performRequest = (data) => {
      let getString = this.dataToString(data);

      var url = 'http://192.168.1.46/?&';

      axios.get(url + getString + '|')
        .then(response => this.performCallback(response))
  }

  performCallback = (response) => {
      // console.log('Will callback');
      this.callback[this.callbackName](response.data);
  }

  dataToString = (data) => {
      // console.log(data);
      return this.join(data, "=", "&");
  }

  join = (object, glue, separator) => {
    // var object = object;
    if (glue === undefined) {
      glue = '=';
    }
    if (separator === undefined) {
      separator = ',';
    }
    return $.map(Object.getOwnPropertyNames(object), function(k) { return [k, object[k]].join(glue) }).join(separator);
  }

  getAllData = () => {

    console.log(this.scope);

    let values = {
      "1": this.scope.state.ledState,
      "2": this.scope.state.ledMode,
      "3": this.scope.whiteSlider.state.value,
      "4": this.scope.yellowSlider.state.value,
      "5": this.scope.redSlider.state.value,
      "6": this.scope.greenSlider.state.value,
      "7": this.scope.blueSlider.state.value,
    };

    return values;
  }

  getStateAndPerformRequest = () => {
      console.log(this.getAllData());
      this.performRequest(this.getAllData());
  }

  setCallback = (name, callback) => {
    this.callbackName = name;
    this.callback = callback;
  }

  setState = (state) => {
    this.scope = state;
  }

}
