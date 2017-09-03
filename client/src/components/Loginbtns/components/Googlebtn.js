import React from 'react';

const Googlebtn = () => {
  return (
    <button className="loginBtn loginBtn--google"
      onClick={() => window.location.href = '/auth/google' }
    >
        Login with Google
    </button>
  );
}

export default Googlebtn;