import { expect } from 'chai';
import Node from '../scripts/Node.js'

describe('Node', () => {
  it('should be a constructor', () =>{
    var node = new Node()

    expect(node).to.be.instanceOf(Node)
  })

  it('should take a data argument', () => {
    var node = new Node('p');

    expect(node.data).to.equal('p');
  })

  it('should have a children object', () => {
    var node = new Node('p');

    expect(node.children).to.be.Object;
  })

  it('should instanciate with isWord property with default value false', () => {
    var node = new Node('p');

    expect(node.isWord).to.be.False;
  })
})
