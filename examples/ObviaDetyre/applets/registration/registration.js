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


let user = {
    name: '',
    email: '',
    password: '',
}

let registration = function (applet) {
    let _registerBtn;
    let _logInBtn;
    let _name;
    let _email;
    let _password;
    let _dropdown;

    let imp = {
        END_DRAW: function () {
            _registerBtn = applet.find('registerButton');
            _logInBtn = applet.find('logInButton');
            _name = applet.find('name');
            _email = applet.find('email');
            _password = applet.find('password');
            _dropdown = applet.find('dropdown');
            
            applet.addBehaviors(
                _dropdown,
                {
                    change: "CHANGE_LANGUAGE",
                },
                false
            )

            applet.addBehaviors(
                _registerBtn,
                {
                    click: "REGISTER",
                },
                false
            )

            applet.addBehaviors(
                _logInBtn,
                {
                    click: "REDIRECT",
                },
                false
            )
        },

        CHANGE_LANGUAGE: function () {
            let key = _dropdown.selectedItem.key;

            Context.localizationManager.setSelectedLocale({
                displayLanguage: "Shqip",
                localeString: key,
            });
        },

        REGISTER: function () {
            user.name = _name.value.trim();
            user.email = _email.value.trim();
            user.password = _password.value.trim();

            if (!user.name && !user.email && !user.password) {
                alert('All fields are required.');
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];

            let emailExists = users.some(existingUser => existingUser.email === user.email);

            if (emailExists) {
                alert('This email is already registered. Please use a different email.');
            } else {
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));
            }
        },

        REDIRECT: function () {
            applet.app.appletsMap["login"][0].initApplet();
        }
    }

    return imp;
}


export { registration };

