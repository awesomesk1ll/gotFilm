import CardItem from "../CardItem/CardItem";
import "./Catalog.css"

const Catalog = (props) => {
  const filmElements = props.state.map((e) => <CardItem key={e.id} title={e.title} descr={e.descr} />)

  return (
    <div className="catalogWrapper">
      {filmElements}
    </div>
  );
};

export default Catalog;
