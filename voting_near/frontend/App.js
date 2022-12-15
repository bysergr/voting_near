import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import { EducationalText, SignInPrompt, SignOutButton } from './ui-components';


export default function App({ isSignedIn, contractId, wallet }) {
  const [valueFromBlockchain, setValueFromBlockchain] = React.useState([]);

  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  // Get blockchian state once on component load
  React.useEffect(() => {
    getProposal()
      .then(setValueFromBlockchain)
      .catch(alert)
      .finally(() => {
        setUiPleaseWait(false);
      });
      console.log(valueFromBlockchain);
    }
  , []);

  /// If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return <SignInPrompt onClick={() => wallet.signIn()}/>;
  }

  async function addProposal(e) {
    e.preventDefault();
    setUiPleaseWait(true);
    const { proposalInput } = e.target.elements;
    
    // use the wallet to send the greeting to the contract
    await wallet.callMethod({contractId:contractId, method: 'set_proposal', args: { text: greetingInput.value }  })
      .then(async () => {return getProposal();})
      .then(setValueFromBlockchain)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  async function voteProposal(e){
    e.preventDefault();
    setUiPleaseWait(true);
    const { proposalId,proposalVote } = e.target.elements;

    await wallet.callMethod({contractId:contractId, method: 'vote_for', args: { id:proposalId.value, voto:proposalVote.value}  })
      .then(async () => {return getProposal();})
      .then(setValueFromBlockchain)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  async function getProposal(f= 0, t= 10){
    // View method
    return await wallet.viewMethod({ contractId:contractId , method: 'get_proposal', args: { from_index:f, limit:t } })
  }

  async function endProposal(e){
    e.preventDefault();
    setUiPleaseWait(true);
    const { idProposal } = e.target.elements;
    
    await wallet.callMethod({contractId:contractId, method: 'set_winner', args: { text: idProposal.value }  })
      .then(async () => {return getProposal();})
      .then(setValueFromBlockchain)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }


  return (
    <>
      <h1>Hola mundo</h1>


      {/* <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()}/>
      <main className={uiPleaseWait ? 'please-wait' : ''}>
        <h1>
          The contract says: <span className="greeting">{valueFromBlockchain}</span>
        </h1>
        <form onSubmit={changeGreeting} className="change">
          <label>Change greeting:</label>
          <div>
            <input
              autoComplete="off"
              defaultValue={valueFromBlockchain}
              id="greetingInput"
            />
            <button>
              <span>Save</span>
              <div className="loader"></div>
            </button>
          </div>
        </form>
        <EducationalText/>
      </main> */}
    </>
  );
}