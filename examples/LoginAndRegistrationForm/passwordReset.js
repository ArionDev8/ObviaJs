import { Button } from "../../components/Button/Button.js"
import { Container } from "../../components/Container.js"
import { Label } from "../../components/Label.js";
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

let passwordResetForm = new Container({
    id: 'formForPasswordReset',
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
                    let key = passwordResetForm.dropdown.selectedItem.key;
                    
                    Context.localizationManager.setSelectedLocale({
						displayLanguage: "Shqip",
						localeString: key,
					});
                }
            }
        },
        {
            ctor: Label,
            props: {
                label: "{localizationManager.getLocaleString('Forms','changePasswordLabel',localizationManager.selectedLocale)}",
                css: {
                    textAlign: 'center',
                },
                bindingDefaultContext: Context,
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
                    fontSize: '14px',
                    width: '100%',
                }
            }
        },
        {
            ctor: TextInput,
            props: {
                id: 'password',
                type: 'password',
                placeholder: "{localizationManager.getLocaleString('Forms','newPassword',localizationManager.selectedLocale)}",
                bindingDefaultContext: Context,
                css: {
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '14px',
                    width: '100%',
                }
            }
        },
        {
            ctor: Button,
            props: {
                id: 'ChangePasswordButton',
                type: 'button',
                label: "{localizationManager.getLocaleString('Forms','changePasswordBtn',localizationManager.selectedLocale)}",
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
                    let email = passwordResetForm.email.value;
                    let newPassword = passwordResetForm.password.value;

                    let users = JSON.parse(localStorage.getItem('users')) || [];
                    let userIndex = users.findIndex(user => user.email === email);

                    if (userIndex !== -1) {
                        users[userIndex].password = newPassword;
                        localStorage.setItem('users', JSON.stringify(users));
                        location.href = './login.html';

                        console.log("Successfully changed password");
                    } else {
                        console.log("User not found or failed to change password");
                    }
                },
                bindingDefaultContext: Context,
            }
        }
    ]
})

passwordResetForm.render().then(function (cmpInstance) {
    $('#root').append(cmpInstance.$el)
})

export { passwordResetForm }