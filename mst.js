const MAX = 100005;
id = [];
mstSeq = [];
sortedWeights = [];
nodeMap = [];

function initialize() {
    for (var i = 0; i < MAX; i++)
        id[i] = i;
    var z = 0;
    graph.nodes().forEach(node => {
        nodeMap[node.id()] = z;
        z++;
    });
    sortedWeights = graph.edges().sort(function (a, b) {
        return a.data('weight') - b.data('weight');
    });
}

function root(x) {
    while (id[x] != x) {
        id[x] = id[id[x]];
        x = id[x];
    }
    return x;
}

function union(x, y) {
    var p = root(x);
    var q = root(y);
    id[p] = id[q];
}

function kruskal() {
    var x, y;
    var cost, minimumCost = 0;
    sortedWeights.forEach(edge => {
        x = nodeMap[edge.data('source')];
        y = nodeMap[edge.data('target')];
        cost = edge.data('weight');
        if (root(x) != root(y)) {
            minimumCost += cost;
            mstSeq.push(edge);
            union(x, y);
        }
    });
}

initialize();
kruskal();
var i = 0;
function mstRun() {
    if (i < mstSeq.length) {
        mstSeq[i]._private.source.addClass('visited');
        mstSeq[i].addClass('visited');
        mstSeq[i]._private.target.addClass('visited');
        i++;
        setTimeout(mstRun, 1000);
    }
};
