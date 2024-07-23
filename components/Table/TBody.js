/**
 * This is a TBody Element
 * 
 * 
 */

import { Parent } from "/obvia/components/base/Parent.js";
import { ObjectUtils } from "/obvia/lib/ObjectUtils.js";
import { DependencyContainer } from "/obvia/lib/DependencyContainer.js";

var TBody = function (_props)
{

    let _beforeAttach = this.beforeAttach;
    this.beforeAttach = function (e)
    {
        if (e.target.id == this.domID)
        {
            if (typeof _beforeAttach == 'function')
                _beforeAttach.apply(this, arguments);
        }
    };

    this.afterAttach = function (e)
    {
        if (e.target.id == this.domID)
        {
        }
    };
    this.template = function ()
    {
        return "<tbody id='" + this.domID + "'></tbody>";
    };

    let _defaultParams = {
    };
    ObjectUtils.fromDefault(_defaultParams, _props);
    //_props = ObjectUtils.extend(false, false, _defaultParams, _props);

    let r = Parent.call(this, _props);
    return r;
};
TBody.prototype.ctor = 'TBody';
DependencyContainer.getInstance().register("TBody", TBody, DependencyContainer.simpleResolve);
export
{
    TBody
};