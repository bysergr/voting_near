import React from 'react';

export default function Proposals({ proposals }) {  
  if(proposals.length === 0 ){
   return (
    <>
      <p>At this moment there are no proposals</p>
    </>
   ) 
  }
  
  function contarPorOpcion (num, proposal){
    let numero = 0;
    proposal.votes.map((index)=>{
      if(index.voteInfo == num){
        numero+=1;
      }
    });
    return numero;
  }
  return (
    <>
      <h2>Proposals</h2>
      {proposals.map((p, i) =>
        // TODO: format as cards, add timestamp
        <p key={i}>
          Number of proposal: <strong>{p.proposalId}</strong><br/> <strong>Sent by:</strong> {p.sender}<br/>
          {p.text} 
          <br/>
          <strong>Votes:</strong> Option 1 {contarPorOpcion(1,p)} Option2 {contarPorOpcion(2,p)} Option3 {contarPorOpcion(3,p)}
        </p>
      )}
    </>
  );
}