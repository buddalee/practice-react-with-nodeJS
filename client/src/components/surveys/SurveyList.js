import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import Loading from '../Loading';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    const props = this.props;
    const { surveys } = props;
    return surveys.reverse().map(survey => {
      return (
        <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    const props = this.props;
    const { isLoading } = props;
    return (
      <div style={{ padding: '0 10px' }}>
        {isLoading ? <Loading /> : this.renderSurveys()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    surveys: state.surveys.surveys,
    isLoading: state.surveys.isLoading,
  };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
