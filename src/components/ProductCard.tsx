import React, { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

const ProductCard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/products.json');
      const data: Product[] = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); 

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filtered.length === 0) {
      setError('No product found with the given name.');
    } else {
      setError('');
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className='product-card'>
      <div className='search-section'>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search product by name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p>{error}</p>}

      <div className='products-list'>
        {filteredProducts.map((product) => (
          <div key={product.id} className='product-item'>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <img src={product.image} alt={product.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
