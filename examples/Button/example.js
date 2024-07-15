import { Button } from "../../components/Button/Button.js";
import { Container } from "../../components/Container.js";
import { BrowserManager } from "../../lib/BrowserManager.js";
import { LocalizationManager } from "../../lib/LocalizationManager.js";
import { get } from "../../lib/my.js";

let Context = {};
Context.localizationManager = new LocalizationManager({
	selectedLocale: {
		displayLanguage: "Shqip",
		localeString: "sq_AL",
	},
	fetchPromise: function (p) {
		let fp = get(
			BrowserManager.getInstance().base +
			"/obvia/examples/Translation/" +
			p.localeString +
			".json",
			"application/json"
		);
		return fp.then((r) => {
			return JSON.parse(r.response);
		});
	},
});
//myButton.localizationManager = localizationManager;
var myButton = new Container({
	components: [
		{
			ctor: Button,
			props: {
				id: "button1",
				type: "",
				value: "",
				label: "Fixed Label",
				classes: ["btn", "btn-success"],
				click: function (e) {
					Context.localizationManager.setSelectedLocale({
						displayLanguage: "English",
						localeString: "en_US",
					});				},
				bindingDefaultContext: Context,
			},
		},
		{
			ctor: Button,
			props: {
				id: "button2",
				type: "",
				value: "",
				label:
					"{localizationManager.getLocaleString('Forms', 'label', localizationManager.selectedLocale)}",
				classes: ["btn", "btn-success"],
				click: function (e) {
					console.log("From ClickAction");
				},
				bindingDefaultContext: Context,
			},
		},
	],
});

Context.localizationManager.loaded.then((d) => {
	myButton.render().then(function (cmpInstance) {
		myButton.button1.on("click", function () {
			Context.localizationManager.setSelectedLocale({
				displayLanguage: "Shqip",
				localeString: "sq_AL",
			});
		});
		$(document.body).append(cmpInstance.$el);
	});
});

export { myButton };
