package = "voxgig-sdk-bored"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/bored-sdk.git"
}
description = {
  summary = "Bored SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["bored_sdk"] = "bored_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
