/*jshint bitwise: false*/
'use strict';

var fs = require('fs');
var path = require('path');

global.NodeWebkit = require('nw.gui');
global.Path = require('path');

global.__dirname = path.dirname(process.execPath).replace(/\\/gi, '/');

global.Overcaster = {};

global.settings = require('./utils/settings-helper');

var expressPort = 9000;
var serverPath = './server/server.js';

global.settings.load(function (err, data) {
    if (err) {
        console.error('Failed to load settings: ' + err);
    } else {
        expressPort = data.port;
    }

    initOvercaster(global.Overcaster, global.NodeWebkit);
});

function initOvercaster(oc, nw) {

    initGlobalVars();
    initWindow();
    initExpressServer();

    console.log(expressPort);

    window.location.href = 'http://localhost:' + expressPort + '/';

    function initGlobalVars() {

        if (!oc.Core) {
            oc.Core = nw.App;
        }

        if (!oc.Args) {
            oc.Args = oc.Core.argv;
        }

        if (!oc.Window) {
            oc.Window = nw.Window.get();
        }

        oc.Debug = !!~oc.Args.indexOf('--debug');
    }

    function initWindow() {
        if (oc.Debug) {
            oc.Window.showDevTools();
        }
        oc.Window.maximize();
    }

    function initExpressServer() {
        if (oc.Debug) {
            return;
        }

        if (!fs.existsSync(serverPath)) {
            console.log('Unable to find internal server files!');
            return;
        }

        var spawn = require('child_process').fork;
        global.Express = spawn('node', [serverPath, expressPort]);

        (function (e, c) {
            e.stdout.on('data', function (data) {
                c.log('[EXPRESS]:', data);
            });

            e.on('exit', function (code) {
                c.log('[EXPRESS]: Exited with code ' + code);
            });

        })(global.Express, console);

        return;
    }

}