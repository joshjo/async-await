
const nodes = [];
const edges = [];

const mapData = {};

const colors = {
  people: '#F1C8DB',
  films: '#BDFFFD',
  vehicles: '#6ABEA7',
};

const createGraph = () => {
  const container = document.getElementById('network');
  const data = {
    nodes,
    edges,
  };
  const options = {};
  const network = new vis.Network(container, data, options);
};

const pushNode = (id, label, color, parent) => {
  if ( ! mapData.hasOwnProperty(id)) {
    nodes.push({
      id, label, color: colors[color],
    });
    mapData[id] = true;
  }
};

const getId = (stringName) => {
  return stringName.split('/').filter(x => x).pop();
};

const addPeople = (response, person) => {
  // axios.get('https://swapi.co/api/people/1/').then(response => {
  const { data: { films, name } } = response;
  pushNode(person, name);
  for(let i = 0; i < films.length; i++) {
    edges.push({ from: person, to: `f_${getId(films[i])}` })
    axios.get(films[i]).then(response  => {
      const { data: { title, vehicles, url } } = response;
      const fid = getId(films[i]);
      pushNode(`f_${fid}`, title, 'films', person);
      for (let j = 0; j < vehicles.length; j++) {
        edges.push({ from: `f_${fid}`, to: `v_${getId(vehicles[j])}` })
        axios.get(vehicles[j]).then(response => {
          const { data: { name, url } } = response;
          const vid = getId(vehicles[j]);
          pushNode(`v_${vid}`, name, 'vehicles', `f_${fid}`);
        });
      }
    });
  }
};

// loadData();
