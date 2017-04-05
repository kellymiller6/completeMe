import Node from '../scripts/Node.js'
import fs from 'fs';
require('locus')

const text = "/usr/share/dict/words"
export default class CompleteMe {
  constructor() {
    this.root = new Node();
    this.counter = 0;
  }

  insert(word){
    let current = this.root;
    let splitWord = word.split('')

    splitWord.forEach((letter) => {
      if (!current.children[letter]) {
        current.children[letter] = new Node(letter);
      }
      current = current.children[letter];
    })
    this.counter++;
    current.isWord = true;
   }

  findNode(string) {
    let current = this.root;
    let splitString = string.split('')

    splitString.forEach(letter => {
      if(current.children[letter]){
        return current = current.children[letter]
      }
    })
      return current
    }

  suggest(prefix, possibleObjectArray) {
    let foundNode = this.findNode(prefix)
    var possibleObjectArray = possibleObjectArray || []
    if (foundNode.isWord){
      possibleObjectArray.push({word:prefix, pref:foundNode.pref})
    }

    Object.keys(foundNode.children).forEach((key) => {
      this.suggest(prefix + key, possibleObjectArray)
    })

    possibleObjectArray.sort((a, b) => {
      return b.pref - a.pref;
    });

    let possibleWordArray = possibleObjectArray.map(function(obj){
      return obj['word']
    })

    return possibleWordArray
  }

  populate() {
    const dictionary = fs.readFileSync(text).toString('utf-8').trim().split('\n');

    dictionary.forEach((word) => {
      this.insert(word);
    });
  }


  select(prefix, select) {
    let possibleWordArray = this.suggest(prefix)

    let selectedWord = possibleWordArray.find((val) => {
      return val === select
    })

    var selectedNode = this.findNode(selectedWord)
    selectedNode.pref++
    console.log(selectedNode)

  }
}
