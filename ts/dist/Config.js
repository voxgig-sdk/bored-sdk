"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Bored',
        slug: "bored",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://www.boredapi.com/api",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            activity: {},
        }
    };
    entity = {
        "activity": {
            "fields": [
                {
                    "format": "double",
                    "name": "accessibility",
                    "req": true,
                    "short": "Accessibility factor between 0 and 1 (0 being most accessible)",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "activity",
                    "req": true,
                    "short": "Description of the activity",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "key",
                    "req": true,
                    "short": "Unique identifier for the activity",
                    "type": "`$STRING`"
                },
                {
                    "name": "link",
                    "short": "URL link with more information about the activity (may be empty)",
                    "type": "`$STRING`"
                },
                {
                    "name": "participants",
                    "req": true,
                    "short": "Number of participants required",
                    "type": "`$INTEGER`"
                },
                {
                    "format": "double",
                    "name": "price",
                    "req": true,
                    "short": "Price factor between 0 and 1 (0 being free)",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "type",
                    "req": true,
                    "short": "Type of activity",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "activity",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "maxaccessibility",
                                        "orig": "maxaccessibility",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "maxprice",
                                        "orig": "maxprice",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "minaccessibility",
                                        "orig": "minaccessibility",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "minprice",
                                        "orig": "minprice",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "participant",
                                        "orig": "participant",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/activity",
                            "segments": [
                                {
                                    "lit": "activity"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "maxaccessibility",
                                    "maxprice",
                                    "minaccessibility",
                                    "minprice",
                                    "participant",
                                    "type"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "activity"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "key",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/activity/{key}",
                            "rename": {
                                "param": {
                                    "key": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "activity"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "activity",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map