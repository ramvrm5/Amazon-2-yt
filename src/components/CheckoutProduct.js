import React from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import Currency from "react-currency-formatter";
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

const CheckoutProduct = ({ id, title, price, rating, description, category, image, hasPrime }) => {

    const dispatch = useDispatch()

    const addItemToBasket = () => {
        const product = {
            id, title, price, rating, description, category, image, hasPrime
        };
        dispatch(addToBasket(product));
    }

    const removeItemFromBasket = () => {
        // Remove item from redux
        dispatch(removeFromBasket({ id }));
    }

    return (
        <div className='grid grid-cols-5'>
            <Image
                src={image}
                width={200}
                height={200}
                objectFit="contain"
                alt=''
            />

            {/* Middle */}
            <div className='col-span-3 mx-5'>
                <p>{title}</p>
                <div className='flex'>{Array(rating).fill().map((_, i) => (
                    <StarIcon key={i} className="h-5 text-yellow-500" />
                ))}
                </div>

                <p className='text-xs my-2 line-clamp-3'>{description}</p>
                <Currency quantity={price} currency='INR' />

                {hasPrime && (
                    <div className='flex items-center space-x-2 -mt-2 mb-2'>
                        <img className='w-12' src="https://variety.com/wp-content/uploads/2018/04/amazon-prime.jpg?w=942" alt="" />
                        <p className='text-xs text-gray-500 py-4'>FREE Next-day Delivery</p>
                    </div>
                )}
            </div>

            {/* Right add/remove buttons */}
            <div className="flex flex-col space-y-2 my-auto justify-end">
                <button className="button" onClick={addItemToBasket}>Add to Basket</button>
                <button className="button" onClick={removeItemFromBasket}>Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct