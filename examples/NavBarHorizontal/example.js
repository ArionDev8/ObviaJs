import { Image } from "../../components/Image.js";
import { Link } from "../../components/Link/Link.js";
import { Label } from "../../components/Label.js";
import { Button } from "../../components/Button/Button.js";
import { DropDown } from "../../components/DropDown/DropDown.js";
import { ArrayEx } from "../../lib/ArrayEx.js";
import { Container } from "../../components/Container.js";
import { HttpClient } from "../../lib/http/HttpClient.js";


async function initializeNav() {
    try {
        let url = new HttpClient();
        let info = await url.get("https://jsonplaceholder.typicode.com/users", "json");
        let users = info.response;

        let usernames = users.map(user => ({
            id: user.id,
            username: user.username
        }));

        let secondDropdownData = [
            { key: "1", title: "React 7" },
            { key: "1", title: "React 8" },
            { key: "1", title: "React 9" },
            { key: "2", title: "Angular 7" },
            { key: "2", title: "Angular 8" },
            { key: "2", title: "Angular 9" },
            { key: "3", title: "NodeJS 8" },
            { key: "3", title: "NodeJS 8.1" },
            { key: "3", title: "NodeJS 8.2" }
        ];

        let myHorizontalNav = new Container({
            id: "myNav",
            css: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "20px",
                backgroundColor: 'blue',
                maxWidth: "100%"
            },
            components: [{
                ctor: Container,
                props: {
                    components: [{
                        ctor: Image,
                        props: {
                            src: "NavBarHorizontal/images-removebg-preview.png",
                            width: 200,
                            height: 200
                        },
                    },
                    {
                        ctor: Label,
                        props: {
                            label: "KreatX",
                            css: {
                                color: "white"
                            },
                        }
                    },
                    ]
                }
            },
            {
                ctor: Link,
                props: {
                    label: "Go to React Documentation",
                    href: "https://react.dev/",
                    css: {
                        color: "white",
                        textDecoration: 'none'
                    },
                }
            },
            {
                ctor: Button,
                props: {
                    label: "Click",
                    click: function () {
                        myHorizontalNav.css.backgroundColor = 'red';
                    },
                    css: {
                        width: '100px',
                        border: '2px solid black',
                        borderRadius: '5px',
                        fontSize: '20px'
                    }
                },

            },
            {
                ctor: DropDown,
                props: {
                    id: 'dropdown1',
                    valueField: "key",
                    labelField: "title",
                    label: "Drop Down 1",
                    dataProvider: new ArrayEx([
                        { key: "1", title: "React" },
                        { key: "2", title: "Angular" },
                        { key: "3", title: "NodeJS" }
                    ]),
                    change: function () {
                        let currentKey = myHorizontalNav.dropdown1.selectedItem.key;
                        let filteredData = secondDropdownData.filter((d) => d.key === currentKey);
                        myHorizontalNav.dropdown2.dataProvider = new ArrayEx(filteredData);
                    }
                }
            },
            {
                ctor: DropDown,
                props: {
                    id: 'dropdown2',
                    valueField: "key",
                    labelField: "title",
                    label: "Drop Down 2",
                    dataProvider: new ArrayEx(secondDropdownData)

                }
            },
            {
                ctor: DropDown,
                props: {
                    id: "dropdown3",
                    valueField: "id",
                    labelField: "username",
                    label: "Drop Down 3",
                    dataProvider: new ArrayEx(usernames),
                }
            },
            ]
        });

        myHorizontalNav.render().then(function (cmpInstance) {
            $('#root').append(cmpInstance.$el);
        });

        return myHorizontalNav;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

let myHorizontalNav = await initializeNav();
export { myHorizontalNav };
