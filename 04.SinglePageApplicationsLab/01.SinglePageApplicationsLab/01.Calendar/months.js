const monthsSections = document.querySelectorAll('.monthCalendar');
const monthsCaptions = document.querySelectorAll('.daysCalendar caption');

const months = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sept: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
};

const monthsCodeConverter = {
    January: 'Jan',
    February: 'Feb',
    March: 'Mar',
    April: 'Apr',
    May: 'May',
    June: 'June',
    July: 'Jul',
    August: 'Aug',
    September: 'Sept',
    October: 'Oct',
    November: 'Nov',
    December: 'Dec'
};

monthsSections.forEach(s => {
    s.querySelectorAll('tr>td').forEach(td => {
        td.addEventListener("click", onMonthClick);
    });
});

monthsSections.forEach(s => {
    s.querySelectorAll('caption').forEach(cap=> {
        cap.addEventListener("click", onCapClick);
    });
});

function onMonthClick(e) {
    const monthCalendar = e.target.closest('.monthCalendar');
    const id = monthCalendar.id;
    const year = id.split('-')[1];
    const month = e.target.textContent.trim();
   
    monthsSections.forEach(s => s.style.display = 'none');
    document.getElementById(`month-${year}-${months[month]}`).style.display = 'block';
}

function onCapClick() {
    monthsSections.forEach(s => s.style.display = 'none');
    document.getElementById('years').style.display = 'block';
}

monthsCaptions.forEach(c => {
    c.addEventListener("click", onMonthReturnClick);
});

function onMonthReturnClick(e) {
    e.target.closest('.daysCalendar').style.display = 'none';
    let [month, year] = e.target.textContent.split(' ');
    document.getElementById(`year-${year}`).style.display = 'block';
}

