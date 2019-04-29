

const people = [1, 2, 3, 4, 5, 6, 7];

const loadData = () => {
  /*
    Lets assume that one api call depends on the previuos one
  */
  axios.get(`https://swapi.co/api/people/${people[0]}/`).then(response => {
    addPeople(response, `person_${0}`);
    axios.get(`https://swapi.co/api/people/${people[1]}/`).then(response => {
      addPeople(response, `person_${1}`);
      axios.get(`https://swapi.co/api/people/${people[2]}/`).then(response => {
        addPeople(response, `person_${2}`);
        axios.get(`https://swapi.co/api/people/${people[3]}/`).then(response => {
          addPeople(response, `person_${3}`);
          axios.get(`https://swapi.co/api/people/${people[4]}/`).then(response => {
            addPeople(response, `person_${4}`);
            axios.get(`https://swapi.co/api/people/${people[5]}/`).then(response => {
              addPeople(response, `person_${5}`);
              axios.get(`https://swapi.co/api/people/${people[6]}/`).then(response => {
                addPeople(response, `person_${5}`);
                // createGraph();
              });
            });
          });
        });
      });
    });
  });
}

loadData();
