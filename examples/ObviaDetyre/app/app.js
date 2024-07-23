import { ViewStack } from "/obvia/components/base/ViewStack.js";
import { App } from "/obvia/components/base/App.js";
import uiRoute from "/obvia/examples/ObviaDetyre/routes/uiRoute.js";
import { BrowserManager } from "/obvia/lib/BrowserManager.js";
import { LocalizationManager } from "/obvia/lib/LocalizationManager.js";
import { get } from "/obvia/lib/my.js";

const _initDP = async function () {
    console.log("Initializing dataPromise");
    return Promise.resolve();
}

let Context = {};
Context.localizationManager = new LocalizationManager({
    selectedLocale: {
        displayLanguage: "English",
        localeString: "en_US",
    },
    fetchPromise: function (p) {
        let fp = get(
            BrowserManager.getInstance().base +
            "/obvia/examples/Translation/" +
            p.localeString +
            ".json",
            "application/json"
        );
        return fp.then((r) => {
            return JSON.parse(r.response);
        });
    },  
});

// const appletConfig = {
//     url: '/obvia/examples/Obvia-Detyre/applets/registration/',
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
    },
    {
        url: '/obvia/examples/ObviaDetyre/applets/login/',
        anchor: "login",
        // dataPromise: _initDP,
        port: "viewStack",
        uiRoute: uiRoute,
        attr: {
            viewStackIndex: 0,
        }
    },
    {
        url: '/obvia/examples/ObviaDetyre/applets/table/',
        anchor: "table",
        // dataPromise: _initDP,
        port: "viewStack",
        uiRoute: uiRoute,
        attr: {
            viewStackIndex: 0,
        }
    },
    {
        url: '/obvia/examples/ObviaDetyre/applets/edit/',
        anchor: "edit",
        // dataPromise: _initDP,
        port: "viewStack",
        uiRoute: uiRoute,
        attr: {
            viewStackIndex: 0,
        }
    },
    {
        url: '/obvia/examples/ObviaDetyre/applets/passwordReset/',
        anchor: "passwordReset",
        // dataPromise: _initDP,
        port: "viewStack",
        uiRoute: uiRoute,
        attr: {
            viewStackIndex: 0,
        }
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
});


app.render().then(function (cmpInstance) {
    $(document.body).append(cmpInstance.$el);
    console.log('App rendered successfully:', cmpInstance);
}).catch(function (err) {
    console.error('Error during app render:', err);
});

export { app };
