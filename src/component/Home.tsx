import image1 from "../assets/image 1.png"
import croods from "../assets/croods 1.png"
import image6 from "../assets/image 6.png"
import image7 from "../assets/image 7.png"
import Image from "./db"

const HomePage = () => {
    return (
        <main>
            <div className="banner">
                <div className="title">
                    <h2>Make better<br />coffee<img src={image6} alt="" /></h2>
                    <p>why learn how to blog?</p>
                </div>
                <div className="image">
                    <img src={croods} alt="" />
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
                    <img src={image1} alt="" />
                </div>
            </div>
            <div className="card">
                {Image && Image.map(item => (
                    <div className="item">
                        <div className="image">
                            <img src={item.image} alt="" />
                        </div>
                        <div className="text">
                            <h4>{item.title}</h4>
                            <p>{item.content}</p>
                            <div className="bar">
                                <span>May 20th 2020</span>
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
                    <img src={image7} alt="" />
                </div>
            </div>
            <div className="more">
                    <button><a href="#">See more <i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i></a></button>
            </div>
        </main>
    )
}

export default HomePage