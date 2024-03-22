import FooterPage from "../Footer"
import HeaderPage from "../Header"
import './style.css'
const HomePage = () => {
    return (
        <div className="font-['Poppins']">
            <HeaderPage />
            <section className="news">
                <div className="container">
                    <div className="section-heading">
                        <h2 className="section-heading__title">New</h2>
                    </div>
                    <div className="section-body">
                        <div className="product-list">
                            <div className="product-item">
                                <div className="product-image">
                                    <img src="https://picsum.photos/id/10/300/300" alt="" className="product__thumbnail" />
                                    <span className="product-sale">30%</span>
                                </div>
                                <div className="product-info">
                                    <h3 className="product__name">
                                        <a href="" className="product__link">Syltherine</a>
                                    </h3>
                                    <a href="" className="product__category">Stylish cafe chair</a>
                                    <div className="product-price">
                                        <span className="product-price__new">$200</span>
                                        <span className="product-price__old">$300</span>
                                    </div>
                                </div>
                                <div className="product-actions">
                                    <button className="btn product-action__quickview bg-white text-black">Quick View</button>
                                    <button className="btn product-action__addtocart bg-white text-black">Add To Cart</button>
                                    <div className="product-actions-more">
                                        <span className="product-action__share">Share</span>
                                        <span className="product-action__compare mx-3">Compare</span>
                                        <span className="product-action__like">Like</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-item">
                                <div className="product-image">
                                    <img src="https://picsum.photos/id/10/300/300" alt="" className="product__thumbnail" />
                                    <span className="product-new">New</span>
                                </div>
                                <div className="product-info">
                                    <h3 className="product__name">
                                        <a href="" className="product__link">Syltherine</a>
                                    </h3>
                                    <a href="" className="product__category">Stylish cafe chair</a>
                                    <div className="product-price">
                                        <span className="product-price__new">$200</span>
                                        <span className="product-price__old">$300</span>
                                    </div>
                                </div>
                                <div className="product-actions">
                                    <button className="btn product-action__quickview bg-white text-black">Quick View</button>
                                    <button className="btn product-action__addtocart bg-white text-black">Add To Cart</button>
                                    <div className="product-actions-more">
                                        <span className="product-action__share">Share</span>
                                        <span className="product-action__compare mx-3">Compare</span>
                                        <span className="product-action__like">Like</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-item">
                                <div className="product-image">
                                    <img src="https://picsum.photos/id/10/300/300" alt="" className="product__thumbnail" />
                                </div>
                                <div className="product-info">
                                    <h3 className="product__name">
                                        <a href="" className="product__link">Syltherine</a>
                                    </h3>
                                    <a href="" className="product__category">Stylish cafe chair</a>
                                    <div className="product-price">
                                        <span className="product-price__new">$200</span>
                                        <span className="product-price__old">$300</span>
                                    </div>
                                </div>
                                <div className="product-actions">
                                    <button className="btn product-action__quickview bg-white text-black">Quick View</button>
                                    <button className="btn product-action__addtocart bg-white text-black">Add To Cart</button>
                                    <div className="product-actions-more">
                                        <span className="product-action__share">Share</span>
                                        <span className="product-action__compare mx-3">Compare</span>
                                        <span className="product-action__like">Like</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-item">
                                <div className="product-image">
                                    <img src="https://picsum.photos/id/10/300/300" alt="" className="product__thumbnail" />
                                </div>
                                <div className="product-info">
                                    <h3 className="product__name">
                                        <a href="" className="product__link">Syltherine</a>
                                    </h3>
                                    <a href="" className="product__category">Stylish cafe chair</a>
                                    <div className="product-price">
                                        <span className="product-price__new">500.000</span>
                                        <span className="product-price__old">$300</span>
                                    </div>
                                </div>
                                <div className="product-actions">
                                    <button className="btn product-action__quickview bg-white text-black">Quick View</button>
                                    <button className="btn product-action__addtocart bg-white text-black">Add To Cart</button>
                                    <div className="product-actions-more">
                                        <span className="product-action__share">Share</span>
                                        <span className="product-action__compare mx-3">Compare</span>
                                        <span className="product-action__like">Like</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="shop">
                <div className="container">
                    <div className="section-heading">
                        <h2 className="section-heading__title">Shop</h2>
                    </div>
                    <div className="section-body">
                        <div className="shops">
                            <div className="shop-item">
                                <a href="" className="shop__link"><img src="https://picsum.photos/id/12/665/500" alt=""
                                    className="shop__image" /></a>
                            </div>
                            <div className="shop-item">
                                <a href="" className="shop__link"><img src="https://picsum.photos/id/13/665/500" alt=""
                                    className="shop__image" /></a>
                            </div>
                            <div className="shop-item">
                                <a href="" className="shop__link"><img src="https://picsum.photos/id/14/665/500" alt=""
                                    className="shop__image" /></a>
                            </div>
                            <div className="shop-item">
                                <a href="" className="shop__link"><img src="https://picsum.photos/id/15/665/500" alt=""
                                    className="shop__image" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog">
                <div className="container">
                    <div className="section-heading section-blog-heading">
                        <h2 className="section-heading__title">Blog</h2>
                    </div>
                    <div className="section-body">
                        <div className="post-list">
                            <div className="post-item">
                                <div className="post-image">
                                    <a href="">
                                        <img src="https://picsum.photos/id/16/665/250" alt="" className="post__thumbnail" />
                                    </a>
                                </div>
                                <div className="post-info">
                                    <h3 className="post__title">
                                        <a href="" className="post__link">THE ULTIMATE SOFA BUYING GUIDE</a>
                                    </h3>
                                    <p className="post__excerpt">
                                        The versatility of our living space is more crucial than ever.
                                        But buying a sofa might be a difficult undertaking. Your needs
                                        and the size of your living area will determine everything,
                                        However, don’t worry, were are here to help you
                                    </p>
                                    <a href="" className="post__readmore font-medium">Read more</a>
                                </div>
                            </div>
                            <div className="post-item">
                                <div className="post-image">
                                    <a href="">
                                        <img src="https://picsum.photos/id/17/665/250" alt="" className="post__thumbnail" />
                                    </a>
                                </div>
                                <div className="post-info">
                                    <h3 className="post__title">
                                        <a href="" className="post__link">THE ULTIMATE SOFA BUYING GUIDE</a>
                                    </h3>
                                    <p className="post__excerpt">
                                        The versatility of our living space is more crucial than ever.
                                        But buying a sofa might be a difficult undertaking. Your needs
                                        and the size of your living area will determine everything,
                                        However, don’t worry, were are here to help you
                                    </p>
                                    <a href="" className="post__readmore font-medium">Read more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FooterPage />
        </div>
    )
}

export default HomePage