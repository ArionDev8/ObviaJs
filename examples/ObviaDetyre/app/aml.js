

import { rjs } from "/obvia/lib/rjs.js";

rjs.define("/obvia/lib/yaml.js", "yaml");
rjs.define("/obvia/examples/ObviaDetyre/app/app.js", "app");   

await import('/obvia/examples/ObviaDetyre/app/app.js');

