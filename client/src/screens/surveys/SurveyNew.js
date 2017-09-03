import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyFormReview from './SurveyFormReview';
import SurveyForm from './SurveyForm';

class SurveyNew extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { new: true };
  // }
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm',
})(SurveyNew);
