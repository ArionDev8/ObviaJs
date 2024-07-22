let vs;

var uiRoute = async function (applet) {

  if (!applet.attached) {

    if (!vs) vs = applet.parentApplet.find("viewStack");

    await vs.addChild(applet);

    applet.attr.viewStackIndex = Math.max(0, Object.keys(vs.children).length - 1);

  }

  vs.selectedIndex = applet.attr.viewStackIndex;

};

export default uiRoute;