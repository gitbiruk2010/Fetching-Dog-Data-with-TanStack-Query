import React from 'react';
import { useQuery } from '@tanstack/react-query';

function BreedsComponent() {
  const { isLoading, error, data } = useQuery({
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
  if (!data || !Array.isArray(data)) return <p>No data found or data is not in expected format.</p>;

  return (
    <div>
      <h2>Dog Breeds</h2>
      <ul>
        {data.map(breed => (
          <li key={breed.id}>{breed.attributes.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default BreedsComponent;
