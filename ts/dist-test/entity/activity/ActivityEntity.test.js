"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ActivityEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when BORED_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('BORED_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.BoredSDK.test();
        const ent = testsdk.Activity();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.BORED_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'activity.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "double", "name": "accessibility", "req": true, "short": "Accessibility factor between 0 and 1 (0 being most accessible)", "type": "`$NUMBER`", "index$": 0 }, { "active": true, "name": "activity", "req": true, "short": "Description of the activity", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "key", "req": true, "short": "Unique identifier for the activity", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "link", "req": false, "short": "URL link with more information about the activity (may be empty)", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "participants", "req": true, "short": "Number of participants required", "type": "`$INTEGER`", "index$": 5 }, { "active": true, "format": "double", "name": "price", "req": true, "short": "Price factor between 0 and 1 (0 being free)", "type": "`$NUMBER`", "index$": 6 }, { "active": true, "name": "type", "req": true, "short": "Type of activity", "type": "`$STRING`", "index$": 7 }], "id": { "field": "id", "name": "id" }, "name": "activity", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "maxaccessibility", "orig": "maxaccessibility", "reqd": false, "type": "`$NUMBER`", "index$": 0 }, { "active": true, "kind": "query", "name": "maxprice", "orig": "maxprice", "reqd": false, "type": "`$NUMBER`", "index$": 1 }, { "active": true, "kind": "query", "name": "minaccessibility", "orig": "minaccessibility", "reqd": false, "type": "`$NUMBER`", "index$": 2 }, { "active": true, "kind": "query", "name": "minprice", "orig": "minprice", "reqd": false, "type": "`$NUMBER`", "index$": 3 }, { "active": true, "kind": "query", "name": "participant", "orig": "participant", "reqd": false, "type": "`$INTEGER`", "index$": 4 }, { "active": true, "kind": "query", "name": "type", "orig": "type", "reqd": false, "type": "`$STRING`", "index$": 5 }] }, "contract": { "id": "GET /activity", "json": "{\"operationId\":\"getRandomActivity\",\"parameters\":[{\"description\":\"Type of activity (education, recreational, social, diy, charity, cooking, relaxation, music, busywork)\",\"in\":\"query\",\"name\":\"type\",\"required\":false,\"schema\":{\"enum\":[\"education\",\"recreational\",\"social\",\"diy\",\"charity\",\"cooking\",\"relaxation\",\"music\",\"busywork\"],\"type\":\"string\"}},{\"description\":\"Number of participants for the activity\",\"in\":\"query\",\"name\":\"participants\",\"required\":false,\"schema\":{\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Minimum price (0.0 to 1.0)\",\"in\":\"query\",\"name\":\"minprice\",\"required\":false,\"schema\":{\"format\":\"double\",\"maximum\":1,\"minimum\":0,\"type\":\"number\"}},{\"description\":\"Maximum price (0.0 to 1.0)\",\"in\":\"query\",\"name\":\"maxprice\",\"required\":false,\"schema\":{\"format\":\"double\",\"maximum\":1,\"minimum\":0,\"type\":\"number\"}},{\"description\":\"Minimum accessibility (0.0 to 1.0)\",\"in\":\"query\",\"name\":\"minaccessibility\",\"required\":false,\"schema\":{\"format\":\"double\",\"maximum\":1,\"minimum\":0,\"type\":\"number\"}},{\"description\":\"Maximum accessibility (0.0 to 1.0)\",\"in\":\"query\",\"name\":\"maxaccessibility\",\"required\":false,\"schema\":{\"format\":\"double\",\"maximum\":1,\"minimum\":0,\"type\":\"number\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"accessibility\":0.1,\"activity\":\"Learn how to french braid hair\",\"key\":\"4387026\",\"link\":\"\",\"participants\":1,\"price\":0,\"type\":\"education\"},\"schema\":{\"properties\":{\"accessibility\":{\"description\":\"Accessibility factor between 0 and 1 (0 being most accessible)\",\"format\":\"double\",\"type\":\"number\"},\"activity\":{\"description\":\"Description of the activity\",\"type\":\"string\"},\"key\":{\"description\":\"Unique identifier for the activity\",\"type\":\"string\"},\"link\":{\"description\":\"URL link with more information about the activity (may be empty)\",\"type\":\"string\"},\"participants\":{\"description\":\"Number of participants required\",\"type\":\"integer\"},\"price\":{\"description\":\"Price factor between 0 and 1 (0 being free)\",\"format\":\"double\",\"type\":\"number\"},\"type\":{\"description\":\"Type of activity\",\"enum\":[\"education\",\"recreational\",\"social\",\"diy\",\"charity\",\"cooking\",\"relaxation\",\"music\",\"busywork\"],\"type\":\"string\"}},\"required\":[\"activity\",\"type\",\"participants\",\"price\",\"key\",\"accessibility\"],\"type\":\"object\"}}},\"description\":\"Successfully returned a random activity\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"No activity found with the specified parameters\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/activity", "segments": [{ "lit": "activity" }], "select": { "exist": ["maxaccessibility", "maxprice", "minaccessibility", "minprice", "participant", "type"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "key", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /activity/{key}", "json": "{\"operationId\":\"getActivityByKey\",\"parameters\":[{\"description\":\"Unique key identifier for the activity\",\"in\":\"path\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"accessibility\":0.1,\"activity\":\"Learn how to french braid hair\",\"key\":\"4387026\",\"link\":\"\",\"participants\":1,\"price\":0,\"type\":\"education\"},\"schema\":{\"properties\":{\"accessibility\":{\"description\":\"Accessibility factor between 0 and 1 (0 being most accessible)\",\"format\":\"double\",\"type\":\"number\"},\"activity\":{\"description\":\"Description of the activity\",\"type\":\"string\"},\"key\":{\"description\":\"Unique identifier for the activity\",\"type\":\"string\"},\"link\":{\"description\":\"URL link with more information about the activity (may be empty)\",\"type\":\"string\"},\"participants\":{\"description\":\"Number of participants required\",\"type\":\"integer\"},\"price\":{\"description\":\"Price factor between 0 and 1 (0 being free)\",\"format\":\"double\",\"type\":\"number\"},\"type\":{\"description\":\"Type of activity\",\"enum\":[\"education\",\"recreational\",\"social\",\"diy\",\"charity\",\"cooking\",\"relaxation\",\"music\",\"busywork\"],\"type\":\"string\"}},\"required\":[\"activity\",\"type\",\"participants\",\"price\",\"key\",\"accessibility\"],\"type\":\"object\"}}},\"description\":\"Successfully returned the activity\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Activity not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/activity/{key}", "rename": { "param": { "key": "id" } }, "segments": [{ "lit": "activity" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "activity", "name__orig": "activity", "Name": "Activity", "name_": "activity", "name-": "activity", "NAME": "ACTIVITY", "index$": 0 }, { "active": true, "entity": "activity", "key$": "BasicActivityFlow", "kind": "basic", "name": "BasicActivityFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "activity_ref01", "srcdatavar": "activity_ref01_data", "suffix": "_dt0" }, "match": { "id": "activity01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-activity_ref01" } }], "index$": 0 }] }, 'Activity');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let activity_ref01_data = Object.values(setup.data.existing.activity)[0];
        // LOAD
        const activity_ref01_ent = client.Activity();
        const activity_ref01_match_dt0 = {};
        activity_ref01_match_dt0.id = activity_ref01_data.id;
        const activity_ref01_data_dt0 = (await activity_ref01_ent.load(activity_ref01_match_dt0)).data();
        (0, node_assert_1.default)(activity_ref01_data_dt0.id === activity_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/activity/ActivityTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.BoredSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['activity01', 'activity02', 'activity03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'BORED_TEST_ACTIVITY_ENTID': idmap,
        'BORED_TEST_LIVE': 'FALSE',
        'BORED_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['BORED_TEST_ACTIVITY_ENTID'];
    const live = 'TRUE' === env.BORED_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['BORED_TEST_ACTIVITY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.BoredSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.BORED_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ActivityEntity.test.js.map