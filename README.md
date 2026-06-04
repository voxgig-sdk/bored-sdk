# Bored SDK

Get random activity suggestions to beat boredom, filterable by type, participants, price, and accessibility

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Bored API

The Bored API returns activity suggestions for when you need something to do. The canonical instance is now maintained by [The App Brewery](https://bored-api.appbrewery.com/) as a teaching tool for their students, after the original `boredapi.com` host went offline.

What you get from the API for each activity:

- `activity` — a short description of the thing to do
- `type` — one of `education`, `recreational`, `social`, `charity`, `cooking`, `relaxation`, `busywork`
- `participants` — number of people required
- `price` — relative cost from `0` (free) upward
- `accessibility` — how easy the activity is to do
- `availability`, `duration`, `kidFriendly` — extra qualifiers on the activity
- `link` — optional related URL
- `key` — unique identifier you can use to fetch the same activity again

The mirror documents a rate limit of 100 requests per 15 minutes. No authentication is required.

## Try it

**TypeScript**
```bash
npm install bored
```

**Python**
```bash
pip install bored-sdk
```

**PHP**
```bash
composer require voxgig/bored-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/bored-sdk/go
```

**Ruby**
```bash
gem install bored-sdk
```

**Lua**
```bash
luarocks install bored-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { BoredSDK } from 'bored'

const client = new BoredSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o bored-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "bored": {
      "command": "/abs/path/to/bored-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Activity** | A single suggested thing to do, with descriptive metadata; fetched via `/random`, `/filter?type=...&participants=...`, or `/activity/{key}`. | `/activity` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from bored_sdk import BoredSDK

client = BoredSDK({})


# Load a specific activity
activity, err = client.Activity(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'bored_sdk.php';

$client = new BoredSDK([]);


// Load a specific activity
[$activity, $err] = $client->Activity(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/bored-sdk/go"

client := sdk.NewBoredSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "Bored_sdk"

client = BoredSDK.new({})


# Load a specific activity
activity, err = client.Activity(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("bored_sdk")

local client = sdk.new({})


-- Load a specific activity
local activity, err = client:Activity(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = BoredSDK.test()
const result = await client.Activity().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = BoredSDK.test(None, None)
result, err = client.Activity(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = BoredSDK::test(null, null);
[$result, $err] = $client->Activity(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Activity(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = BoredSDK.test(nil, nil)
result, err = client.Activity(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Activity(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Bored API

- Upstream: [https://bored-api.appbrewery.com/](https://bored-api.appbrewery.com/)

- The original `boredapi.com` service is offline; the canonical replacement is the App Brewery mirror at `https://bored-api.appbrewery.com/`.
- Copyright (c) The App Brewery. No formal open-source licence is published with the mirror; treat the data as courtesy-use for learning and demo projects.
- If you build something public on top of it, credit The App Brewery and link back to the docs.

---

Generated from the Bored API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
