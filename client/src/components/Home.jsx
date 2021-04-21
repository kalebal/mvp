import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form.jsx';

export default function Home({ parkLocations, parks }) {
  const mostPopular = Object.values(parks).sort((a, b) => b.totalAttendees - a.totalAttendees);
  return (
    <div className="main">
      <div>

        <h1>Park Pack</h1>
        <h3>Most Popular Today: </h3>
        {mostPopular.map((park) => {
          if (park.totalAttendees > 5) {
            return (
              <div>
                {' '}
                {`${park.name}: ${park.totalAttendees} dogs` }
              </div>
            );
          }
        })}
        {Object.entries(parkLocations).map((location) => (
          <>
            <h3>
              Find a park in
              {location[0]}
            </h3>
            {Object.values(location[1]).map((park) => (
              <>
                <Link
                  to={{ pathname: `/park/${park.id}` }}
                  key={park.id}
                >
                  <div key={park.name}>
                    {' '}
                    {park.name}
                  </div>
                </Link>
              </>
            ))}
          </>
        ))}
      </div>
      <aside>
        <Form />
      </aside>
    </div>
  );
}
