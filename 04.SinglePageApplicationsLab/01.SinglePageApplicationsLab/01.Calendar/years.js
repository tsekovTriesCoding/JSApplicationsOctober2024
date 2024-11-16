const yearsSection = document.getElementById('years');
yearsSection.style.display = 'block';

yearsSection.querySelectorAll('tr>td').forEach(td => {
    td.addEventListener("click", onYearClick);
});

function onYearClick(e) {
    yearsSection.style.display = 'none';
    const year = e.target.textContent.trim();
    document.querySelector(`#year-${year}`).style.display = 'block';
}