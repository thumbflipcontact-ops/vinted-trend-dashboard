import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function BrandChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="brand" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#4f46e5" />
      </BarChart>
    </ResponsiveContainer>
  );
}
