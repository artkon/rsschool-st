const Tree = require('../src/Tree');
const Node = require('../src/Node');


describe('Tree', function () {
    let tree;

    beforeEach(function() {
        tree = new Tree();
      });

    describe('getRoot', function () {
        it('should return root element of non empty tree', function () {
            tree = new Tree();

            let a = new Node(5);
            tree.insert(a);

            let result = tree.getRoot();

            expect(result).to.equal(a);
        });

        it('should return null if tree is empty', function () {
            tree = new Tree();

            let result = tree.getRoot();

            expect(result).to.equal(null);
        });
    });

    describe('search', function () {
        it('should return target node if tree consist it', function () {
            tree = new Tree();

            let a = new Node(5);
            let b = new Node(6);
            let c = new Node(1);
            tree.insert(a);
            tree.insert(b);
            tree.insert(c);

            let result = tree.search(6);

            expect(result).to.equal(b);
        });

        it('should return null if tree doesn\'t consist target value', function () {
            tree = new Tree();

            let a = new Node(5);
            tree.insert(a);

            let result = tree.search(10);

            expect(result).to.equal(null);
        });
    });

    describe('contains', function () {
        it('should return true if element contains in tree', function () {
            tree = new Tree();

            let a = new Node(5);
            tree.insert(a);

            let result = tree.contains(5);

            expect(result).to.equal(true);
        });

        it('should return false if element doesn\'t contain in tree', function () {
            tree = new Tree();

            let a = new Node(5);
            tree.insert(a);

            let result = tree.contains(10);

            expect(result).to.equal(false);
        });
    });

    describe('insert', function () {
        it('should return inserted node', function () {
            tree = new Tree();
            let a = new Node(5);

            let result = tree.insert(a);

            expect(result).to.equal(a);
        });

        it('should insert smaller value node as left child node', function () {
            tree = new Tree();
            let a = new Node(5);
            let b = new Node(1);

            tree.insert(a);
            tree.insert(b);

            let result = a.getLeftChild() === b;


            expect(result).to.equal(true);
        });

        it('should insert bigger value node as right child node', function () {
            tree = new Tree();
            let a = new Node(1);
            let b = new Node(5);

            tree.insert(a);
            tree.insert(b);

            let result = a.getRightChild() === b;


            expect(result).to.equal(true);
        });
    });
})
