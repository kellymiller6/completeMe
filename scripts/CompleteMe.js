import Node from '../scripts/Node.js'
require('locus')

export default class CompleteMe {
  constructor() {
    this.root = new Node();
    this.counter = 0;
  }

  insert(word){
    let current = this.root;
    let splitWord = word.split('')
    let address = ''

    splitWord.forEach((letter) => {
      if (!current.children[letter]) {
        current.children[letter] = new Node(letter);
      }
      current = current.children[letter];

      address = address + letter
      current.address = address
      // console.log(current)
    })
    current.isWord = true;
    this.counter++;
   }

  findNode(string) {
    let current = this.root;
    let splitString = string.split('')

    splitString.forEach(letter => {
      if(current.children[letter]){
        return current = current.children[letter]
      }
    })

    if (current.address === string){
      return current
    }
  }

  suggest(prefix, possibleWordArray) {

    var possibleWordArray = possibleWordArray || []
    let foundNode = this.findNode(prefix)
    let nextLetter = Object.getOwnPropertyNames(foundNode.children).toString()

    if (foundNode.isWord){
      possibleWordArray.push(prefix)
    }

    if(nextLetter) {
      let letters = nextLetter.split(',')

      var nextPrefix = letters.map(letter => {
        return prefix + letter;
      })
      for(var i = 0; i<nextPrefix.length; i++){
        this.suggest(nextPrefix[i], possibleWordArray)
      }
    }

    return possibleWordArray;
  }




}
