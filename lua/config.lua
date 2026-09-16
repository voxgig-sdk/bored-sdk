-- Bored SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Bored",
      slug = "bored",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://www.boredapi.com/api",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["activity"] = {},
      },
    },
    entity = {
      ["activity"] = {
        ["fields"] = {
          {
            ["format"] = "double",
            ["name"] = "accessibility",
            ["req"] = true,
            ["short"] = "Accessibility factor between 0 and 1 (0 being most accessible)",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "activity",
            ["req"] = true,
            ["short"] = "Description of the activity",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "key",
            ["req"] = true,
            ["short"] = "Unique identifier for the activity",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "link",
            ["short"] = "URL link with more information about the activity (may be empty)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "participants",
            ["req"] = true,
            ["short"] = "Number of participants required",
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "double",
            ["name"] = "price",
            ["req"] = true,
            ["short"] = "Price factor between 0 and 1 (0 being free)",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "type",
            ["req"] = true,
            ["short"] = "Type of activity",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "activity",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "maxaccessibility",
                      ["orig"] = "maxaccessibility",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "maxprice",
                      ["orig"] = "maxprice",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "minaccessibility",
                      ["orig"] = "minaccessibility",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "minprice",
                      ["orig"] = "minprice",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "participant",
                      ["orig"] = "participant",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/activity",
                ["segments"] = {
                  {
                    ["lit"] = "activity",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "maxaccessibility",
                    "maxprice",
                    "minaccessibility",
                    "minprice",
                    "participant",
                    "type",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "activity",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/activity/{key}",
                ["rename"] = {
                  ["param"] = {
                    ["key"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "activity",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "activity",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
