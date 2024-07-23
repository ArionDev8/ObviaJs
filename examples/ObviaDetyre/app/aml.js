

import { rjs } from "/obvia/lib/rjs.js";
import { Container } from "../../../components/Container.js";
import { DropDown } from "../../../components/DropDown/DropDown.js";
import { TextInput } from "../../../components/TextInput/TextInput.js";
import { Button } from "../../../components/Button/Button.js";
import { DataGrid } from "../../../components/DataGrid/DataGrid.js";
import { Label } from "../../../components/Label.js";
import { Repeater } from "../../../components/Repeater/Repeater.js";
import { TCell } from "../../../components/Table/TCell.js";

rjs.define("/obvia/lib/yaml.js", "yaml");
rjs.define("/obvia/examples/ObviaDetyre/app/app.js", "app");   

await import('/obvia/examples/ObviaDetyre/app/app.js');

