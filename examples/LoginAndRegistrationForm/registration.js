import { Button } from "../../components/Button/Button.js"
import { Container } from "../../components/Container.js"
import { TextInput } from "../../components/TextInput/TextInput.js"
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
    components: [{
        ctor: TextInput,
        props: {
            id: 'name',
            type: 'text',
            placeholder: 'Name',
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
            placeholder: 'Password',
        }
    },
    {
        ctor: Button,
        props: {
            id: 'registerButton',
            type: 'submit',
            label: 'Register',
            css: {
                height: 50,
                width: 150,
            },
            click: function(e) {
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
            }
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
            click: function(){
                location.href = './login.html';
            }
        }
    }
]
})

myRegistrationForm.render().then(function (cmpInstance){
    $('#root').append(cmpInstance.$el)
})

export {myRegistrationForm}