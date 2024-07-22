import { App } from "/obvia/components/base/App.js";

var _initDP = (function() {
    return Promise.resolve();
})();

//this function will decide where the view will go in the GUI on endDraw
//principles to follow
//a view should be added to one of its parent`s children
var uiRoute = function(applet) {
    //check applet.view.attached if you want to addChild only when its not already
    let _appendTo = "viewStack";
    let viewContainer = applet.parent.find(_appendTo);
    return viewContainer.addChild(applet.view);
};


const app = new App({
    applets: [
        {
            url: "/obvia/examples/LoginAndRegistrationForm/applets/registration/",
            anchor: "registration",
            dataPromise: _initDP,
            uiRoute: uiRoute,
        }
    ],
});

app.render().then(function (cmpInstance) {
    $(document.body).append(cmpInstance.$el);
});

export {app};