pub contract MajorityVoting {

    // Proposal structure containing name and voting options
    pub struct Proposal {
        pub var name: String
        pub var options: [String]
        pub var votes: {String: Int}

        init(name: String, options: [String]) {
            self.name = name
            self.options = options
            self.votes = {}

            // Initialize vote count for each option to zero
            for option in options {
                self.votes[option] = 0
            }
        }

        pub fun setVotes(_ option: String) {
            log(self.votes[option])
            self.votes[option] = self.votes[option]! + 1
            log(self.votes)
        }

        pub fun setName(_ names: String) {
            self.name = names
        }

        pub fun getVotes(): {String: Int}{
            log(self.votes)
            return self.votes
        }
    }

    // Array of all proposals
    pub var proposals: [Proposal]
    pub fun getProposals(): [Proposal] {
            return MajorityVoting.proposals
        }
    // Resource that represents a ballot issued to a user
    pub resource Ballot {

        // Proposal index user is voting for
        pub let proposalIndex: Int

        init(proposalIndex: Int) {
            self.proposalIndex = proposalIndex
        }
    }

    // Resource that handles proposal-related functionality
    pub resource ProposalManager {

        pub fun createProposal(name: String, options: [String]) {
            let proposal = Proposal(name: name, options: options)
            MajorityVoting.proposals.append(proposal)
        }

        pub fun changeName(proposalIndex: Int, names: String): MajorityVoting.Proposal {
            MajorityVoting.proposals[proposalIndex].setName(names)
            return MajorityVoting.proposals[proposalIndex]
        }

        pub fun issueBallot(proposalIndex: Int): @Ballot {
            return <-create Ballot(proposalIndex: proposalIndex)
        }

        pub fun castVote(ballot: @Ballot, optionIndex: Int) {
        let proposal = MajorityVoting.proposals[ballot.proposalIndex]
        let option = proposal.options[optionIndex]
        //proposal.votes[option] = proposal.votes[option]! + 1
        log(option)
        var p = proposal.votes[option]! + 1
        proposal.setVotes(option)
        destroy ballot
    }
    }

    


    // Function to calculate the result of a proposal based on the votes
    pub fun calculateResult(proposalIndex: Int): {String: Int} {
        let proposal = MajorityVoting.proposals[proposalIndex]
        return proposal.getVotes()
    }

    // Initializes the contract by setting the initial state
    init() {
        self.proposals = []
        self.account.save<@ProposalManager>(<-create ProposalManager(), to: /storage/VotingAdmin)
    }
}