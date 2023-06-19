import React from 'react';
import { getSession, useSession } from "next-auth/react";
import Header from '../components/Header';
import db from '../../firebase';
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import moment from "moment";
import Order from '../components/Order';

const Orders = ({ orders }) => {
    const { data: session, status, update } = useSession();

    // console.log(orders);

    return (
        <div>
            <Header />

            <main className='max-w-screen-lg mx-auto p-10'>
                <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Your Orders</h1>

                {session ? (
                    <h2>{orders.length} orders</h2>
                ) : (
                    <h2>Please sign in to see your orders</h2>
                )}

                <div className="mt-5 space-y-4">
                    {orders?.map(({ id, amount, amountShipping, items, timestamp, images }) => (
                        <Order
                            key={id}
                            id={id}
                            amount={amount}
                            amountShipping={amountShipping}
                            items={items}
                            timestamp={timestamp}
                            images={images}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Orders;


export async function getServerSideProps(context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    //Get the users logged in credentials...
    const session = await getSession(context);

    if (!session) {
        return {
            props: {},
        };
    }

    // Firebase db
    const stripeOrdersRef = collection(db, "users", session.user.email, "orders");
    const orderedStripeOrdersQuery = query(stripeOrdersRef, orderBy("timestamp", "desc"));
    const stripeOrdersSnapshot = await getDocs(orderedStripeOrdersQuery);

    console.log("=====   enter 3");
    // Stripe orders
    const orders = await Promise.all(
        stripeOrdersSnapshot.docs.map(async (order) => {
            const orderId = order.id;
            const orderData = order.data();
            const orderTimestamp = moment(orderData.timestamp.toDate()).unix();

            const lineItems = (
                await stripe.checkout.sessions.listLineItems(orderId, {
                    limit: 100,
                })
            ).data;

            return {
                id: orderId,
                amount: orderData.amount,
                amountShipping: orderData.amount_shipping,
                images: orderData.images,
                timestamp: orderTimestamp,
                items: lineItems,
            };
        })
    );

    return {
        props: {
            orders,
        }
    }
}