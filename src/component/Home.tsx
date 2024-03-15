import { useContext, useEffect } from "react"
import { ProductContext } from "../context/ProductContextProvider"
import { IProduct } from "../interfaces/IProduct"
import FooterPage from "./Footer"
import HeaderPage from "./Header"
import axios from "axios"

const HomePage = () => {
    const { products, dispatch } = useContext(ProductContext)
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/products')
                dispatch({ type: 'SET_PRODUCT', payload: data })
            } catch (error) {
                console.error(error)
            }
        })()
    }, [dispatch])
    return (
        <div className="container">
            <HeaderPage />
            <main>
                <div className="banner">
                    <div className="title">
                        <h2>Make better<br />coffee<img src="/src/assets/image 6.png" alt="" /></h2>
                        <p>why learn how to blog?</p>
                    </div>
                    <div className="image">
                        <img src="/src/assets/croods 1.png" alt="" />
                    </div>
                </div>
                <div className="content">
                    <div className="text">
                        <h3>long established</h3>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....</p>
                        <div className="bar">
                            <span>May 20th 2020</span>
                            <a href="#">Read more</a>
                        </div>
                    </div>
                    <div className="image">
                        <img src="/src/assets/image 1.png" alt="" />
                    </div>
                </div>
                <div className="card">
                    {products.value && products.value.map((item: IProduct, index: number) => (
                        <div className="item" key={index}>
                            <div className="image">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="text">
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                                <div className="bar">
                                    <span>{item.date}</span>
                                    <a href="#">Read more</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="content-highlight">
                    <div className="text">
                        <h2>What is Lorem Ipsum?</h2>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution...</p>
                        <div className="bar">
                            <span>May 20</span>
                            <a href="#">Read more</a>
                        </div>
                    </div>
                    <div className="image">
                        <img src="/src/assets/image 7.png" alt="" />
                    </div>
                </div>
                <div className="more">
                    <button><a href="#">See more <i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i></a></button>
                </div>
            </main>
            <FooterPage />
        </div>
    )
}

export default HomePage