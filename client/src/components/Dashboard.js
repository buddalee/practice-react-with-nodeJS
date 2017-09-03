import React from 'react';
import { Link } from 'react-router-dom';
import SurvetList from '../screens/surveys/SurveyList';
import { connect } from 'react-redux';

const Dashboard = ({ isInSufficient }) => {
  return (
    <div>
      <SurvetList />
      <div className="fixed-action-btn">
        <Link to={isInSufficient ? '/'  : "/surveys/new" } className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  console.log('state: ', state);
  if (state.auth) {
    return { isInSufficient: state.auth.isInSufficient };
  }
}
export default connect(mapStateToProps)(Dashboard);
