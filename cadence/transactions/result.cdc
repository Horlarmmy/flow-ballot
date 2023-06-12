import MajorityVoting from 0x0487e1d4223c8002

transaction {

  prepare(acct: AuthAccount) {
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
