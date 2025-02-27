const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
import { Card, Button, Alert } from 'react-bootstrap';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id
    },
    onSuccess: () => Router.push("/orders")
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  if (timeLeft < 0) {
    return <Alert variant="danger">Order Expired</Alert>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Order Details</Card.Title>
        <Card.Text>
          Time left to pay: {timeLeft} seconds
        </Card.Text>
        <StripeCheckout
          token={({ id }) => doRequest({ token: id })}
          stripeKey={stripeKey}
          amount={order.ticket.price * 100}
          email={currentUser.email}
        />
        {errors && <Alert variant="danger">{errors}</Alert>}
      </Card.Body>
    </Card>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
}
export default OrderShow;


