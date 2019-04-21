
const nodes = [];
const edges = [];


const pushNode = (id, label) => {
  nodes.push({
    id, label,
  })
}

const getId = (stringName) => {
  return stringName.split('/').filter(x => x).pop();
}


axios.get('https://swapi.co/api/people/1/').then(response => {
});


const createGraph = () => {
  const container = document.getElementById('network');
  const data = { 
    nodes,
    edges,
  };
  const options = {};
  const network = new vis.Network(container, data, options);  
}
