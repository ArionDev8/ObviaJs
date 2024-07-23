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

let login = function (applet) {
    let _dropdown;
    let _logInBtn;
    let _email;
    let _password;
    let _passwordResetLink;

    let imp = {

        END_DRAW: function(){
            _dropdown = applet.find('dropdown');
            _logInBtn = applet.find('logInButton');
            _email = applet.find('email');
            _password = applet.find('password');
            _passwordResetLink = applet.find('passwordResetLink');

            applet.addBehaviors(
                _dropdown,
                {
                    change: "CHANGE_LANGUAGE",
                },
                false
            )

            applet.addBehaviors(
                _logInBtn,
                {
                    click: "LOG_IN",
                },
                false
            )

            applet.addBehaviors(
                _passwordResetLink,
                {
                    click: "PASSWORD_RESET_REDIRECT"
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

        LOG_IN: function () {
            let email = _email.value;
            let password = _password.value;

            let users = JSON.parse(localStorage.getItem('users')) || [];
            let user = users.find(user => user.email === email && user.password === password);

            if (user) {
                console.log("Successfully logged in");
                applet.app.appletsMap["table"][0].initApplet();
            } else {
                console.log("Failed to log in");
            }
        },

        PASSWORD_RESET_REDIRECT: function() {
            applet.app.appletsMap["passwordReset"][0].initApplet();
        }

    }

    return imp;
}

export { login }