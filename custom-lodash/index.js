import { _ } from "./lodash";

const globObj = (typeof global !== 'undefined') 
    ? global
    : window;
globObj._ = _;
