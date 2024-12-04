// const Analytics = () => {
//     return (
//         <div><h1>Analytics</h1></div>
//     )
// }

// export default Analytics;

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data
const data = [
  { name: 'January', users: 400, courses: 240 },
  { name: 'February', users: 300, courses: 139 },
  { name: 'March', users: 200, courses: 980 },
  { name: 'April', users: 278, courses: 390 },
  { name: 'May', users: 189, courses: 480 },
  { name: 'June', users: 239, courses: 380 },
];

const Analytics = () => {
  return (
    <div>
      <h2>Analytics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" />
          <Line type="monotone" dataKey="courses" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Analytics;
