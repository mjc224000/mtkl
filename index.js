const Red = "Red", Black = "Black";

class BRTree {
    isRed(Node) {
        return Node.color === Red;
    }

    isLeft(node) {
        return node === node.parent.left;
    }

    getUncle(node) {
        let p = node.parent;
        let pp = p.parent;
        return pp.left === p ? pp.right : pp.left;
    }

    pushBlacknessDown(pp) {
        let {left, right} = pp;
        left.color = Black;
        right.color = Black;
        pp.color = right;
        if (pp === this.root) {
            pp.color = Black;
        }
    }


    travel() {
        function loop(node) {
            if (!node)
                return
            loop(node.left);
            console.log(node.value)
            loop(node.right);
        }

        loop(this.root)
    }

    rotateLeft(node) {
        if (!node) {
            return;
        }

        let p = node.parent;
        let r = node.right;
        if(!r){
            return ;
        }
        if (p){
            this.isLeft(node) ? p.left = r : p.right = r;
            r.parent=p;
        } else {
            this.root = r;
            r.parent = null;


        }
        let rl = r.left;
        r.left = node;
        node.parent=r;
        if (rl) {
            node.right = rl;
            rl.parent = node;
        } else {
            node.right = null
        }


        return r;
    }

    rotateRight(node) {
        if (!node)
            return;

        let p = node.parent;
        let nl = node.left;
        let lr = nl.right;
        if (p)
            this.isLeft(node) ? p.left = nl : p.right = nl;
        else {
            this.root = nl;
            nl.parent = null;
        }
        nl.right = node;
        node.parent = nl;
        if (lr) {
            node.left = lr;
            lr.parent = node;
        } else {
            node.left = null;
        }

        return nl;
    }


    insert(node) {
        node.color = Red;

        if (!this.root) {
            node.color = Black;
            this.root = node;
            return
        }
        let parent = this.root;
        while (1) {
            let value = parent.value;
            if (node.value < value) {
                if (!parent.left) {
                    parent.left = node;
                    break;
                }
                parent = parent.left;
            } else {
                if (!parent.right) {
                    parent.right = node;
                    break;
                }
                parent = parent.right;
            }
        }
        node.parent = parent;
        let cur = node;
        return;
        while (1) {
            let flag = true;
            if (cur === this.root) {
                cur.color = Black;
                return;
            }
            let p = cur.parent;
            if (!p || !p.parent) {
                if (p === this.root) {
                    p.color = Black;
                }
                return;
            }
            //4 父亲为红
            if (p.color === Red) {
                let uncle = this.getUncle(cur);
                //4.3 叔叔节点不存在或者为黑
                if (!uncle || uncle.color === Black) {
                    //4.3.1rr 插入节点是父亲的右子节点
                    if (!this.isLeft(cur)) {
                        p.color = Black;
                        let pp = p.parent;
                        pp.color = Red;
                        this.rotateLeft(pp);
                        cur = p;
                        flag = false;
                    } else {
                        //4.3.2
                    }
                } else {
                    //叔叔为红
                    p.color = Black;
                    uncle.color = Black;
                    cur = p.parent;
                    cur.color = Red;
                    flag = false;
                }

            }
            if (cur.color === Black) {
                return;
            }
            if (flag)
                return;
        }
    }


}

class Node {
    color
    value
    parent
    left
    right

    constructor({color = Red, value, parent = null, left, right}) {
        Object.assign(this, {color, value, parent, left, right})
    }
}

let brTree = new BRTree();
console.time('aa');
for (let i = 1; i < 30000; i++) {
    let node = new Node({color: Red, value: Math.random()})
    brTree.insert(node);

}
console.timeEnd('aa');
brTree.travel();
console.log(brTree)

