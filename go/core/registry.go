package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewActivityEntityFunc func(client *BoredSDK, entopts map[string]any) BoredEntity

