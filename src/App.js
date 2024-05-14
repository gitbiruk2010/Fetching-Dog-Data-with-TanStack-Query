import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import './App.css';
import BreedsComponent from './components/BreedsComponent';
import BreedDetailsComponent from './components/BreedDetailsComponent';
import FactsComponent from './components/FactsComponent';
import GroupsComponent from './components/GroupsComponent';

const queryClient = new QueryClient();

function BreedsProvider({ children }) {
  const { isLoading, error, data: breeds } = useQuery({
    queryKey: ['dogBreeds'],
    queryFn: () =>
      fetch('https://dogapi.dog/api/v2/breeds')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
          }
          return response.json();
        })
        .then(data => data.data)
        .catch(error => {
          console.error('Error fetching breeds:', error);
          throw error;
        }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;
  if (!breeds || !Array.isArray(breeds)) return <p>No data found or data is not in expected format.</p>;

  const exampleBreedId = breeds[0].id;

  return children({ exampleBreedId });
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BreedsProvider>
        {({ exampleBreedId }) => (
          <div className="App">
            <header className="App-header">
              <h1>Dog API</h1>
              <BreedsComponent />
              <BreedDetailsComponent breedId={exampleBreedId} />
              <FactsComponent />
              <GroupsComponent />
            </header>
          </div>
        )}
      </BreedsProvider>
    </QueryClientProvider>
  );
}

export default App;
