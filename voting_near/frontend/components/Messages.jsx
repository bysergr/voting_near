import React from 'react';
import PropTypes from 'prop-types';

export default function Proposals({ proposals }) {
  return (
    <>
      <h2>Proposals</h2>
      {proposals.map((proposal, i) =>
        // TODO: format as cards, add timestamp
        <p key={i}>
          Propuesta Numero: <strong>{proposal.proposalId}</strong>: {proposal.sender}<br/>
          {proposal.text} 
          <br/>
          <strong>Votos</strong> {proposal.votes.map((index)=>{
            
          })}
        </p>
      )}
    </>
  );
}

Proposals.propTypes = {
  proposals: PropTypes.array
};
