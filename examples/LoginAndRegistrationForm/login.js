import { Button } from "../../components/Button/Button.js"
import { Container } from "../../components/Container.js"
import { Link } from "../../components/Link/Link.js";
import { TextInput } from "../../components/TextInput/TextInput.js"
import { DropDown } from "../../components/DropDown/DropDown.js"
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

let myLoginForm = new Container({
    id: 'formForLogin',
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
                    let key = myLoginForm.dropdown.selectedItem.key;

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
            ctor: Link,
            props: {
                id: 'passwordResetLink',
                label: "{localizationManager.getLocaleString('Forms','forgotPasswordLink',localizationManager.selectedLocale)}",
                bindingDefaultContext: Context,
                href: './passwordReset.html',
                css: {
                    color: 'black'
                }
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
                    let email = myLoginForm.email.value;
                    let password = myLoginForm.password.value;

                    let users = JSON.parse(localStorage.getItem('users')) || [];
                    let user = users.find(user => user.email === email && user.password === password);

                    if (user) {
                        console.log("Successfully logged in");
                        location.href = './displayUsers.html';
                    } else {
                        console.log("Failed to log in");
                    }
                },
                bindingDefaultContext: Context,
            }
        }
    ]
})

myLoginForm.render().then(function (cmpInstance) {
    $('#root').append(cmpInstance.$el)
})

export { myLoginForm }