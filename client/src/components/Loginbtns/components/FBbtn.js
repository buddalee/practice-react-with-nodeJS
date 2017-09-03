import React from 'react';

const FBbtn = () => {
  return (
    <button className="loginBtn loginBtn--facebook"
      onClick={() => window.location.href = '/auth/facebook' }
    >
        Login with Facebook
    </button>
  );
}

export default FBbtn;
