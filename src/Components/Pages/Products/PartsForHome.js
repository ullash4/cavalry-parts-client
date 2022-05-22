import React from 'react'
import useProducts from '../../Hooks/useProducts';
import Loading from '../../Shared/Loading';
import PartsCard from './PartsCard';

function PartsForHome() {
    const [products, isLoading] = useProducts();
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div className="px-10 my-10">
        <h1 className='max-w-xl text-3xl font-bold sm:text-6xl mb-20'>Our Collections</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {products.slice(0,6).reverse().map((product) => (
            <PartsCard key={product._id} product={product}></PartsCard>
          ))}
        </div>
      </div>
    );
}

export default PartsForHome