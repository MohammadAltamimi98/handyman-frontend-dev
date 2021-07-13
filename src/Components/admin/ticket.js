// export a function(Ticket) and inherit all the props to be used 

export default function Ticket(props) {
  return (
    <article className="ticket">
      <h2>{props.question}</h2>
      <p>Type:{props.type}</p>
      <p>Service: {props.service}</p>
      <p>Time:{new Date(props.created_at).toLocaleDateString()}</p>
      <p>Client Name: {props.clientName}</p>
      <button onClick={() => props.handleClaim(props.id, props.socketId)}>Claim</button>
    </article>
  )
}