import "./CardItem.css";

const CardItem = (props) => {
    return (
    <div className="cardItem" style={{padding: "10px"}}>
        <h2>{props.title}</h2>
        <p>{props.descr}</p>
    </div>
    )
}

export default CardItem;