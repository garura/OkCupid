var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SignInActions = require('../actions/sign_in_actions');


var orientations = {
  "Straight": true,
  "Gay": true,
  "Lesbian": true,
  "Bisexual": true,
  "Asexual": true,
  "Pansexual": true,
  "Questioning": true
};

var genders = {
  "Woman": true,
  "Man": true,
  "Gender Nonconforming": true,
  "Trans Woman": true,
  "Trans Man": true,
  "Other": true
}


var SignInQuality = React.createClass({
  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      "Straight": true,
      "Gay": false,
      "Lesbian": false,
      "Bisexual": false,
      "Asexual": false,
      "Pansexual": false,
      "Questioning": false,
      "Woman": true,
      "Man": false,
      "Gender Nonconforming": false,
      "Trans Woman": false,
      "Trans Man": false,
      "Other": false
    };
  },

  handleClicked: function(event) {
    event.preventDefault();
    key = event.target.value;
    value = !(this.state[key]);
    this.setState({[key]: value});
  },

  sendQualities: function() {
    var qualities = [ [], [] ];
    var that = this;
    Object.keys(this.state).forEach(function(key) {
      if (orientations[key] && that.state[key]) {
        qualities[0].push(key);
      }
      else if (genders[key] && that.state[key]) {
        qualities[1].push(key);
      }
    });
    if (qualities[0][0] && qualities[1][0]) { // at least one option selected for each
      SignInActions.sendQualities(qualities);
      this.context.router.replace("user/new");
    }
    else if (qualities[0][0]) {
      this.setState({errors: "Please select at least one gender."});
    }
    else if (qualities[1][0]) {
      this.setState({errors: "Please select at least one orientation."});
    }
    else {
      this.setState({errors: "Please select at least one orientation and gender."})
    }

  },

  render: function() {
    var that = this;

    var orientationButtons = Object.keys(that.state).map(function(key, index) {
      if (orientations[key]) {
        return (
          <button type="button"
                  key={index}
                  className={"button_" + that.state[key]}
                  onClick={that.handleClicked}
                  value={key}>{key}
          </button>
        );
      }
    });

    var genderButtons = Object.keys(that.state).map(function(key, index) {
      if (genders[key]) {
        return (
          <button type="button"
                  key={index}
                  className={"button_" + that.state[key]}
                  onClick={that.handleClicked}
                  value={key}>{key}
          </button>
        );
      }
    });

    var errors = this.state.errors;

    return(
      <div>
        <h3>Join the best dating site for Chris on Earth.</h3>
        <br></br>
        <h5>{errors}</h5>
        <p>I am a </p>
        {orientationButtons}
        <br></br>
        {genderButtons}
        <br></br>
        <button type="button"
                id="signUp_qualities_confirm"
                onClick={this.sendQualities}>
                Continue
        </button>
      </div>
    );
  }

});

module.exports = SignInQuality;