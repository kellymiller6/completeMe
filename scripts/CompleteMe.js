import Node from '../scripts/Node.js'

export default class CompleteMe {
  constructor() {
    this.root = new Node();
    this.counter = 0;
  }

  insert(word){
    let current = this.root;

    word.split('').forEach((letter) => {
      if (!current.children[letter]) {
         current.children[letter] = new Node(letter);
       }
       current = current.children[letter];
       this.counter++;
     })
   }

  suggest(){
    
  }
}
