function solve() {
    const url = 'http://localhost:3030/jsonstore/bus/schedule/';
    const info = document.querySelector('.info');
    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');

    let currentStop = 'depot';
    
    function depart() {
        fetch(`${url}${currentStop}`)
            .then((res) => res.json())
            .then((data) => {
                toggleButtons(departButton, arriveButton);
                info.textContent = `Next stop ${data.name}`;
            }).catch(() => {
                info.textContent = 'Error';
                departButton.setAttribute('disabled', 'disabled');
                arriveButton.setAttribute('disabled', 'disabled');
            });
    }

    function arrive() {
        fetch(`${url}${currentStop}`)
            .then((res) => res.json())
            .then((data) => {
                toggleButtons(arriveButton, departButton);
                info.textContent = `Arriving at ${data.name}`;
                currentStop = data.next;
            }).catch(() => {
                info.textContent = 'Error';
                departButton.setAttribute('disabled', 'disabled');
                arriveButton.setAttribute('disabled', 'disabled');
            });
    }

    return {
        depart,
        arrive
    };

    function toggleButtons(buttonA, buttonB) {
        buttonA.setAttribute('disabled', 'disabled');
        buttonB.removeAttribute('disabled');
    }
}

let result = solve();