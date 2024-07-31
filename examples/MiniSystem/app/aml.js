import { rjs } from "/obvia/lib/rjs.js";
import { Container } from "../../../components/Container.js";
import { List } from "../../../components/List.js";
import { Link } from "../../../components/Link/Link.js";
import { Label } from "../../../components/Label.js";
import { DataGrid } from "../../../components/DataGrid/DataGrid.js";
import { Image } from "../../../components/Image.js";

rjs.define("/obvia/lib/yaml.js", "yaml");
rjs.define("/obvia/examples/MiniSystem/app/app.js", "app");   

import('/obvia/examples/MiniSystem/app/app.js');