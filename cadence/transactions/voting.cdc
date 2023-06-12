import MajorityVoting from 0x0487e1d4223c8002

transaction {

  prepare(acct: AuthAccount) {

    // Create an instance of the ProposalManager resource
    let proposalManagerRef = acct.borrow<&MajorityVoting.ProposalManager>(from: /storage/VotingAdmin)
    if proposalManagerRef == nil {
      panic("ProposalManager resource not found")
    }

    // Create a new proposal
    proposalManagerRef!.createProposal(name: "Should we deploy to the new blockchain", options: ["Yes", "No", "Yes with veto"])
    // Get the list of proposals

    // Print the proposals

    // Issue a ballot to a user
    let proposalIndex = 0
    let ballot <- proposalManagerRef!.issueBallot(proposalIndex: proposalIndex)
    if ballot == nil {
      panic("Failed to issue ballot")
    }

    // Cast a vote using the ballot
    let ballotRef <- ballot
    proposalManagerRef!.castVote(ballot: <-ballotRef, optionIndex: 2)

    //Change name 
    let proposal = proposalManagerRef!.changeName(proposalIndex: proposalIndex, names: "New name for proposal")
    log("Proposal Name:")
    log(proposal.name)
    log("Options:")
    log(proposal.options)

    // Calculate the result for the proposal
    let result = MajorityVoting.calculateResult(proposalIndex: proposalIndex)

    // Print the result
    for option in result.keys {
      log("Option:")
      log(option)
      log("Votes:")
      log(result[option])
    }

    let proposals = MajorityVoting.getProposals()

    // Print the proposals
    for proposa in proposals {
      log("Proposal Name:")
      log(proposa.name)
      log("Options:")
      log(proposa.options)
    }
  }
}
