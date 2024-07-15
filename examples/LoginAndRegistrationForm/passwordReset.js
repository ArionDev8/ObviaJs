import { Button } from "../../components/Button/Button.js"
import { Container } from "../../components/Container.js"
import { Label } from "../../components/Label.js";
import { TextInput } from "../../components/TextInput/TextInput.js"


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
            ctor: Label,
            props: {
                label: 'Password Reset',
                css: {
                    textAlign: 'center',
                }
            }
        },
        {
            ctor: TextInput,
            props: {
                id: 'email',
                type: 'text',
                placeholder: 'Email',
            }
        },
        {
            ctor: TextInput,
            props: {
                id: 'password',
                type: 'password',
                placeholder: 'New Password',
            }
        },
        {
            ctor: Button,
            props: {
                id: 'ChangePasswordButton',
                type: 'button',
                label: 'Change Password',
                css: {
                    height: 50,
                    width: 150,
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
                }
            }
        }
    ]
})

passwordResetForm.render().then(function (cmpInstance) {
    $('#root').append(cmpInstance.$el)
})

export { passwordResetForm }