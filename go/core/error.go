package core

type BoredError struct {
	IsBoredError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewBoredError(code string, msg string, ctx *Context) *BoredError {
	return &BoredError{
		IsBoredError: true,
		Sdk:              "Bored",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *BoredError) Error() string {
	return e.Msg
}
