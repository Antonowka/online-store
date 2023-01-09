// <<<---- СЮДА ИМПОРТИМ НАШИ ФАЙЛЫ СКРИПТЫ
import {createProducts, viewmode, dualInputRange} from './main';
import fillDetailPage from './detail'
import fillCartPage from './cart'
import '../style/style.css'


// ---->>>

import myJson from './products.json' assert {
  type: 'json'
};

const products = myJson;
const pageTitle = "Online Store";

type ItemTypes = {
	[key: string]: {
		template: string;
		title: string;
};
}

const items: ItemTypes = {
	key: {
		template: '',
		title: ''
	}
}

for (let i = 0; i < products.length; i++) {
	var key = 'item-' + products[i].id;
	var value = {
		template: "./templates/temp-page-detail.html",
		title: "Item | " + pageTitle,
	};

	items[key] = value;
}

const routes: ItemTypes = {
	404: {
		template: "./templates/temp-page-404.html",
		title: "404 | " + pageTitle,
	},
	"/": {
		template: "./templates/temp-index.html",
		title: "Home | " + pageTitle,
	},
	cart: {
		template: "./templates/temp-page-cart.html",
		title: "Cart | " + pageTitle,
	},
};

Object.assign(routes, items)


const locationHandler = async () => {
	var location = window.location.hash.replace("#", "");
	location = location.split('?')[0];

	if (location.length == 0) {
		location = "/";
	}

	const route = routes[location] || routes["404"];

	const html = await fetch(route.template).then((response) => response.text());

	(document.querySelector("main") as HTMLInputElement).innerHTML = html;
	// <<<---- СЮДА ВСТАВЛЯТЬ НАШИ ФУНКЦИИ ДЛЯ СТРАНИЦ
	if (location === "/") {
		createProducts();
    viewmode();
    dualInputRange();
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