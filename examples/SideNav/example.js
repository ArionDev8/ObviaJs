import { SideNav } from "../../components/SideNav/SideNav.js";
import { Link } from "../../components/Link/Link.js";
import { Repeater } from "../../components/Repeater/Repeater.js";
import { ArrayEx } from "../../lib/ArrayEx.js";
import { Color } from "../../components/Color.js";


var mySideNav = new SideNav({
    id: "mySideNav",
    width: 250,
    classes: ["sidenav"],
    components: [{
            ctor: Link,
            props: {
                id: 'fa',
                label: "",
                href: "#",
                target: "",
                classes: ["fas", "fa-times", "closebtn"],
                css:
                {
                    color: 'red'
                }
            }
        },
        {
            ctor: Repeater,
            props: {
                rendering: {
                    direction: 'horizontal',
                },
                components: [{
                    ctor: Link,
                    props: {
                        id: "menuItem",
                        label: "{label}",
                        href: "#",
                        target: "",
                        // "click": click
                    }
                }],
                dataProvider: new ArrayEx([{
                    "label": "Item 1"
                }, {
                    "label": "Item 2"
                }, {
                    "label": "Item 3"
                }])
            }
        }
    ]
});

mySideNav.render().then(function (cmpInstance)
{
  $('#root').append(cmpInstance.$el);
});

export {mySideNav};