const ServicePage = () => {
    return (
        <section className="services">
            <div className="container-fluid">
                <div className="service-list">
                    <div className="service-item">
                        <img src="/src/assets/trophy 1.png" className="service__image" />
                        <div className="service-info">
                            <h4 className="service__name font-bold">High Quality</h4>
                            <p className="service__description">crafted from top materials</p>
                        </div>
                    </div>
                    <div className="service-item">
                        <img src="/src/assets/guarantee.png" className="service__image" />
                        <div className="service-info">
                            <h4 className="service__name font-bold">High Quality</h4>
                            <p className="service__description">crafted from top materials</p>
                        </div>
                    </div>
                    <div className="service-item">
                        <img src="/src/assets/shipping.png" className="service__image" />
                        <div className="service-info">
                            <h4 className="service__name font-bold">High Quality</h4>
                            <p className="service__description">crafted from top materials</p>
                        </div>
                    </div>
                    <div className="service-item">
                        <img src="/src/assets/customer-support.png" className="service__image" />
                        <div className="service-info">
                            <h4 className="service__name font-bold">High Quality</h4>
                            <p className="service__description">crafted from top materials</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServicePage