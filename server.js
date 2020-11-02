const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema')
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`))