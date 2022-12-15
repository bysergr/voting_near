// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, Vector } from 'near-sdk-js';
import { POINT_ONE, PostedProposal,Vote } from './model'

@NearBindgen({})
class VotingNear {
 proposals: Vector<PostedProposal> = new Vector<PostedProposal>("v-uid");

  @view({}) // This method is read-only and can be called for free
  get_proposal({ from_index = 0, limit = 10 }: { from_index: number, limit: number }) {
    return this.proposals.toArray().slice(from_index, from_index + limit)
  }

  @call({}) // This method changes the state, for which it cost gas
  set_proposal({ text }: { text: string }): void {
    near.log(`Saving proposal ${text}`);
    const sender = near.predecessorAccountId();
    const proposal:PostedProposal = new PostedProposal(this.proposals.length,sender,text)
    this.proposals.push(proposal); 
  }

  @call({}) // This method changes the state, for which it cost gas
  delete_proposal({ prop_id }: { prop_id: number }): boolean {
    near.log(`deleting proposal ${prop_id}`);
    near.log(this.proposals)
    let borrado = false;
    //recibe una id, la busca y la borra
      let propuestas = this.proposals;
    //primero buscamos la posicion de acuerdo a la id de la propuesta
    for(let i=0; i<propuestas.length;i++){
      near.log('buscando elemento')
      if(propuestas.get(i).proposal_id == prop_id){
        propuestas.swapRemove(i); 
        near.log('encontrado')
       this.proposals = propuestas;
       borrado=true;
      }
    }
    
    return borrado;
  }

  @call({})
  set_winner({id}:{id:number}): boolean {
    //near.log(this.proposals.get(id).setDecided())
    //primero buscamos la propuesta
    let propuestas = this.proposals;
    let state = false;
    for(let i=0; i<propuestas.length;i++) {
      near.log('buscando elemento');
      if(propuestas.get(i).proposal_id == id && propuestas.get(i).sender == near.predecessorAccountId()){
       let p = propuestas.get(i);
       p.decided= true;
       propuestas.replace(i,p); 
       near.log('encontrado')
        state=true;
      }
    }
    if(state==false) {
      near.log('No eres la persona que creo la propuesta no puedes finalizarla')
    }
    this.proposals = propuestas;
    return state;
  }

  @call({})
  vote_for({id,voto}:{id:number,voto:number}){
    let votado = false;
    //recibe una id, la busca y vota por ella
    let propuestas = this.proposals;
    near.log('ejecutando')

    if( voto > 3 || voto < 0) {
      near.log(`${voto} not is valid`)
      return votado
    } 
    
    for(let i = 0; i < propuestas.length; i++){
      let p = propuestas.get(i);
      near.log('pasa la agua')

      if(p.proposal_id == id && !votado){
        if(!p.decided){
          // near.log(p.voteFor({id: near.predecessorAccountId(), voteInfo: voto}))
          let votado = false;
          let idData = ''
          

          p.votes.forEach(vote => {
            near.log("foreach ejecutandose")
            if (vote.id == near.predecessorAccountId()) {
              near.log("encontre un voto repetido")
              votado = true;
              idData = vote.id;         
            }
          })

          if(!votado){
            p.votes.push(new Vote(near.predecessorAccountId(), voto))
            //para que la votacion se refleje debemos reemplazar la propuesta vieja
            //por la propuesta con el push realizado
            propuestas.replace(i,p);
             
            near.log(`${id} voted`)
          }

          near.log(`${idData} had already voted`)  

        } else {
          near.log('Voting had already been completed')
        }
        votado = true 
      }
    }
    
   this.proposals = propuestas;
    return votado;
  }
}