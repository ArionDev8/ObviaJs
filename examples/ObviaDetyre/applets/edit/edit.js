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


let edit = function (applet) {
    let _dropdown;
    let _name;
    let _email;
    let _password;
    let _button;

    let imp = {
   
        END_DRAW : function(){
            _dropdown = applet.find('dropdown');
            _name = applet.find('name');
            _email = applet.find('email');
            _password = applet.find('password');
            _button = applet.find('editButton');

            applet.addBehaviors(
                _dropdown,
                {
                    change: "CHANGE_LANGUAGE",
                },
                false
            )

            applet.addBehaviors(
                _button,
                {
                    click: "EDIT",
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

        EDIT: function () {
            let updatedName = _name.value;
            let email = _email.value;
            let updatedPassword = _password.value;

            let users = JSON.parse(localStorage.getItem('users')) || [];
            let userExists = users.find(user => user.email === email);

            if (userExists) {
                users = users.map(u => u.email === email ? { name: updatedName, email: u.email, password: updatedPassword } : u);
                localStorage.setItem('users', JSON.stringify(users));
                alert('User information updated successfully.');
            } else {
                alert('Email not found. Please check the email address.');
            }
        }
    }
    return imp;
}

export { edit };