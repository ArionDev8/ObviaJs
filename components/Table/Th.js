/**
 * This is a Th Element
 * 
 * 
 */

//component definition
import { TCell } from "/obvia/components/Table/TCell.js";
import { ObjectUtils } from "/obvia/lib/ObjectUtils.js";
import { DependencyContainer } from "/obvia/lib/DependencyContainer.js";


var Th = function (_props)
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
        return "<th id='" + this.domID + "'></th>";
    };

    let _defaultParams = {
    };
    ObjectUtils.fromDefault(_defaultParams, _props);
    //_props = ObjectUtils.extend(false, false, _defaultParams, _props);

    let r = TCell.call(this, _props);
    return r;
};
Th.prototype.ctor = 'Th';
DependencyContainer.getInstance().register("Th", Th, DependencyContainer.simpleResolve);
export
{
    Th
};