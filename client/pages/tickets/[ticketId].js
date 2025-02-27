import useRequest from '../../hooks/use-request';
import Router from 'next/router'
const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id
    },
    onSuccess: (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`)
  })
  return (
    <div className="container">
      <h1 className="my-4">{ticket.title}</h1>
      <h4 className="text-muted">Price: ${ticket.price}</h4>
      {errors && <div className="alert alert-danger my-2">{errors}</div>}
      <button onClick={() => doRequest()} className="btn btn-primary mt-3">Purchase</button>
    </div>
  )
}


TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
}
export default TicketShow;