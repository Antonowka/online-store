// <<<---- СЮДА ИМПОРТИМ НАШИ ФАЙЛЫ СКРИПТЫ
import createProducts from './main.js'
import fillDetailPage from './detail.js'
import fillCartPage from './cart.js'
// ---->>>

import myJson from './products.json' assert {
  type: 'json'
};

const products = myJson;
const pageTitle = "Online Store";

const items = {}

for (let i = 0; i < products.length; i++) {
	var key = 'item-' + products[i].id;
	var value = {
		template: "/templates/temp-page-detail.html",
		title: "Item | " + pageTitle,
	};

	items[key] = value;
}

const routes = {
	404: {
		template: "/templates/temp-page-404.html",
		title: "404 | " + pageTitle,
	},
	"/": {
		template: "/templates/temp-index.html",
		title: "Home | " + pageTitle,
	},
	cart: {
		template: "/templates/temp-page-cart.html",
		title: "Cart | " + pageTitle,
	},
};

Object.assign(routes, items)


const locationHandler = async () => {
	var location = window.location.hash.replace("#", "");

	if (location.length == 0) {
		location = "/";
	}

	const route = routes[location] || routes["404"];

	const html = await fetch(route.template).then((response) => response.text());

	document.querySelector("main").innerHTML = html;
	// <<<---- СЮДА ВСТАВЛЯТЬ НАШИ ФУНКЦИИ ДЛЯ СТРАНИЦ
	if (location === "/") {
		createProducts();
	}

	if (location.startsWith("item")) {
		fillDetailPage();
	}

	if (location === "cart") {
		fillCartPage();
	}
	// ---->>>
	document.title = route.title;
};

window.addEventListener("hashchange", locationHandler);

locationHandler();