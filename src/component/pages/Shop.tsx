import { useEffect, useState } from "react"
import useHookQuery from "../hooks/useHookQuery"
import { BannerPage, ServicePage } from "./Layout"
import ListProductPage from "./ListProduct"
import PageButton from "./PageButton"

const ShopPage = () => {
    const [category, setCategory] = useState<number>(0)
    const { data: listCategory, isLoading: isLoadingCate } = useHookQuery({ path: 'category' })
    const { data, isLoading, refetch } = useHookQuery({ path: 'products', active: true, category: category })
    // button change page
    const [currentData, setCurrentData] = useState([])
    const [limit, setLimit] = useState<number>(12)
    const [page, setPage] = useState<number>(Number(new URLSearchParams(window.location.search).get('page') || 1))
    const indexOLastRecord = page * limit
    const indexOFirstRecord = indexOLastRecord - limit
    const nPage = Math.ceil(data?.length / limit)
    // end button change page
    useEffect(() => {
        refetch()
        setCurrentData(data?.slice(indexOFirstRecord, indexOLastRecord))
    }, [category, refetch, limit, indexOFirstRecord, indexOLastRecord, data])
    useEffect(() => {
        if (page > nPage) {
            setPage(1)
        }
    }, [page, nPage])
    return (
        <div>
            <BannerPage show={true} limit={limit} setLimit={setLimit} listCategory={listCategory} setCategory={setCategory} isLoadingCate={isLoadingCate} />
            <div className="container pt-12">
                {isLoading ? <div>Loading...</div> : <ListProductPage data={currentData} />}
                {nPage > 1 && <PageButton nPage={nPage} page={page} setPage={setPage} />}
            </div>
            <ServicePage />
        </div>
    )
}

export default ShopPage