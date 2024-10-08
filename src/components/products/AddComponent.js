import React, {useRef, useState} from 'react';
import {postAdd} from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
    pname: '',
    pdesc: '',
    price: 0,
    files: []
}

// file data 처리 : new FormData() -> POST, PUT

function AddComponent(props) {

    const [product, setProduct] = useState(initState)

    const uploadRef = useRef()

    const [fetching, setFetching] = useState(false)
    const [result, setResult] = useState(false)

    const {moveToList} = useCustomMove()

    // 파일 처리 시 기억할 것 : multipart/form-data 또는 FormData()

    const handleChangeProduct = (e) => {

        product[e.target.name] = e.target.value

        setProduct({...product})

    }

    const handleClickAdd = (e) => {

        console.log(product)

        const formData = new FormData()

        const files = uploadRef.current.files
        console.log(files.length) // 올라간 파일 개수 확인 가능, 해당 부분으로 유효성 설정 가능

        for(let i = 0; i < files.length; i++) {
            formData.append("files", files[i])
        }

        formData.append("pname", product.pname)
        formData.append("pdesc", product.pdesc)
        formData.append("price", product.price)

        console.log(formData)

        setFetching(true)
        postAdd(formData).then(data => {
            setFetching(false)
            setResult(data.result)
        })

    }

    const closeModal = () => {
        setResult(null)
        moveToList({page:1})
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="pname" type={'text'} value={product.pname} onChange={handleChangeProduct}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                    <textarea  className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                               name="pdesc" rows="4" onChange={handleChangeProduct} value={product.pdesc}>{product.pdesc}</textarea>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="price" type={'number'} value={product.price} onChange={handleChangeProduct}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    <input ref={uploadRef}
                           className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           type={'file'} multiple={true}></input>
                </div>
            </div>

            <div className="flex justify-end">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button type="button"
                            className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
                            onClick={handleClickAdd}>ADD</button>
                </div>
            </div>

            {fetching ? <FetchingModal/> : <></>}

            {result ? <ResultModal
                callBackFn={closeModal}
                title={'Product Add Result'}
                content={`${result}번 상품 등록 완료`}></ResultModal> : <></>}

        </div>
    );
}

export default AddComponent;