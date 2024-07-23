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


let passwordReset = function(applet) {
    let _dropdown;
    let _email;
    let _newPassword;
    let _button;

    let imp = {
        END_DRAW : function() {
            _dropdown = applet.find('dropdown');
            _email = applet.find('email');
            _newPassword = applet.find('password');
            _button = applet.find('ChangePasswordButton');

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
                    click: "RESET_PASSWORD",
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

        RESET_PASSWORD: function () {
            let email = _email.value;
            let newPassword = _newPassword.value;

            let users = JSON.parse(localStorage.getItem('users')) || [];
            let userIndex = users.findIndex(user => user.email === email);

            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));
                console.log("Successfully changed password");
            } else {
                console.log("User not found or failed to change password");
            }
        },
    }

    return imp;
}

export { passwordReset };