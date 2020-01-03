var bfsSeq = [];

function bfs() {
    var input_val = document.getElementById('input-node').value;
    start = graph.getElementById(input_val);
    var visited = [];
    for (var iter = 0; iter < graph.nodes().length; iter++)
        visited[iter] = false;
    var queue = [];
    visited[start.id()] = true;
    queue.push(start);
    bfsSeq.push(start);

    while (queue.length > 0) {
        var node = queue.shift();
        var adjacent = node.neighbourhood('node');

        adjacent.forEach(neighbour => {
            if (!visited[neighbour.id()]) {
                visited[neighbour.id()] = true;
                bfsSeq.push(neighbour.edgesWith(node));
                bfsSeq.push(neighbour);
                queue.push(neighbour);
            }
        });
    }
}

var j = 0;
function bfsRun() {
    var input_val = document.getElementById('input-node').value;
    if (input_val == '') {
        alert("Enter starting vertex");
        return;
    }
    if (j < bfsSeq.length) {
        bfsSeq[j].addClass('visited');
        j++;
        setTimeout(bfsRun, 1000);
    }
}