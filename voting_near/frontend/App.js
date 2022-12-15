import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import { EducationalText, SignInPrompt, SignOutButton } from './ui-components';
import Proposals from './components/Proposals';

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
    await wallet.callMethod({contractId:contractId, method: 'set_proposal', args: { text: proposalInput.value }  })
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
      <main className={uiPleaseWait ? 'please-wait' : ''}>
      <h1>
         Propose your idea here:
        </h1>
        <form onSubmit={addProposal} className='formularioBonito' >
          <label>Add a new proposal:</label>
          <div>
            <input
              autoComplete="off"
              defaultValue="A new house for the puppies"
              id="proposalInput"
              className='inputDecente'
            />
            <button className='botonDecente'>
              <span>Save</span>
     
            </button>
          </div>
        </form>
      <Proposals proposals={valueFromBlockchain} />

      <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()}/>
         
       
      </main> 
    </>
  );
}