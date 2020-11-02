import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import SelectCompany from './screens/SelectCompany';
import CompanyDetails from './screens/CompanyDetails';
import CandidateDetails from './screens/CandidateDetails';
import AddCandidate from './screens/AddCandidate';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/main.css';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <main className="flex justify-center">
          <Switch>
            <Route path='/company/:id/:name' component={CompanyDetails} />
            <Route path='/candidate/add/:companyId' component={AddCandidate} />
            <Route path='/candidate/:id/:name' component={CandidateDetails} />
            <Route exact path='/' component={SelectCompany} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </ApolloProvider >
  );
}

export default App;
