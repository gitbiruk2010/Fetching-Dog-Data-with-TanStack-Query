import React from 'react';
import { useQuery } from '@tanstack/react-query';

function FactsComponent() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['dogFacts'],
    queryFn: () =>
      fetch('https://dogapi.dog/api/v2/facts')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
          }
          return response.json();
        })
        .then(data => data.data)
        .catch(error => {
          console.error('Error fetching facts:', error);
          throw error;
        }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;
  if (!data || !Array.isArray(data)) return <p>No facts found or data is not in expected format.</p>;

  return (
    <div>
      <h2>Dog Facts</h2>
      <ul>
        {data.map(fact => (
          <li key={fact.id}>{fact.attributes.body}</li>
        ))}
      </ul>
    </div>
  );
}

export default FactsComponent;
