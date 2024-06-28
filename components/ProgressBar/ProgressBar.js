import { Container } from "/obvia/components/Container.js";
import { ObjectUtils } from "/obvia/lib/ObjectUtils.js";
import { DependencyContainer } from "/obvia/lib/DependencyContainer.js";
var ProgressBar = function (_props) {

    let _label,_valueNow,_valueMin,_valueMax;
    
    Object.defineProperty(this, "label",
    {
        get:function label()
        {
            return _label;
        },
        set:function label(v)
        {
            if(_label !=v){
                _label=v;
                if(_progressBar.$el)
                    _progressBar.$el.html(v);
            }
        }
    });
   
    Object.defineProperty(this, "valueNow",
    {
        get:function valueNow()
        {
            return _valueNow;
        },
        set:function valueNow(v)
        {
            if(_valueNow !=v)
            {
                _valueNow =v;
                if(_valueNow ){
                    if(_progressBar.$el)
                    {
                        _progressBar.$el.attr('valueNow', _valueNow);
                        _progressBar.width = _valueNow+"%";
                    }
                }else
                {
                    if(_progressBar.$el){
                        _progressBar.$el.removeAttr('valueNow');
                        _progressBar.width = 0;
                    }
                }
            }
        }
    });

    Object.defineProperty(this, "valueMin",
    {
        get:function valueMin()
        {
            return _valueMin;
        },
        set:function valueMin(v)
        {
            if(_valueMin !=v)
            {
                _valueMin =v;
                if(_valueMin){
                    if(_progressBar.$el)
                    {
                        _progressBar.$el.attr('valueMin', _valueMin);
                    }
                }else
                {
                    if(_progressBar.$el){
                        _progressBar.$el.removeAttr('_valueMin');
                    }
                }
            }
        }
    });

    Object.defineProperty(this, "valueMax",
    {
        get:function valueMax(){
            return _valueMax;
        },
        set:function valueMax(v)
        {
            if(_valueMax!=v){
                _valueMax=v;
                if(_valueMax){
                    if(_progressBar.$el){
                        _progressBar.$el.attr('valueMax', _valueMax);
                    }
                }else
                {
                    if(_progressBar.$el)
                    {
                        _progressBar.$el.removeAttr('_valueMax');
                    }                
                }
            }
        }
    });
    
    Object.defineProperty(this, "progressBar",
    {
        get:function progressBar(){
            return _progressBar;
        },
        enumerable:false
    });

    let _progressBar;
    let _pbBeforeAttach = function(e){
        _progressBar = this;
        if (_props.label)
            this.label = _props.label;
        if (_props.valueNow)
            this.valueNow = _props.valueNow;
        if (_props.valueMin)
            this.valueMin = _props.valueMin;
        if (_props.valueMax)
            this.valueMax = _props.valueMax;
    }

    let _defaultParams = {
        label: "",
        valueNow: 25,
        valueMin: 0,
        valueMax: 100,
        classes: ["progress"],
        type: "",
        components: [
            {
                ctor: Container,
                props: {
                    id: "progressBar",
                    classes: [ProgressBarStyle.PROGRESS],
                    type: "",
                    role: "progressbar",
                    beforeAttach: _pbBeforeAttach
                }
            }
        ]
    };
    ObjectUtils.fromDefault(_defaultParams, _props);
    //_props = ObjectUtils.extend(false,false,_defaultParams,_props);
    Container.call(this, _props);
};
DependencyContainer.getInstance().register("ProgressBar", ProgressBar, DependencyContainer.simpleResolve);
ProgressBar.prototype.ctor = 'ProgressBar';
var ProgressBarStyle =
{
    "PROGRESS": "progress-bar",
    "PROGRESS_STRIPED": "progress-bar-striped ",
    "PROGRESS_ANIMATED": "progress-bar-animated"
};
export {
    ProgressBar, ProgressBarStyle
};