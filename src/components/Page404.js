import React from 'react';

export const Page404 = ({ location }) => (
    <div>
       <h2>No match found for <code>{location.pathname}</code></h2>
    </div>
 );