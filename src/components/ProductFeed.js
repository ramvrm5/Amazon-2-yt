import React from 'react'
import Product from './Product'

const ProductFeed = ({ products }) => {
    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52">
            {products?.slice(0, 4).map(({ id, title, description, price, category, image }) => (
                <Product key={id} category={category} id={id} description={description} price={price} image={image} title={title} />
            ))}

            <img className="md:col-span-full" src="https://links.papareact.com/dyz" alt="" />
            <div className="md:col-span-2">
                {products?.slice(4, 5).map(({ id, title, description, price, category, image }) => (
                    <Product key={id} category={category} id={id} description={description} price={price} image={image} title={title} />
                ))}
            </div>

            {products?.slice(5, products.length).map(({ id, title, description, price, category, image }) => (
                <Product key={id} category={category} id={id} description={description} price={price} image={image} title={title} />
            ))}
        </div>
    )
}

export default ProductFeed