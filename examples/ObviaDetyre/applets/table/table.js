import { BrowserManager } from "/obvia/lib/BrowserManager.js";
import { LocalizationManager } from "/obvia/lib/LocalizationManager.js";
import { get } from "/obvia/lib/my.js";

let Context = {};
window.localizationManager = Context.localizationManager = await new LocalizationManager({
    selectedLocale: {
        displayLanguage: "English",
        localeString: "en_US",
    },
    fetchPromise: async function (p) {
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

let users = JSON.parse(localStorage.getItem('users')) || [];

let table = function (applet) {
    let _dropdown;
    let _grid;
    let _editBtn;

    let imp = {
        END_DRAW: function (){
            _dropdown = applet.find('dropdown');
            _grid = applet.find('grid');
            _editBtn = applet.find('editBtn');

            _grid.dataProvider = users;

            applet.addBehaviors(
                _dropdown,
                {
                    change: "CHANGE_LANGUAGE",
                },
                false
            )

            applet.addBehaviors(
                _grid, {
                    cellClick: {
                        REDIRECT: (e, dg, ra) => {
                            return ra.columnIndex === 2
                        },
                    },
                },
                false
            )
        },

        CHANGE_LANGUAGE: function (e) {  
            let key = _dropdown.selectedItem.key;
            
            Context.localizationManager.setSelectedLocale({
                displayLanguage: "Shqip",
                localeString: key,
            });
        },

        REDIRECT: function(){
            applet.app.appletsMap["edit"][0].initApplet();
        }
    }

    return imp
}

export { table }