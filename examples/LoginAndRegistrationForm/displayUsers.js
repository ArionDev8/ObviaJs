import { Table } from "../../components/Table/Table.js";
import { THead } from "../../components/Table/THead.js";
import { Tr } from "../../components/Table/Tr.js";
import { Th } from "../../components/Table/Th.js";
import { Td } from "../../components/Table/Td.js";
import { Label } from "../../components/Label.js";
import { TBody } from "../../components/Table/TBody.js";
import { Button } from "../../components/Button/Button.js";
import { DropDown } from "../../components/DropDown/DropDown.js";
import { ArrayEx } from "../../lib/ArrayEx.js";

let users = JSON.parse(localStorage.getItem('users')) || [];

var myUsersTable = new Container({
    id: 'container',
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
                
            }
        },
        {
            ctor: Table,
            props: {
                css: {
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontFamily: 'Arial, sans-serif',
                    margin: '20px 0',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '5px',
                },
                components: [
                    {
                        ctor: THead,
                        props: {
                            id: 'thead',
                            css: {
                                backgroundColor: '#f2f2f2',
                                borderBottom: '2px solid #ddd',
                            },
                            components: [
                                {
                                    ctor: Tr,
                                    props: {
                                        components: [
                                            {
                                                ctor: Th,
                                                props: {
                                                    css: {
                                                        border: '1px solid #ddd',
                                                        padding: '12px',
                                                        textAlign: 'left',
                                                        fontWeight: 'bold',
                                                        textTransform: 'uppercase',
                                                    },
                                                    components: [
                                                        {
                                                            ctor: Label,
                                                            props: {
                                                                label: "{localizationManager.getLocaleString('Forms','name',localizationManager.selectedLocale)}",
                                                                bindingDefaultContext: Context
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                ctor: Th,
                                                props: {
                                                    css: {
                                                        border: '1px solid #ddd',
                                                        padding: '12px',
                                                        textAlign: 'left',
                                                        fontWeight: 'bold',
                                                        textTransform: 'uppercase',
                                                    },
                                                    components: [
                                                        {
                                                            ctor: Label,
                                                            props: {
                                                                label: "Email",
                                                                bindingDefaultContext: Context
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                ctor: Th,
                                                props: {
                                                    css: {
                                                        border: '1px solid #ddd',
                                                        padding: '12px',
                                                        textAlign: 'left',
                                                        fontWeight: 'bold',
                                                        textTransform: 'uppercase',
                                                    },
                                                    components: [
                                                        {
                                                            ctor: Label,
                                                            props: {
                                                                label: "",
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
                                    components: [
                                        {
                                            ctor: Td,
                                            props: {
                                                css: {
                                                    border: '1px solid #ddd',
                                                    padding: '12px',
                                                    verticalAlign: 'top',
                                                },
                                                components: [{
                                                    ctor: Label,
                                                    props: {
                                                        label: user.name,
                                                    }
                                                }]
                                            }
                                        },
                                        {
                                            ctor: Td,
                                            props: {
                                                css: {
                                                    border: '1px solid #ddd',
                                                    padding: '12px',
                                                    verticalAlign: 'top',
                                                },
                                                components: [{
                                                    ctor: Label,
                                                    props: {
                                                        label: user.email,
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
                                                        label: "{localizationManager.getLocaleString('Forms','editBtn',localizationManager.selectedLocale)}",
                                                        css: {
                                                            height: '40px',
                                                            width: '100%',
                                                            backgroundColor: '#007bff',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '5px',
                                                            cursor: 'pointer',
                                                        },
                                                        click: function() {
                                                            location.href = `./editUser.html?email=${encodeURIComponent(user.email)}`;
                                                        },
                                                        bindingDefaultContext: Context,
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
            },
            
        }
    ]
});

myUsersTable.render().then(function (cmpInstance) {
    $('#root').append(cmpInstance.$el);
});

export { myUsersTable };
