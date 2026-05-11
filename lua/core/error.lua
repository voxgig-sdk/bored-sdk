-- Bored SDK error

local BoredError = {}
BoredError.__index = BoredError


function BoredError.new(code, msg, ctx)
  local self = setmetatable({}, BoredError)
  self.is_sdk_error = true
  self.sdk = "Bored"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function BoredError:error()
  return self.msg
end


function BoredError:__tostring()
  return self.msg
end


return BoredError
