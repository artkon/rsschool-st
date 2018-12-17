const Tree = require('../src/Tree');
const Node = require('../src/Node');

beforeEach(function() {
    let tree = new Tree();
  });

describe('Node', function () {

    describe('getLeftChild', function () {
        it('should return left child of node', function () {
            let tree = new Tree();

            let a = new Node(5);
            let b = new Node(1);
            let c = new Node(6);

            tree.insert(a);
            tree.insert(b);
            tree.insert(c);

            let result = a.getLeftChild();

            expect(result).to.equal(b);
        });

        it('should return null if node doesn\'t have left child', function () {
            let tree = new Tree();

            let a = new Node(5);
            let c = new Node(6);

            tree.insert(a);
            tree.insert(c);

            let result = a.getLeftChild();

            expect(result).to.equal(null);
        });
    });

    describe('getRightChild', function () {
        it('should return right child of node', function () {
            let tree = new Tree();

            let a = new Node(5);
            let b = new Node(1);
            let c = new Node(6);

            tree.insert(a);
            tree.insert(b);
            tree.insert(c);

            let result = a.getLeftChild();

            expect(result).to.equal(c);
        });

        it('should return null if node doesn\'t have right child', function () {
            let tree = new Tree();

            let a = new Node(5);
            let c = new Node(1);

            tree.insert(a);
            tree.insert(c);

            let result = a.getLeftChild();

            expect(result).to.equal(null);
        });
    });

    describe('getParentNode', function () {
        it('should return parent node of node', function () {
            let tree = new Tree();

            let a = new Node(5);
            let b = new Node(1);
            let c = new Node(6);

            tree.insert(a);
            tree.insert(b);
            tree.insert(c);

            let result = c.getParentNode();

            expect(result).to.equal(a);
        });

        it('should return null if node is root of tree', function () {
            let tree = new Tree();

            let a = new Node(5);

            tree.insert(a);

            let result = a.getLeftChild();

            expect(result).to.equal(null);
        });
    });

    describe('getValue', function () {
        it('should return value of node', function () {
            let a = new Node(5);

            let result = a.getValue();

            expect(result).to.equal(5);
        });
    });

})
