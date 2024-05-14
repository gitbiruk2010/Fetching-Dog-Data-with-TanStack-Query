import React from 'react';
import { useQuery } from '@tanstack/react-query';

function GroupsComponent() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['dogGroups'],
    queryFn: () =>
      fetch('https://dogapi.dog/api/v2/groups')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
          }
          return response.json();
        })
        .then(data => data.data)
        .catch(error => {
          console.error('Error fetching groups:', error);
          throw error;
        }),
  });

  console.log(data); // Log the data to inspect its structure

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;
  if (!data || !Array.isArray(data)) return <p>No groups found or data is not in expected format.</p>;

  return (
    <div>
      <h2>Dog Groups</h2>
      <ul>
        {data.map(group => (
          <li key={group.id}>{group.attributes.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GroupsComponent;
