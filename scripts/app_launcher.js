function newWin(id) {
	launchApp(id, true);
}

function closedApp(win) {
	win.classList.remove("window");
	win.classList.remove("win-front");
	const appId = win.classList.toString().split("w-")[1];
	setTimeout(() => {

		if (!windowExists(appId)) {
			document.querySelector("#dock .app[data-id='" + appId + "']")?.classList.remove("active");
		}

	}, 250);
}

const types = {
	"text": "txt",
	"markdown": "md",
	"javascript": "js",
	"python": "py",
	"html": "html",
	"css": "css"
};

function launchApp(id, bypass = false, extra = null) {
	if (id == "calculator") {
		if (!windowExists(id) || bypass) {
			launchWindow("Calculator", "calculator", "apps/calculator/index.html", 200, 220);
			document.querySelector("#dock .app[data-id='" + id + "']")?.classList.add("active");
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "camera") {
		if (!windowExists(id) || bypass) {
			launchWindow("Camera", "camera", "apps/camera/index.html", 400, 300);
			document.querySelector("#dock .app[data-id='" + id + "']")?.classList.add("active");
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "browser") {
		if (!windowExists(id) || bypass) {
			launchWindow("Browser", "browser", "apps/browser/index.html", 600, 500);
			document.querySelector("#dock .app[data-id='" + id + "']")?.classList.add("active");
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "settings") {
		if (!windowExists(id) || bypass) {
			launchWindow("Settings", "settings", "apps/settings/index.html", 600, 500);
			document.querySelector("#dock .app[data-id='" + id + "']")?.classList.add("active");
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "terminal") {
		if (!windowExists(id) || bypass) {
			launchWindow("Terminal", "terminal", "apps/terminal/index.html", 600, 500);
			document.querySelector("#dock .app[data-id='" + id + "']")?.classList.add("active");
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "files") {
		if (!windowExists(id) || bypass) {
			launchWindow("Files", "files", "apps/files/index.html", 600, 500, extra);
			document.querySelector("#dock .app[data-id='" + id + "']")?.classList.add("active");
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "ace") {
		if (!windowExists(id) || bypass) {
			launchWindow("AceEditor", "ace", "apps/ace/index.html", 600, 500);
			document.querySelector("#dock .app[data-id='" + id + "']")?.classList.add("active");
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "doom") {
		if (!windowExists(id) || bypass) {
			launchWindow("Doom", "doom", "apps/games/doom/index.html", 600, 500);
			document.querySelector("#dock .app[data-id='" + id + "']")?.classList.add("active");
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "8ball-pool") {
		if (!windowExists(id) || bypass) {
			launchWindow("8 Ball Pool", "8ball-pool", "apps/games/8ball-pool/index.html", 600, 500);
			document.querySelector("#dock .app[data-id='" + id + "']")?.classList.add("active");
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "cube-worlds") {
		if (!windowExists(id) || bypass) {
			launchWindow("Cube Worlds", "cube-worlds", "apps/games/cube-worlds/index.html", 600, 500);
			document.querySelector("#dock .app[data-id='" + id + "']")?.classList.add("active");
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id.endsWith(".mp4")) {
		const win = launchWindow("Media Preview", "preview", "apps/video/index.html", 800, 500);
		win.addEventListener("load", () => {

		    var db = open.result;
		    var tx = db.transaction("mainStore", "readonly");
		    var store = tx.objectStore("mainStore");
		    var getVal = store.get(id);

		    getVal.onsuccess = function() {
		        win.contentWindow.play(getVal.result.data);
		    };

		});
		document.querySelector("#dock .app[data-id='preview']")?.classList.add("active");
	}
	else if (id.endsWith(".png")) {
		const win = launchWindow("Media Preview", "preview", "apps/image/index.html", 300, 300);
		win.addEventListener("load", () => {

		    var db = open.result;
		    var tx = db.transaction("mainStore", "readonly");
		    var store = tx.objectStore("mainStore");
		    var getVal = store.get(id);

		    getVal.onsuccess = function() {
		        win.contentWindow.show(getVal.result.data);
		    };

		});
		document.querySelector("#dock .app[data-id='preview']")?.classList.add("active");
	}
	else if (id.includes(".")) {
		const win = launchWindow("AceEditor", "ace", "apps/ace/index.html", 600, 500);
		document.querySelector("#dock .app[data-id='ace']")?.classList.add("active");

		win.addEventListener("load", () => {

		    var db = open.result;
		    var tx = db.transaction("mainStore", "readonly");
		    var store = tx.objectStore("mainStore");
		    var getVal = store.get(id);

		    getVal.onsuccess = function() {
		        win.contentWindow.editor.setValue(getVal.result.data);
				win.contentWindow.editor.session.setMode("ace/mode/" + types[id.split(".")[1]]);
		        if (id == "do not read.txt") {
		        	runDestructionSequence();
		        }
		    };

		});
	}
}

document.querySelectorAll(".app").forEach((app, index) => {
	app.addEventListener("click", () => {
		if (app.getAttribute("data-id") == "all-apps") {
			const menu = document.getElementById("app-launcher-menu");
			const isOpening = menu.hidden;
			menu.hidden = !isOpening;
			app.classList.toggle("active", isOpening);
			app.setAttribute("aria-expanded", String(isOpening));
			return;
		}
		document.querySelector("#dock .app[data-id='" + app.getAttribute("data-id") + "']")?.classList.add("active");
		launchApp(app.getAttribute("data-id"));
	});
});

document.querySelectorAll("[data-launch-id]").forEach((button) => {
	button.addEventListener("click", () => {
		const menu = document.getElementById("app-launcher-menu");
		const toggle = document.querySelector("#dock [data-id='all-apps']");
		menu.hidden = true;
		toggle.classList.remove("active");
		toggle.setAttribute("aria-expanded", "false");
		launchApp(button.getAttribute("data-launch-id"));
	});
});

document.addEventListener("click", (event) => {
	const menu = document.getElementById("app-launcher-menu");
	const toggle = document.querySelector("#dock [data-id='all-apps']");
	if (!menu.hidden && !menu.contains(event.target) && !toggle.contains(event.target)) {
		menu.hidden = true;
		toggle.classList.remove("active");
		toggle.setAttribute("aria-expanded", "false");
	}
});

document.addEventListener("keydown", (event) => {
	if (event.key == "Escape") {
		const menu = document.getElementById("app-launcher-menu");
		const toggle = document.querySelector("#dock [data-id='all-apps']");
		menu.hidden = true;
		toggle.classList.remove("active");
		toggle.setAttribute("aria-expanded", "false");
	}
});
