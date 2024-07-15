import { Button } from "../../components/Button/Button.js"
import { Container } from "../../components/Container.js"
import { Link } from "../../components/Link/Link.js";
import { TextInput } from "../../components/TextInput/TextInput.js"

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
            placeholder: 'Password',
        }
    },
    {
        ctor: Link,
        props: {
            id: 'passwordResetLink',
            label: 'Forgot Password',
            href: './passwordReset.html',
        }
    },
    {
        ctor: Button,
        props: {
            id: 'logInButton',
            type: 'button',
            label: 'Log In',
            css: {
                height: 50,
                width: 150,
            },
            click: function() {
                let email = myLoginForm.email.value;
                let password = myLoginForm.password.value;

                let users = JSON.parse(localStorage.getItem('users')) || [];
                let user = users.find(user => user.email === email && user.password === password);

                if(user) {
                    console.log("Successfully logged in");
                    location.href = './displayUsers.html';
                } else {
                    console.log("Failed to log in");
                }
            }
        }
    }
]
})

myLoginForm.render().then(function (cmpInstance){
    $('#root').append(cmpInstance.$el)
})

export {myLoginForm}