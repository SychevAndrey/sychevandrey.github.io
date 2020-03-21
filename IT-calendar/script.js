const url = 'https://web-standards.ru/calendar.json';
const grid = document.querySelector('.calendar-grid');

function countDuration(start, end) {
	const day = 1000 * 60 * 60 * 24;
	return (Math.ceil((Date.parse(end) - Date.parse(start)) / day));
}

function createEventElement(event) {
	const div = document.createElement('a');
	const header = document.createElement('header');
	const city = document.createElement('p');
	const startEl = document.createElement('p');
	const duration = document.createElement('p');
	const days = countDuration(event.start, event.end);
	div.classList.add('grid-element');
	if (days == 2)
		div.classList.add('grid-element-2');
	if (days == 3)
		div.classList.add('grid-element-3');
	div.setAttribute( 'href', event.description );
	header.classList.add('grid-element__header');
	header.innerHTML = event.summary;
	div.appendChild(header);
	city.innerHTML = `Город: ${event.location}`;
	city.className = 'grid-element__text';
	div.appendChild(city);
	startEl.innerHTML = `Начало: ${event.start.substr(0, 10)}`;
	startEl.className = 'grid-element__text';
	div.appendChild(startEl);
	duration.className = 'grid-element__text';
	duration.innerHTML = `Продолжительность: ${days} ${days > 1 ? "дня" : "день"}`;
	div.appendChild(duration);
	return div;
}

async function getData() {
    return fetch(url)
        .then(response => response.json())
        .then(data => data);
}

async function main() {
	const data = await getData();
	data.reverse().map(event => {	
		grid.appendChild(createEventElement(event));
	});
}

main();