import React from "react";

export default function Proposals({ proposals }) {
  if (proposals.length === 0) {
    return (
      <>
        <p>At this moment there are no proposals</p>
      </>
    );
  }

  function contarPorOpcion(num, proposal) {
    let numero = 0;

    proposal.votes.map((index) => {
      if (index.voteInfo == num) {
        numero += 1;
      }
    });
    return numero;
  }
  return (
    <>
      <h2>Proposals </h2>
      {proposals.map((p, i) => (
        <div className="card">
          <p key={i}>
            <strong className="cardTitle">
              PROPOSAL {p.proposal_id} {p.decided == true && <p>- Ended</p>}
            </strong>
            <br /> <strong>Sent by:</strong> {p.sender}
            <br />
            <strong>Text: </strong>
            {p.text}
            <br />
            <strong>Votes:</strong>
            <br />
            <strong>Option 1:</strong> {contarPorOpcion(1, p)}
            <strong> - Option 2:</strong> {contarPorOpcion(2, p)}
          </p>
        </div>
      ))}
    </>
  );
}
