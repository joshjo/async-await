
const nodes = [];
const edges = [];

const mapNodes = {};
const mapEdges = {};

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
  if ( ! mapNodes.hasOwnProperty(id)) {
    nodes.push({
      id, label, color: colors[color],
    });
    mapNodes[id] = true;
  }
};

const pushEdge = (from, to) => {
  const id = `${from}-${to}`;
  if ( ! mapEdges.hasOwnProperty(id) ) {
    edges.push({ from, to });
    mapEdges[id] = true;
  }
}

const getId = (stringName) => {
  return stringName.split('/').filter(x => x).pop();
};

const addPeople = async (responsePeople, person) => {
  const { data: { films, name } } = responsePeople;
  pushNode(person, name);
  const filmsPromises = films.map(film => {
    pushEdge(person, `f_${getId(film)}`);
    return axios.get(film);
  });
  const filmsResponses = await axios.all(filmsPromises);
  const vehiclesPromises = filmsResponses.map(response => {
    const { data: { vehicles, url, title } } = response;
    const fid = getId(url);
    pushNode(`f_${fid}`, title, 'films', person);
    return vehicles.map(vehicle => {
      pushEdge(`f_${fid}`, `v_${getId(vehicle)}`);
      return axios.get(vehicle)
    });
  }).reduce((a, b) => a.concat(b));
  const vehiclesResponses = await axios.all(vehiclesPromises);
  vehiclesResponses.map(response => {
    const { data: { name, url} } = response;
    const vid = getId(url);
    pushNode(`v_${vid}`, name, 'vehicles');
  });
}

const appendPeople = (responsePeople, person) =>{
  return new Promise(async (resolve) => {
    await addPeople(responsePeople, person);
    resolve("finished");
  })
}

// loadData();

