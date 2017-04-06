import { expect } from 'chai';
import CompleteMe from '../scripts/CompleteMe'
import Node from '../scripts/Node.js'

require('locus')

describe('CompleteMe', () => {
  let completion;

  beforeEach(() => {
    completion = new CompleteMe();
  });

  it('should be a constructor', () =>{
    expect(completion).to.be.instanceOf(CompleteMe)
  })

  it('should have a root node', () => {
    expect(completion.root).to.be.an.instanceof(Node);
  });

  it('should have a root node with no children', () => {
    expect(completion.root.children).to.deep.eq({});
  });

  it('should have an insert function', () => {
    expect(completion.insert('')).to.be.function;
  });

  it('should have findNode function', () => {
    expect(completion.findNode('')).to.be.function;
  });

  it('should have suggest function', () => {
    expect(completion.suggest('')).to.be.function;
  });

  it('should have populate function', () => {
    expect(completion.populate()).to.be.function;
  });
})

describe('insert method', () => {
  let completion;

  beforeEach(() => {
    completion = new CompleteMe();
  });

  it('should create node for first letter of word', () => {
    completion.insert('ape');

    expect(completion.root.children).to.have.property('a');
  });

  it('should not create a new node if node exists', () => {
    completion.insert('a');
    completion.insert('a');

    expect(completion.root.children).to.not.have.property('a', 'a');
  });

  it('should add a child to the prevous letter in a word', () => {
    completion.insert('ape');

    expect(completion.root.children).to.have.property('a')
                                    .to.have.property('children')
                                    .to.have.property('p')
                                    .to.have.property('children')
                                    .to.have.property('e');
  });

  it('should not create a new child node of a letter if already exists', () => {
    completion.insert('ape');
    completion.insert('ape');

    expect(completion.root.children).to.have.property('a')
                                    .to.have.property('children')
                                    .to.not.have.deep.property('p', 'p');
  });

  it ('should not create a new child node of a letter if exists', () => {
    completion.insert('ape');
    completion.insert('apes');

    expect(completion.root.children).to.have.property('a')
                                    .to.have.property('children')
                                    .to.not.have.deep.property('p', 'p');
  });
});


describe('findNode method', () => {
  let completion;

  beforeEach(() => {
    completion = new CompleteMe();
  });

  it('should return last node by using address', () => {
    completion.insert('apple');

    expect(completion.findNode('appl').data).to.be.eq('l')
    expect(completion.findNode('ap').data).to.be.eq('p')
  })
});


describe('suggest method', () => {
  let completion;

  beforeEach(() => {
    completion = new CompleteMe();
  });

  it('should return array of possible words from a partial string', () => {
    completion.insert('apple');
    completion.insert('all');
    completion.insert('banana');
    completion.insert('back');
    completion.insert('bean');
    completion.insert('ape')
    completion.insert('apes')

    expect(completion.suggest('ap')).to.deep.eq(['apple', 'ape', 'apes' ])
    // expect(completion.suggest('ba')).to.deep.eq(['banana', 'back' ])
  })
});

describe('populate method', ()=> {
  let completion;

  beforeEach(() => {
    completion = new CompleteMe();
    completion.populate()
  });

  it('should return count of dictionary', () => {
    expect(completion.counter).to.be.eq(235886)
  })

  it('should return array of possible words from a partial string', () => {
    expect(completion.suggest('piz'))
    .to.deep.eq(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
  })
})

describe('select method', ()=> {
  let completion;

  beforeEach(() => {
    completion = new CompleteMe();
  });

  it('should return array of possible words from a partial string', () => {
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
    completion.populate()
    completion.select('piz', 'pizzeria');
    completion.select('piz', 'pizzeria');
    completion.select('piz', 'pizzeria');
    completion.select('piz', 'pizzle');

    expect(completion.suggest('piz'))
    .to.deep.eq(["pizzeria", "pizzle", "pize", "pizza",  "pizzicato"])
  })

  it('should increment the selected words pref', () => {
    completion.populate()
    completion.select('piz', 'pizza')

    var selectedNode = completion.findNode('pizza')

    expect(selectedNode.pref).to.eq(1)
  })
})
