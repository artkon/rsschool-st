'use strict';

// --------------------- lib setup ---------------------
const chai = require('../node_modules/chai');
const sinon = require('../node_modules/sinon');
const sinonChai = require('../node_modules/sinon-chai');

chai.use(sinonChai);

global.expect = chai.expect;
global.should = chai.should();

// --------------------- specs setup ---------------------
