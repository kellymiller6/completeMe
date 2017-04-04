import { expect } from 'chai';
import CompleteMe from '../scripts/CompleteMe'
import Node from '../scripts/Node.js'

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
})

describe('insert function',()=>{


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

 });