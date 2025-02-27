const OrderIndex = ({ orders }) => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Orders</h1>
      <ul className="list-group">
        {orders.map((order) => {
          return (
            <li key={order.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span className="font-weight-bold">{order.ticket.title}</span>
              <span className={`badge badge-${order.status === 'complete' ? 'success' : 'warning'} badge-pill`}>
                {order.status.toUpperCase()}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default OrderIndex;