import { Button } from "../../components/Button/Button.js"
import { Container } from "../../components/Container.js"
import { DropDown } from "../../components/DropDown/DropDown.js"
import { TextInput } from "../../components/TextInput/TextInput.js"
import { ArrayEx } from "../../lib/ArrayEx.js"
import { BrowserManager } from "../../lib/BrowserManager.js";
import { LocalizationManager } from "../../lib/LocalizationManager.js";
import { get } from "../../lib/my.js";

let Context = {};
Context.localizationManager = new LocalizationManager({
    selectedLocale: {
        displayLanguage: "English",
        localeString: "en_US",
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
// import { Cache } from "../../lib/cache/Cache.js"

// let cache = Cache.getInstance();

let user = {
    name: '',
    email: '',
    password: '',
}

let myRegistrationForm = new Container({
    id: 'formForRegistration',
    css: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '50%'
    },
    components: [
        {
            ctor: DropDown,
            props: {
                id: 'dropdown',
                css: {
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    backgroundColor: 'white',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                    width: '30%',
                    float: 'right',
                },
                valueField: "key",
                labelField: "title",
                label: "Choose Language",
                dataProvider: new ArrayEx([

                    { key: "en_US", title: "English" },
                    { key: "sq_AL", title: "Shqip" },
                ]),
                change: function (e) {
                    let key = myRegistrationForm.dropdown.selectedItem.key;

                    Context.localizationManager.setSelectedLocale({
                        displayLanguage: "Shqip",
                        localeString: key,
                    });
                }
            }
        },
        {
            ctor: TextInput,
            props: {
                id: 'name',
                type: 'text',
                placeholder: "{localizationManager.getLocaleString('Forms','name',localizationManager.selectedLocale)}",
                bindingDefaultContext: Context,
                css: {
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '20px',
                    width: '100%',
                }
            }
        },
        {
            ctor: TextInput,
            props: {
                id: 'email',
                type: 'text',
                placeholder: 'Email',
                css: {
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '20px',
                    width: '100%',
                }
            }
        },
        {
            ctor: TextInput,
            props: {
                id: 'password',
                type: 'password',
                placeholder: "{localizationManager.getLocaleString('Forms','password',localizationManager.selectedLocale)}",
                bindingDefaultContext: Context,
                css: {
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '20px',
                    width: '100%',
                }
            }
        },
        {
            ctor: Button,
            props: {
                id: 'registerButton',
                type: 'submit',
                label: "{localizationManager.getLocaleString('Forms','registerBtn',localizationManager.selectedLocale)}",
                css: {
                    padding: '10px',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    fontSize: '16px',
                    cursor: 'pointer',
                    width: '100%',
                    height: '50px',
                },
                click: function (e) {
                    user.name = myRegistrationForm.name.value;
                    user.email = myRegistrationForm.email.value;
                    user.password = myRegistrationForm.password.value;

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
                bindingDefaultContext: Context,
            }
        },
        {
            ctor: Button,
            props: {
                id: 'logInButton',
                type: 'button',
                label: "{localizationManager.getLocaleString('Forms','logInBtn',localizationManager.selectedLocale)}",
                css: {
                    padding: '10px',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: '#008CBA',
                    color: 'white',
                    fontSize: '16px',
                    cursor: 'pointer',
                    width: '100%',
                    height: '50px',
                },
                click: function () {
                    location.href = './login.html';
                },
                bindingDefaultContext: Context,
            }
        }
    ]
})

myRegistrationForm.render().then(function (cmpInstance) {
    $('#root').append(cmpInstance.$el)
})

export { myRegistrationForm }