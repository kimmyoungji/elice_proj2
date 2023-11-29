import React from 'react';
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const data = [
  {
    "name": "Page A",
    "uv": 4000,
  },
  {
    "name": "Page B",
    "uv": 3000,
  },
  {
    "name": "Page C",
    "uv": 2000,
  },
  {
    "name": "Page D",
    "uv": 2780,
  },
  {
    "name": "Page E",
    "uv": 1890,
  },
  {
    "name": "Page F",
    "uv": 2390,
  },
  {
    "name": "Page G",
    "uv": 3490,
  }
]


export default function Chart() {
  return (
    <BarChart width={600} height={250} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="uv" fill="#82ca9d" /> 
    </BarChart>
  );
}

