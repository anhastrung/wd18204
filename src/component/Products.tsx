import { IProduct } from "../interfaces/IProduct"

type Props = {
    item: IProduct
}

const Products = (props: Props) => {
    return (
        <div className="item">
            <div className="image">
                <img src={props.item.image} alt={props.item.title} />
            </div>
            <div className="text">
                <h4>{props.item.title}</h4>
                <p>{props.item.content}</p>
                <div className="bar">
                    <span>{props.item.date}</span>
                    <a href="#">Read more</a>
                </div>
            </div>
        </div>
    )
}

export default Products