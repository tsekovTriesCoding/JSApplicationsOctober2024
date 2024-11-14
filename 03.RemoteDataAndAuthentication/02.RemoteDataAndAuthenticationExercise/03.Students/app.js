const endpoint = 'http://localhost:3030/jsonstore/collections/students';
const tableBody = document.querySelector('#results tbody');
const form = document.getElementById('form');

form.addEventListener("submit", onSubmit);

async function onSubmit() {
    const formData = new FormData(form);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');

    const student = {
        firstName,
        lastName,
        facultyNumber,
        grade,
    };

    const options = {
        method: "post",
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify(student)
    };

    const response = await fetch(endpoint, options);
    onLoad();
}

(async function onLoad() {
    const response = await fetch(endpoint);
    const data = await response.json();

    Object.values(data)
        .forEach(student => {
            const tr = createStudentTableRow(student);
            tableBody.appendChild(tr);
        });
})();

function createStudentTableRow(student) {
    const tdFirstName = document.createElement('td');
    tdFirstName.textContent = student.firstName;
    const tdLastName = document.createElement('td');
    tdLastName.textContent = student.lastName;
    const tdFacultyNumber = document.createElement('td');
    tdFacultyNumber.textContent = student.facultyNumber;
    const tdGrade = document.createElement('td');
    tdGrade.textContent = student.grade;

    const tr = document.createElement('tr');
    tr.appendChild(tdFirstName);
    tr.appendChild(tdLastName);
    tr.appendChild(tdFacultyNumber);
    tr.appendChild(tdGrade);

    return tr;
}






