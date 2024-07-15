import { Table } from "../../components/Table/Table.js";
import { THead } from "../../components/Table/THead.js";
import { Tr } from "../../components/Table/Tr.js";
import { Th } from "../../components/Table/Th.js";
import { Td } from "../../components/Table/Td.js";
import { Label } from "../../components/Label.js";
import { TBody } from "../../components/Table/TBody.js";
import { Button } from "../../components/Button/Button.js";

let users = JSON.parse(localStorage.getItem('users')) || [];

var myUsersTable = new Table({
    id: 'table',
    css: {
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'Arial, sans-serif',
        margin: '20px 0'
    },
    components: [
        {
            ctor: THead,
            props: {
                id: 'thead',
                css: {
                    backgroundColor: '#f2f2f2',
                },
                components: [
                    {
                        ctor: Tr,
                        props: {
                            components: [
                                {
                                    ctor: Th,
                                    props: {
                                        id: 'th',
                                        css: {
                                            border: '1px solid #ddd',
                                            padding: '8px',
                                            textAlign: 'left'
                                        },
                                        components: [
                                            {
                                                ctor: Label,
                                                props: {
                                                    label: "Name"
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    ctor: Th,
                                    props: {
                                        id: 'th',
                                        css: {
                                            border: '1px solid #ddd',
                                            padding: '8px',
                                            textAlign: 'left'
                                        },
                                        components: [
                                            {
                                                ctor: Label,
                                                props: {
                                                    label: "Email"
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    ctor: Th,
                                    props: {
                                        id: 'th',
                                        css: {
                                            border: '1px solid #ddd',
                                            padding: '8px',
                                            textAlign: 'left'
                                        },
                                        components: [
                                            {
                                                ctor: Label,
                                                props: {
                                                    label: ""
                                                }
                                            }
                                        ]
                                    }
                                },
                            ]
                        }
                    }
                ]
            }
        },
        {
            ctor: TBody,
            props: {
                components: users.map(user => ({
                    ctor: Tr,
                    props: {
                        components: [{
                            ctor: Td,
                            props: {
                                css: {
                                    border: '1px solid #ddd',
                                    padding: '8px'
                                },
                                components: [{
                                    ctor: Label,
                                    props: {
                                        label: user.name
                                    }
                                }]
                            }
                        },
                        {
                            ctor: Td,
                            props: {
                                css: {
                                    border: '1px solid #ddd',
                                    padding: '8px'
                                },
                                components: [{
                                    ctor: Label,
                                    props: {
                                        label: user.email
                                    }
                                }]
                            }
                        },
                        {
                            ctor: Td,
                            props: {
                                components: [{
                                    ctor: Button,
                                    props: {
                                        id: 'editButton',
                                        type: 'button',
                                        label: 'Edit',
                                        css: {
                                            height: 50,
                                            width: '100%',
                                        },
                                        click: function() {
                                            location.href = `./editUser.html?email=${encodeURIComponent(user.email)}`;
                                        }
                                    }
                                }]
                            }
                        },
                        ]
                    }
                }))
            }
        }
    ]
});

myUsersTable.render().then(function (cmpInstance) {
    $('#root').append(cmpInstance.$el);
});

export { myUsersTable }