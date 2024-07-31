var uiRouteEdit = async function (applet) {
    if (!applet.attached) {

        let mainContainer;

        if (!mainContainer)

            mainContainer = applet.parentApplet.find("mainContainer");

        mainContainer.removeAllChildren(2);

        applet.css.height = "100%";

        await mainContainer.addChild(applet);

    }

    //BrowserManager.getInstance().pushState(null, "Oxana", "#" + applet.anchor);

};

export default uiRouteEdit;