window.currencyBackup = [];

function renderCurrency(currency) {
	let htmlString = '';
	for (let current of currency) {
		htmlString += `
	 <tr>
			<td>${current.txt}</td>
			<td>${current.rate}</td>
		</tr>
		`;
	}
	document.getElementById('currency').innerHTML = htmlString;
}

fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20221115&json').then(res => res.json()).then(function (data) {
	window.currencyBackup = data;
	renderCurrency(data);
});

function filterCurrency(searchValue) {
	const result = [];
	for (let current of window.currencyBackup) {
		const currentName = current.txt.toLowerCase();
		if (currentName.indexOf(searchValue) >= 0) {
			result.push(current);
		}
	}
	renderCurrency(result);
}

const search = document.getElementById('search');

search.onkeyup = function (e) {
	const searchValue = e.currentTarget.value;
	filterCurrency(searchValue.trim().toLowerCase());
}
