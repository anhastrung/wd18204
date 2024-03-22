import FooterPage from '../layout/Footer'
import HeaderPage from '../layout/Header'
import ListProductPage from '../layout/ListProduct'
import './style.css'

const DetailPage = () => {
    return (
        <div className="font-['Poppins']">
            <HeaderPage />
            <section className="nav-bar">
                <div className="container">
                    <ul className="nav-bar-deltail">
                        <li className="nav-bar-item"><a href="" className="nav-bar-link">Home
                        </a></li>
                        <i className="fa-solid fa-chevron-right"></i>

                        <li className="nav-bar-item"><a href="" className="nav-bar-link">Shop
                        </a></li>
                        <i className="fa-solid fa-chevron-right"></i>

                        <li className="nav-bar-item"><a href="" className="nav-bar-link1"> Asgaard sofa</a></li>
                    </ul>
                </div>
            </section>
            <section className="deltail-product">
                <div className="container">
                    <div className="detail-product-list">
                        <div className="detail-product-img">
                            <div className="detail-product-img1">
                                <img src="/src/assets/Mask group1.png" alt="" />
                                <img src="/src/assets/Group 982.png" alt="" />
                                <img src="/src/assets/Group 973.png" alt="" />
                                <img src="/src/assets/Group 964.png" alt="" />
                            </div>
                            <div className="detail-product-img2">
                                <img src="/src/assets/Group 955.png" alt="" />
                            </div>
                        </div>
                        <div className="detail-product-item">
                            <div className="detail-product-heading">
                                <div className="detail-title">
                                    <h2>Asgaard sofa</h2>
                                </div>
                                <div className="detail-price">
                                    <h3>25.000.000đ</h3>
                                </div>
                                <div className="detail-evaluate">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star-half"></i>

                                    <span className="custom-review">5 Customer Review</span>
                                </div>
                                <div className="detail-reviews">
                                    <p className="text-review">Setting the bar as one of the loudest speakers in its className, the
                                        Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear
                                        midrange and extended highs for a sound.
                                    </p>
                                </div>
                                <div className="detail-size">
                                    <h4 className="text-size">Size</h4>
                                    <div className="size">
                                        <button className="size-l">
                                            L
                                        </button>
                                        <button className="size-m">
                                            M
                                        </button>
                                        <button className="size-s">
                                            S
                                        </button>
                                    </div>
                                </div>
                                <div className="detail-color">
                                    <h4 className="text-size">Color</h4>
                                    <div className="color">
                                        <div className="color-purple">
                                            <img src="/src/assets/Rectangle 421.png" alt="" />
                                        </div>
                                        <div className="color-black">
                                            <img src="/src/assets/Rectangle 432.png" alt="" />
                                        </div>
                                        <div className="color-brown">
                                            <img src="/src/assets/Rectangle 443.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="detail-listtocart">
                                    <button className="slots"><span className="remove">-</span><span className="slot">1</span><span
                                        className="add">+</span></button>
                                    <button className="detail-addtocarts">Add To Cart</button>
                                    <button className="detail-compare">Compare</button>
                                </div>
                            </div>
                            <hr className="line-pruduct" />
                            <div className="detail-product-body">
                                <table>
                                    <tr>
                                        <th>SKU</th>
                                        <td>:</td>
                                        <td className="itemss">SS001</td>
                                    </tr>
                                    <tr>
                                        <th>Category</th>
                                        <td>:</td>
                                        <td className="itemss">Sofas</td>
                                    </tr>
                                    <tr>
                                        <th>Tags</th>
                                        <td>:</td>
                                        <td className="itemss">Sofa, Chair, Home, Shop</td>
                                    </tr>
                                    <tr>
                                        <th>Share</th>
                                        <td>:</td>
                                        <td className="icon">
                                            <i className="fa-brands fa-facebook"></i>
                                            <i className="fa-brands fa-twitter"></i>
                                            <i className="fa-brands fa-linkedin"></i>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <hr className="title-line" />
            <section className="detail-information">
                <div className="container">
                    <div className="nav-information">
                        <ul className="nav-informations">
                            <li><a href="" className="text-informations">Description</a></li>
                            <li><a href="" className="text-informations">Additional Information</a></li>
                            <li><a href="" className="text-informations">Reviews [5]</a></li>
                        </ul>
                    </div>
                    <div className="title-information">
                        Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable
                        active stereo speaker takes
                        the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
                        <br />
                        Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage
                        styled engineering. Setting
                        the bar as one of the loudest speakers in its className, the Kilburn is a compact, stout-hearted hero
                        with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both
                        articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal
                        preferences while the guitar-influenced leather strap enables easy and stylish travel.
                    </div>
                    <div className="img-information">
                        <div className="img-information1"><img src="/src/assets/Group 1071.png" alt="" /></div>
                        <div className="img-information2"><img src="/src/assets/Group 1062.png" alt="" /></div>
                    </div>
                </div>
            </section>
            <hr className="title-line" />
            <section className="news">
                <div className="container">
                    <div className="section-heading">
                        <h2 className="section-heading__title">Related Products</h2>
                    </div>
                    <div className="section-body">
                        <ListProductPage />
                        <div className="relate-product-showmore">
                            <button className="btn-showmore">Show More</button>
                        </div>
                    </div>

                </div>
            </section>
            <hr className="title-line" />
            <FooterPage />
        </div>
    )
}
export default DetailPage