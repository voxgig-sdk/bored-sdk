# Bored SDK configuration

module BoredConfig
  def self.make_config
    {
      "main" => {
        "name" => "Bored",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://www.boredapi.com/api",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "activity" => {},
        },
      },
      "entity" => {
        "activity" => {
          "fields" => [
            {
              "name" => "accessibility",
              "req" => true,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "activity",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "key",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "link",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "participant",
              "req" => true,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "price",
              "req" => true,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "type",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 6,
            },
          ],
          "name" => "activity",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "maxaccessibility",
                        "orig" => "maxaccessibility",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "maxprice",
                        "orig" => "maxprice",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "minaccessibility",
                        "orig" => "minaccessibility",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "minprice",
                        "orig" => "minprice",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "participant",
                        "orig" => "participant",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "type",
                        "orig" => "type",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/activity",
                  "parts" => [
                    "activity",
                  ],
                  "select" => {
                    "exist" => [
                      "maxaccessibility",
                      "maxprice",
                      "minaccessibility",
                      "minprice",
                      "participant",
                      "type",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/activity/{key}",
                  "parts" => [
                    "activity",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "key" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    BoredFeatures.make_feature(name)
  end
end
