function solve() {
    let span = document.querySelector('#info span');
    let btnDepart = document.querySelector('#depart');
    let btnArrive = document.querySelector('#arrive');
  
    let stop = {
      next: 'depot',
    };
  
    async function depart() {
      btnDepart.disabled = true;
  
      let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
  
      let respond = await fetch(url);
      stop = await respond.json();
  
      span.textContent = `Next stop ${stop.name}`;
  
      btnArrive.disabled = false;
    }
  
    function arrive() {
      span.textContent = `Arriving at ${stop.name}`;
  
      btnDepart.disabled = false;
      btnArrive.disabled = true;
    }
  
    return {
      depart,
      arrive,
    };
  }
  
  let result = solve();