package voxgigboredsdk

import (
	"github.com/voxgig-sdk/bored-sdk/core"
	"github.com/voxgig-sdk/bored-sdk/entity"
	"github.com/voxgig-sdk/bored-sdk/feature"
	_ "github.com/voxgig-sdk/bored-sdk/utility"
)

// Type aliases preserve external API.
type BoredSDK = core.BoredSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type BoredEntity = core.BoredEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type BoredError = core.BoredError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewActivityEntityFunc = func(client *core.BoredSDK, entopts map[string]any) core.BoredEntity {
		return entity.NewActivityEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewBoredSDK = core.NewBoredSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
