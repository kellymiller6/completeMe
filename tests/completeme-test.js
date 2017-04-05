import { expect } from 'chai';
import CompleteMe from '../scripts/CompleteMe'
import Node from '../scripts/Node.js'
// const text = "/usr/share/dict/words"
require('locus')

describe('CompleteMe', () => {
  it('should be a constructor', () =>{
    var completion = new CompleteMe()

    expect(completion).to.be.instanceOf(CompleteMe)
  })

  it('should have a root node', () => {
    var completion = new CompleteMe()

   expect(completion.root).to.be.an.instanceof(Node);
 });

 it('should have an insert function', () => {
   var completion = new CompleteMe()

   expect(completion.insert('')).to.be.function;
 });

 it('should have findNode function', () => {
   var completion = new CompleteMe()

   expect(completion.findNode('')).to.be.function;
 });
})

describe('insert method',()=>{
  it('should create node for first letter of word', () => {
   let completion = new CompleteMe();
   completion.insert('ape');

   expect(completion.root.children).to.have.property('a');
 });

 it('should not create a new node if node exists',() => {
   let completion = new CompleteMe();
   completion.insert('a');
   completion.insert('a');

   expect(completion.root.children).to.not.have.property('a','a');
 });

 it('should add a child to the prevous letter in a word', () => {
   let completion = new CompleteMe();
   completion.insert('ape');

   expect(completion.root.children).to.have.property('a').to.have.property('children').to.have.property('p').to.have.property('children').to.have.property('e');
 });

 it('should not create a new child node of a letter if it already exists', () => {
   let completion = new CompleteMe();
   completion.insert('ape');
   completion.insert('ape');

   expect(completion.root.children).to.have.property('a').to.have.property('children').to.not.have.deep.property('p','p');
 });

 it('should not create a new child node of a letter if it already exists', () => {
   let completion = new CompleteMe();
   completion.insert('ape');
   completion.insert('apes');

   expect(completion.root.children).to.have.property('a').to.have.property('children').to.not.have.deep.property('p','p');
 });
});


describe('findNode method',()=>{

  it('should return last node by using address', () => {
    let completion = new CompleteMe();

    completion.insert('apple');

    expect(completion.findNode('appl').data).to.be.eq('l')
    expect(completion.findNode('ap').data).to.be.eq('p')
  })

});


describe('suggest method',()=>{

  it('should return array of possible words from a partial string', () => {
    let completion = new CompleteMe();

    completion.insert('apple');
    completion.insert('all');
    completion.insert('banana');
    completion.insert('back');
    completion.insert('bean');
    completion.insert('ape')
    completion.insert('apes')

    expect(completion.suggest('ap')).to.deep.eq(['apple', 'ape', 'apes' ])
    expect(completion.suggest('ba')).to.deep.eq(['banana', 'back' ])
  })

});

describe('populate method', ()=> {
  it('should return count of dictionary', () => {
    let completion = new CompleteMe();
    completion.populate()
    expect(completion.counter).to.be.eq(235886)

  })

  it('should return array of possible words from a partial string', () => {
    let completion = new CompleteMe();

    completion.populate()

    expect(completion.suggest('piz')).to.deep.eq(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
  })
})

  describe('select method', ()=> {

    it('should return array of possible words from a partial string', () => {
      let completion = new CompleteMe();

      completion.insert('apple');
      completion.insert('all');
      completion.insert('banana');
      completion.insert('back');
      completion.insert('bean');
      completion.insert('ape')
      completion.insert('apes')
      completion.select('ap', 'apple');
      completion.select('ap', 'apple');
      completion.select('ap', 'apple');
      completion.select('ap', 'apes');

      expect(completion.suggest('ap')).to.deep.eq(['apple', 'apes', 'ape' ])
      expect(completion.suggest('ba')).to.deep.eq(['banana', 'back' ])
    })

    it('should return array of possible words from a partial string', () => {
      let completion = new CompleteMe();

      completion.populate()

      completion.select('piz', 'pizzeria');
      completion.select('piz', 'pizzeria');
      completion.select('piz', 'pizzeria');
      completion.select('piz', 'pizzle');

      expect(completion.suggest('piz')).to.deep.eq(["pizzeria", "pizzle", "pize", "pizza",  "pizzicato"])

    })
})
