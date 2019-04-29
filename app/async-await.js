const people = [1, 2, 3, 4, 5, 6, 7];



const loadData = async () => {
  /*
    Lets assume that one api call depends on the previuos one
  */
  await appendPeople(await axios.get(`https://swapi.co/api/people/${people[0]}/`), `person_${0}`);
  await appendPeople(await axios.get(`https://swapi.co/api/people/${people[1]}/`), `person_${1}`);
  await appendPeople(await axios.get(`https://swapi.co/api/people/${people[2]}/`), `person_${2}`);
  await appendPeople(await axios.get(`https://swapi.co/api/people/${people[3]}/`), `person_${3}`);
  await appendPeople(await axios.get(`https://swapi.co/api/people/${people[4]}/`), `person_${4}`);
  await appendPeople(await axios.get(`https://swapi.co/api/people/${people[5]}/`), `person_${5}`);
  await appendPeople(await axios.get(`https://swapi.co/api/people/${people[6]}/`), `person_${6}`);
  createGraph();
}

loadData();
