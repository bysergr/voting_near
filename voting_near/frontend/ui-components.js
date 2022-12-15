import React from 'react';

export function SignInPrompt({ onClick }) {
  return (
    <main>
      <h1>
        Welcome to votingNear
      </h1>
      <p>
        Your contract is storing several proposals in the NEAR blockchain. To
        vote them or propose a new one, you need to sign in using the NEAR Wallet. It is very simple,
        just use the button below.
      </p>
      <br/>
      <p style={{ textAlign: 'center' }}>
        <button onClick={onClick}>Sign in with NEAR Wallet</button>
      </p>
    </main>
  );
}

export function SignOutButton({accountId, onClick}) {
  return (
    <button className='outB' onClick={onClick}>
      Sign out {accountId}
    </button>
  );
}