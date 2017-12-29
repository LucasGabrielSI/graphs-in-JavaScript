class Graph {
    constructor(vertexes = [], edges = [], digrafe = false) {
      this.vertexes = vertexes;
      this.edges = edges;
      this.digrafe = digrafe;
    }
  
    getOpen() {
      let open = this.vertexes.filter(v => {
        if (v.status == "OPEN") {
          return v;
        }
      });
  
      return open;
    }
  
    hasOpenVertexes() {
      return this.getOpen().length > 0;
    }
  
  
    bfs(vertex) {
      let fila = [];
      let atual = vertex;
      vertex.level = 0;
      fila.push(atual);
  
      while (fila.length > 0) {
        atual = fila.shift();
        atual.adjacency.forEach(edge => {
          if (edge.isUnexplored()) {
            if (!edge.hasDestinyVertexBeenVisited()) {
              edge.status = "DISCOVERED";
              edge.destiny.level = edge.origin.level + 1;
              fila.push(edge.destiny);
            } else {
              edge.status = "CROSSED";
            }
          }
        })
      }
    }
  
    shortPath(vertex) {
      vertex.estimate = 0;
  
      while (this.hasOpenVertexes()) {
        let minimum = this.findOpenMinimum();
        minimum.status = "CLOSED";
  
        minimum.adjacency.forEach(e => {
          if (e.destiny.status == "OPEN") {
            e.relaxation();
          }
        })
  
  
      }
  
  
    }
  
    findOpenMinimum() {
      let open = this.getOpen();
      let minimum = open[0];
  
      open.forEach(v => {
        if (v.estimate < minimum.estimate) {
          minimum = v;
        }
      });
  
      return minimum;
  
    }
  
    dfs(vertex) {
      vertex.visited = true;
  
      vertex.adjacency.forEach(edge => {
        if (edge.status == "UNEXPLORED") {
          if (edge.destiny.visited == false) {
            edge.status = "DISCOVER";
            deepFirstSearch(edge.destiny);
          } else {
            edge.status = "RETURN";
          }
        }
      });
    }
  
    addVertex(key) {
      let vertex = new Vertex(key);
      this.vertexes.push(vertex);
      return vertex;
    }
  
    addEdge(origin, destiny, weight) {
      if(this.digrafe == true){
          let edge = new Edge(origin, destiny, weight);
          this.edges.push(edge);
          origin.adjacency.push(edge);
  
      }
      else{
          let edge = new Edge(origin, destiny, weight);
          this.edges.push(edge);
          origin.adjacency.push(edge);
          
          let edge2 = new Edge(destiny, origin, weight);
          destiny.adjacency.push(edge2);
      
      }
    }
  
    adjacencyList() {
      this.vertexes.forEach(v => v.adjacencyList());
    }
  }
  
  
  
  
  ////////////////////////////////////////////////////////
  
  
  
  
  class Vertex {
    constructor(key, visited = false, adjacency = [], level = null,
                status = "OPEN", estimate = Number.POSITIVE_INFINITY, predecessor = null) {
      this.key = key;
      this.visited = false;
      this.adjacency = adjacency;
      this.level = level;
      this.status = status;
      this.estimate = estimate;
      this.predecessor = predecessor;
    }
  
    adjacencyList() {
      let list = this.key;
      this.adjacency.forEach(edge => list += " -> " + edge.destiny.key);
      console.log(list);
    }
  
    isVisited() {
      return (this.level !== null);
    }
  
    toString() {
      return this.key;
    }
  
  }
  
  
  
  
  //////////////////////////////////////////////////////////////////
  
  
  
  
  
  class Edge {
    constructor(origin, destiny, weight = null, status = "UNEXPLORED") {
      this.origin = origin;
      this.destiny = destiny;
      this.weight = weight;
      this.status = status;
    }
  
    isUnexplored() {
      return (this.status === "UNEXPLORED");
    }
  
    hasDestinyVertexBeenVisited() {
      return this.destiny.isVisited();
    }
  
    relaxation() {
      let newEstimate = this.origin.estimate + this.weight;
      if (newEstimate < this.destiny.estimate && this.destiny.status == "OPEN") {
        this.destiny.estimate = newEstimate;
        this.destiny.predecessor = this.origin;
      }
    }
  
  
  }
  
  
  ///////////////////////////////////////////////
  
  let g = new Graph();
  let g1 = new Graph();
  g1.digrafe = true;
  
  let g2 = new Graph();
  g2.digrafe = false;
  
  let a1 = g1.addVertex('A');
  let b1 = g1.addVertex('B');
  let c1 = g1.addVertex('C');
  
  let a2 = g2.addVertex('A');
  let b2 = g2.addVertex('B');
  let c2 = g2.addVertex('C');
  
  
  let ab1 = g1.addEdge(a1, b1, 4);
  let ac1 = g1.addEdge(a1, c1, 2);
  let bc1 = g1.addEdge(b1, c1, 5);
  
  let ab2 = g2.addEdge(a2, b2, 4);
  let ac2 = g2.addEdge(a2, c2, 2);
  let bc2 = g2.addEdge(b2, c2, 5);
  
  
  /*let a = g.addVertex('A');
  let b = g.addVertex('B');
  let c = g.addVertex('C');
  let d = g.addVertex('D');
  let e = g.addVertex('E');
  let f = g.addVertex('F');
  
  
  let ab = g.addEdge(a, b, 4);
  let ac = g.addEdge(a, c, 2);
  let bc = g.addEdge(b, c, 1);
  let bd = g.addEdge(b, d, 5);
  let ce = g.addEdge(c, e, 10);
  let cd = g.addEdge(c, d, 8);
  let de = g.addEdge(d, e, 2);
  let df = g.addEdge(d, f, 6);
  let ef = g.addEdge(e, f, 2);
  
  
  g.shortPath(a);
  g.vertexes.forEach(v => {
    console.log(`${v.key}: [${v.predecessor},${v.estimate}]`);
  })
  
  
  
  
  console.log(g.hasOpenVertexes());
  console.log(g.getOpen());
  
  
  g.bfs(v1);
  g.vertexes.forEach( v => {
    console.log(v.key + " | " + v.level);
  });
  
  g.edges.forEach( e => {
    console.log(`${e.origin.key} - ${e.destiny.key} | ${e.status}`);
  })/*/
  
  
  console.log("para grafo digrafo :");
  g1.adjacencyList();
  
  console.log("para grafo N digrafo :");
  g2.adjacencyList();