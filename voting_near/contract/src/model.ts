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
  
  // public voteFor({id,voteInfo}:{id:string,voteInfo:number}): string{
  //   let votado = false;
  //   let idData = ''
  //   near.log("Llegueeeeeee")
  //   // for(let i =0; i< this.votes.length;i++){
        
  //   // } 
  //   // this.votes.forEach(vote => {
  //   //   near.log("Pasa el agua 2")
  //   //   if (vote.id == id) {
  //   //     near.log("Entreeeeee")
  //   //     votado = true;
  //   //     idData = id         
  //   //   }
  //   // })
    

  //   // near.log("Ahhhhhhhhh")
  //   /*
  //   //log
  //   if(!votado){
  //     this.votes.push(new Vote(id, voteInfo)) 
  //     return `${id} voted`
  //   }
  //   */
  //   return `${idData} had already voted`    

  // }

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