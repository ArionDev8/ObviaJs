import { ViewStack } from "/obvia/components/base/ViewStack.js";
import { App } from "/obvia/components/base/App.js";
import uiRoute from "/obvia/examples/MiniSystem/routes/uiRoute.js";
import uiRouteEdit from "/obvia/examples/MiniSystem/routes/uiRouteEdit.js"

const app = new App({
    applets: [
        {
            url: '/obvia/examples/MiniSystem/applets/nav/',
            anchor: 'nav',
            port: 'ViewStack',
            uiRoute: uiRoute,
            attr: {
                viewStackIndex: 1,
            },
            applets: [
                {
                    url: '/obvia/examples/MiniSystem/applets/home/',
                    anchor: 'home',
                    uiRoute: uiRouteEdit,
                },
                {
                    url: '/obvia/examples/MiniSystem/applets/aboutUs/',
                    anchor: 'aboutUs',
                    uiRoute: uiRouteEdit,
                },
                {
                    url: '/obvia/examples/MiniSystem/applets/users/',
                    anchor: 'users',
                    uiRoute: uiRouteEdit,
                },
                {
                    url: '/obvia/examples/MiniSystem/applets/projects/',
                    anchor: 'projects',
                    uiRoute: uiRouteEdit,
                }
            ]
        },
    ],
    components: [
        {
            ctor: ViewStack,
            props: {
                id: "viewStack",
                type: "",
                components: [],
            },
        }
    ],
})

app.render().then(function (cmpInstance) {
    $(document.body).append(cmpInstance.$el);
    console.log('App rendered successfully:', cmpInstance);
}).catch(function (err) {
    console.error('Error during app render:', err);
});

export { app };