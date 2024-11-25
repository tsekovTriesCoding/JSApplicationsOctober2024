import { html, render } from "./node_modules/lit-html/lit-html.js";

async function solve() {
   const tableBody = document.querySelector('.container tbody');
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   const data = await getStudents();

   const tableRows = Object.values(data).map(createTableRowTemp);
   render(tableRows, tableBody);

   function onClick() {
      const searchField = document.getElementById('searchField');
      const tableRows = document.querySelectorAll('.container tbody tr');
      const tableDatas = document.querySelectorAll('.container tbody tr td');

      clearTableRows(tableRows);
      
      tableDatas.forEach(td => {
         if (td.textContent.toLocaleLowerCase().includes(searchField.value.toLocaleLowerCase())) {
            td.parentElement.classList.add("select");
         }
      });

      searchField.value = '';
   }

   function clearTableRows(tableRows) {
      tableRows.forEach(tr => {
         tr.classList.remove("select");
      });
   }

   function createTableRowTemp(student) {
      student.isActive = !student.isActive;

      return html`
      <tr>
         <td>${student.firstName} ${student.lastName}</td>
         <td>j${student.email}</td>
         <td>${student.course}</td>
      </tr>
      `;
   }

   async function getStudents() {
      const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
      return response.json();
   }
}

solve();