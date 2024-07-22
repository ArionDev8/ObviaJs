import { BrowserManager } from "/obvia/lib/BrowserManager.js";
import { LocalizationManager } from "/obvia/lib/LocalizationManager.js";
import { get } from "/obvia/lib/my.js";

// let Context = {};
// Context.localizationManager = new LocalizationManager({
//     selectedLocale: {
//         displayLanguage: "English",
//         localeString: "en_US",
//     },
//     fetchPromise: function (p) {
//         let fp = get(
//             BrowserManager.getInstance().base +
//             "/obvia/examples/Translation/" +
//             p.localeString +
//             ".json",
//             "application/json"
//         );
//         return fp.then((r) => {
//             return JSON.parse(r.response);
//         });
//     },  
// });

// // import { Cache } from "../../lib/cache/Cache.js"

// // let cache = Cache.getInstance();

// let user = {
//     name: '',
//     email: '',
//     password: '',
// }

let myRegistrationForm = function (applet) {
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

            console.log('Elements:', { _registerBtn, _logInBtn, _name, _email, _password, _dropdown });
            
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
                    click: "LOGIN",
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
            user.name = _name.value;
            user.email = _email.value;
            user.password = _password.value;

            let users = JSON.parse(localStorage.getItem('users')) || [];

            let emailExists = users.some(existingUser => existingUser.email === user.email);

            if (emailExists) {
                alert('This email is already registered. Please use a different email.');
            } else {
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));
                // alert('Registration successful!');
            }
        },

        REDIRECT: function () {
            location.href = './login.html';
        }
    }

    return imp;
}

// myRegistrationForm.ctor = "myRegistrationForm";
export { myRegistrationForm };

