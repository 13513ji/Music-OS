window.oldLocalStorage = {
	"custom_bg": "assets/img/bg5.jpg"
};
const legacyBackgrounds = {
	"assets/img/bg.webp": "assets/img/bg.jpg",
	"assets/img/bg2.jpg": "assets/img/bg.jpg",
	"assets/img/bg3.png": "assets/img/bg3.jpg",
	"assets/img/bg5.avif": "assets/img/bg5.jpg"
};
setInterval(() => {
	let background = localStorage.getItem("custom_bg");
	if (legacyBackgrounds[background]) {
		background = legacyBackgrounds[background];
		localStorage.setItem("custom_bg", background);
	}
	if (background && background != window.oldLocalStorage["custom_bg"]) {
		document.getElementById("desktop").style.backgroundImage = `url(${background})`;
		window.oldLocalStorage["custom_bg"] = background;
	}
}, 100);