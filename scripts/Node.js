export default class Node {
  constructor (data) {
    this.data = data;
    this.children = {}
    this.isWord = false;
    this.pref = 0;
    // this.address;
  }
}
