const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLInt
} = require('graphql')
let { candidates, companies } = require('./dummy-data')

const CandidateType = new GraphQLObjectType({
  name: 'Candidate',
  description: 'A single Candidate',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    address: { type: GraphQLString },
    age: { type: GraphQLInt },
    available: { type: GraphQLNonNull(GraphQLBoolean) },
    companyId: { type: GraphQLNonNull(GraphQLInt) },
    company: {
      type: CompanyType,
      resolve: (candidate) => {
        return companies.find(company => company.id === candidate.companyId)
      }
    }
  })
})

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  description: 'A single Company',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    phone: { type: GraphQLString },
    country: { type: GraphQLString },
    level: { type: GraphQLInt },
    hiring: { type: GraphQLNonNull(GraphQLBoolean) },
    candidates: {
      type: GraphQLList(CandidateType),
      resolve: (company) => {
        return candidates.filter(candidate => candidate.companyId === company.id)
      }

    }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    candidates: {
      type: new GraphQLList(CandidateType),
      description: 'List of Candidates',
      args: {
        companyId: { type: GraphQLInt }
      },
      resolve: (parents, args) => {
        if (args.companyId) {
          return candidates.filter(candidate => candidate.companyId === args.companyId)
        } else {
          return candidates
        }
      }
    },
    candidate: {
      type: CandidateType,
      description: 'Get one candidate',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        return candidates.find(candidate => candidate.id === args.id)
      }
    },
    companies: {
      type: new GraphQLList(CompanyType),
      description: 'List of Companies',
      resolve: (parent, args) => {
        return companies;
      }
    },
    company: {
      type: CompanyType,
      description: 'Get one company',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        return companies.find(company => company.id === args.id)
      }
    }
  }
})

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  description: 'Root Mutation',
  fields: () => ({
    addCandidate: {
      type: GraphQLList(CandidateType),
      description: 'Add a Candidate',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
        available: { type: GraphQLNonNull(GraphQLBoolean) },
        companyId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const candidate = {
          id: candidates.length + 1,
          name: args.name,
          email: args.email,
          address: args.address,
          age: +args.age,
          available: args.available,
          companyId: +args.companyId
        }
        candidates.push(candidate);
        return candidates;
      }
    },
    deleteCandidate: {
      type: GraphQLList(CandidateType),
      description: 'Delete a Candidate',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        candidates = candidates.filter(candidate => candidate.id !== args.id);
        return candidates;
      }
    },
    updateCandidate: {
      type: GraphQLList(CandidateType),
      description: 'Update candidate.',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
        available: { type: GraphQLNonNull(GraphQLBoolean) },
      },
      resolve: (parent, args) => {
        candidates.forEach((candidate, index) => {
          if (candidate.id === args.id) {
            candidates[index].name = args.name
            candidates[index].email = args.email
            candidates[index].address = args.address
            candidates[index].age = +args.age
            candidates[index].available = args.available
          }
        })
        return candidates;
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});