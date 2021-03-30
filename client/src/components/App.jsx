import React, { useState, useEffect } from 'react';
import TimeList from './TimeList.jsx';
import Park from './Park.jsx';
import axios from 'axios';

// class App extends React.Component {
//   constructor(){
//     super();
//     this.state = {parkData: []}
//   }

//   componentDidMount() {
//     axios('http://localhost:3000/parks')
//     .then((results) => {
//       this.setState({parkData: results.data});
//     }).catch((err) => {
//       console.log(err);
//     })
//   }


//   render() {
//     let parkData = Object.entries(this.state.parkData);
//     return (
//       <div className="main">
//         <h1>Park Pack</h1>
//         {parkData.map(park => {
//           <div>
//             <h3>park.name</h3>
//             <TimeList></TimeList>
//           </div>
//         })}
//       </div>
//     );

//   }
// }


export default function App() {
  const url = 'http://localhost:3000/parks';
  const [parks, getParks] = useState([]);


  useEffect(() => {
    getAllParks();
  }, []);
  const getAllParks = () => {
    axios.get(`${url}`)
    .then((response) => {
      const allParks = response.data;
      getParks(allParks);
    })
    .catch(error => console.error(`Err: ${error}`));
  }
  return (
      <div className="main">
        <h1 parks={parks}>Park Pack</h1>
        { parks.map(park => {
          return <Park data={park} key={park.name}/>
        })}
      </div>
    );

}

// export default App;