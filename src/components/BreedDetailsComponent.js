import React from 'react';
import { useQuery } from '@tanstack/react-query';

function BreedDetailsComponent({ breedId }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['breedDetails', breedId],
    queryFn: () =>
      fetch(`https://dogapi.dog/api/v2/breeds/${breedId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
          }
          return response.json();
        })
        .then(data => data.data)
        .catch(error => {
          console.error('Error fetching breed details:', error);
          throw error;
        }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;
  if (!data || typeof data !== 'object') return <p>Breed details not found or data is not in expected format.</p>;

  const { attributes } = data;

  return (
    <div>
      <h2>Breed Details</h2>
      <p>Name: {attributes.name}</p>
      <p>Min Life: {attributes.min_life} years</p>
      <p>Max Life: {attributes.max_life} years</p>
      <p>Description: {attributes.description}</p>
      <p>Hypoallergenic: {attributes.hypoallergenic ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default BreedDetailsComponent;
