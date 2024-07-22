import { ViewStack } from "/obvia/components/base/ViewStack.js";
import { App } from "/obvia/components/base/App.js";
import uiRoute from "/obvia/examples/ObviaDetyre/routes/uiRoute.js";

const _initDP = async function () {
    console.log("Initializing dataPromise");
    return Promise.resolve();
}

// const appletConfig = {
//     url: '/obvia/examples/ObviaDetyre/applets/registration/',
//     anchor: "registration",
//     // dataPromise: _initDP,
//     port: "viewStack",
//     uiRoute: uiRoute,
//     attr: {
//         viewStackIndex: 0,
//     }
// };

// console.log('Applet Config:', appletConfig);

const app = new App({
    applets: [{
        url: '/obvia/examples/ObviaDetyre/applets/registration/',
        anchor: "registration",
        // dataPromise: _initDP,
        port: "viewStack",
        uiRoute: uiRoute,
        attr: {
            viewStackIndex: 0,
        }
    }
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
});

console.log('App Instance:', app);

app.render().then(function (cmpInstance) {
    $(document.body).append(cmpInstance.$el);
    console.log('App rendered successfully:', cmpInstance);
}).catch(function (err) {
    console.error('Error during app render:', err);
});

export { app };
