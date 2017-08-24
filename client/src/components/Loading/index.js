import React from 'react';
import './style.css';
export default function Loading() {
  return (
    <ul className="loading">
      <li className="loading__cycle"></li>
      <li className="loading__cycle"></li>
      <li className="loading__cycle"></li>
    </ul>
  );
}
