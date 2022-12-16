const POINT_ONE = '100000000000000000000000';

export class Vote {
  id: string;
  voteInfo: number;

  constructor(id: string, voteInfo: number) {
    this.id = id;
    this.voteInfo = voteInfo
  }
}

class PostedProposal {
  decided: boolean;
  sender: string;
  text: string;
  votes: Vote[];
  proposal_id:number;

  constructor(id:number, sender:string, text:string) {
    this.decided = false;
    this.sender = sender;
    this.text = text;
    this.votes = []
    //random number from 0 to 1000
    this.proposal_id = id;
  }
  
 

  public setDecided(): string {
    if (!this.decided){
      this.decided = true;
      return `Voting ended: ${this.text}`
    } else {
      return `Voting had already been completed: ${this.text}`
    }
  }

  public getVotes(): Vote[] {
    return this.votes
  }
}

export { POINT_ONE, PostedProposal }