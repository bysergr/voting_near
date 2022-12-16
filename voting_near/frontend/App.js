import 'regenerator-runtime/runtime';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

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
    
    // use the wallet to send the proposal to the contract
    await wallet.callMethod({contractId:contractId, method: 'set_proposal', args: { text: proposalInput.value }  })
      .then(async () => {return getProposal();})
      .then(setValueFromBlockchain)
      .finally(() => {
        setUiPleaseWait(false);
        toast('Created a new Proposal');
      });
  }

  async function voteProposal(e){
    e.preventDefault();
    setUiPleaseWait(true);
    const { proposalId,proposalVote } = e.target.elements;
     //if(parseInt(proposalId.value ) < valueFromBlockchain.length && parseInt(proposalVote)<3 && parseInt(proposalVote)>0){
    await wallet.callMethod({contractId:contractId, method: 'vote_for', args: { id:parseInt(proposalId.value), voto:parseInt(proposalVote.value)}  })
      .then(async () => {return getProposal();})
      .then(setValueFromBlockchain)
      .finally(() => {
        setUiPleaseWait(false);
        toast('You Voted');
      });
      
    //}
    //else{
      //alert('Utiliza un numero valido para votar')
    //}
  }

  async function getProposal(f= 0, t= 10){
    // View method
    return await wallet.viewMethod({ contractId:contractId , method: 'get_proposal', args: { from_index:f, limit:t } })
  }

  async function endProposal(e){
    e.preventDefault();
    setUiPleaseWait(true);
    const { proposalInput } = e.target.elements;
    
    let v = await wallet.callMethod({contractId:contractId, method: 'set_winner', args: { id: parseInt(proposalInput.value) }  })
      .then(async () => {return getProposal();})
      .then(setValueFromBlockchain)
      .finally(() => {
        setUiPleaseWait(false);
        toast('End the Proposal');
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
      <Proposals proposals={valueFromBlockchain} wallet = {wallet} />
      <h3>
         Vote for  a proposal:
        </h3>
        <form onSubmit={voteProposal} className='formularioBonito' >
          <label>You have to enter the number of the proposal, a 1 for approving  or a 2 for denying</label>
          <div>
            <label>Proposal number:</label>
            <input
              autoComplete="off"
              defaultValue="0"
              id="proposalId"
              className='inputDecente'
            />
            <label>Vote option</label>
             <input
              autoComplete="off"
              defaultValue="0"
              id="proposalVote"
              className='inputDecente'
            />

            <button className='botonDecente'>
              <span>Vote</span>
     
            </button>
          </div>
        </form>
        <form onSubmit={endProposal} className='formularioBonito' >
          <label>End a proposal:</label><br/>
          <label>It will work only if you have added that proposal</label>
          <div>
            <input
              autoComplete="off"
              placeholder="Insert the Id of the proposal"
              id="proposalInput"
              className='inputDecente'
            />
            <button className='botonDecente'>
              <span>End Proposal</span>
            </button>
          </div>
        </form>
      <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()}/>
      <Toaster   
      position="top-center"
      reverseOrder={false} /> 
      </main> 
    </>
  );
}