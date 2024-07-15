import { Button } from "../../components/Button/Button.js"
import { Container } from "../../components/Container.js"
import { TextInput } from "../../components/TextInput/TextInput.js"

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

let email = getQueryParam('email');
let user = JSON.parse(localStorage.getItem('users')).find(user => user.email === email);

let myEditForm = new Container({
    id: 'formForEdit',
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
            id: 'name',
            type: 'text',
            placeholder: "Name",
            value: user? user.name : '',
        }
    },
    {
        ctor: TextInput,
        props: {
            id: 'email',
            type: 'text',
            placeholder: "Email",
            // disabled: true,
            value: user.email,
        }
    },
    {
        ctor: TextInput,
        props: {
            id: 'password',
            type: 'password',
            placeholder: 'Password',
            value: user.password,
        }
    },
    {
        ctor: Button,
        props: {
            id: 'logInButton',
            type: 'button',
            label: 'Save',
            css: {
                height: 50,
                width: 150,
            },
            click: function() {
                let updatedName = myEditForm.name.value;
                let updatedPassword = myEditForm.password.value;

                let users = JSON.parse(localStorage.getItem('users'));
                users = users.map(u => u.email === email ? { name: updatedName, email: u.email, password: updatedPassword } : u);
                localStorage.setItem('users', JSON.stringify(users));
                location.href = './displayUsers.html';
            }
        }
    }
]
})

myEditForm.render().then(function (cmpInstance){
    $('#root').append(cmpInstance.$el)
})

export {myEditForm}