package main

// Command ...
type Command byte

// Custom blockchain command encoding, lighter-weight than proto
const (
	// SubmitOrderCommand ...
	SubmitOrderCommand Command = 0x40
	// CancelOrderCommand ..
	CancelOrderCommand Command = 0x41
	// AmendOrderCommand ...
	AmendOrderCommand Command = 0x42
	// NotifyTraderAccountCommand ...
	NotifyTraderAccountCommand Command = 0x43
	// WithdrawCommand ...
	WithdrawCommand Command = 0x44
	// ProposeCommand ...
	ProposeCommand Command = 0x45
	// VoteCommand
	VoteCommand Command = 0x46
	// RegisterNodecommand ...
	RegisterNodeCommand Command = 0x47
	// NodeVoteCommand...
	NodeVoteCommand Command = 0x48
	// NodeSignatureCommand..
	NodeSignatureCommand Command = 0x49
	// ChainEventCommand..
	ChainEventCommand Command = 0x50
)

var commandName = map[Command]string{
	SubmitOrderCommand:         "SubmitOrder",
	CancelOrderCommand:         "CancelOrder",
	AmendOrderCommand:          "AmendOrder",
	NotifyTraderAccountCommand: "NotifyTraderAccount",
	WithdrawCommand:            "Withdraw",
	ProposeCommand:             "Proposal",
	VoteCommand:                "VoteOnProposal",
	RegisterNodeCommand:        "RegisterNewNode",
	NodeVoteCommand:            "NodeVote",
	NodeSignatureCommand:       "Node Signature",
	ChainEventCommand:          "Chain Event",
}

// String return the
func (cmd Command) String() string {
	s, ok := commandName[cmd]
	if ok {
		return s
	}
	return ""
}
