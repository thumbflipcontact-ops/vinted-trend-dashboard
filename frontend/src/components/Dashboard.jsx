import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryTable from "./CategoryTable";
import BrandChart from "./BrandChart";

const API_BASE = "http://localhost:5000";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const productsRes = await axios.get(`${API_BASE}/api/products`);
        setProducts(productsRes.data || []);

        const brandsRes = await axios.get(`${API_BASE}/api/brands`);
        setBrands(brandsRes.data || []);
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <h2>Loading Vinted trends…</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Vinted Trend Dashboard</h1>

      <h2>🔥 Trending Brands</h2>
      {brands.length > 0 ? (
        <BrandChart data={brands} />
      ) : (
        <p>No brand data yet (will fill as scraper runs)</p>
      )}

      <h2>📦 Latest Products</h2>
      <CategoryTable products={products} />
    </div>
  );
}
