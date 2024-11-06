function getInfo() {
    const url = 'http://localhost:3030/jsonstore/bus/businfo';
    const stopId = document.getElementById('stopId').value;
    const stopNameDiv = document.getElementById('stopName');
    const busesUl = document.getElementById('buses');

    fetch(`${url}/${stopId}`)
        .then(res => res.json())
        .then(stop => {
            stopNameDiv.textContent = stop.name;
            Object.keys(stop.buses)
                .forEach((busId, time) => {
                    const li = document.createElement('li');
                    li.textContent = `Bus ${busId} arrives in ${time} minutes`;
                    busesUl.append(li);
                });

        })
        .catch(err => stopNameDiv.textContent = 'Error');
}