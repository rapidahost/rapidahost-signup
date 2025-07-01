import React from 'react';

export default function Signup() {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <input type="email" placeholder="Email" /><br />
        <input type="password" placeholder="Password" /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

