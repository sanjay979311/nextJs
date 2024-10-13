"use client"
import Link from "next/link"
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



interface List {
    _id: string;
    title: String,
    description: string;
    product_img: string;
}



const ProductList = () => {
    const [dataList, setDataList] = useState<List[]>([]);
    const [prevImg, setPrevImg] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const router = useRouter();


    useEffect(() => {
        getDataList();
    }, []);

    const getDataList = async () => {
        try {
            const response = await axios.get('/api/products');
            if (response.data) {

                setDataList(response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to fetch data.");
        }
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate input fields
        if (!image) return toast.error("Please upload an image");
        if (!description) return toast.error("Description is required");

        try {
            const data = new FormData();
            data.append('file', image);
            data.append('description', description);
            data.append('title', title);

            const response = await axios.post('/api/products', data);

            // Check server response
            if (!response.data.success) {

                toast.error(response.data.message); // Display error from server
            } else {

                const newItem = response.data.result;
                toast.success(response.data.message); // Success message
                setPrevImg(null);
                setImage(null);
                setTitle("");
                setDescription("");


                setDataList(prevDataList => [...prevDataList, newItem]);
                // getDataList()
                // setTimeout(() => {
                //     router.push('/admin/company-list'); // Redirect after a successful response
                // }, 500);
            }

        } catch (error: any) {
            // Improved error handling
            if (axios.isAxiosError(error) && error.response) {
                // Server responded with a status other than 2xx
                toast.error(error.response.data.message || "An error occurred"); // Display specific error message
            } else {
                // Network error or other error
                toast.error("An unexpected error occurred. Please try again later.");
            }
            console.error('Error:', error);
        }
    };


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                setPrevImg(reader.result as string);
            };
        }
    };

    const handleRemoveImage = () => {
        setPrevImg(null);
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`/api/products/${id}`);
            if (response.status === 200 && response.data.success) {
                getDataList();
                toast.success(response.data.message || "Item deleted successfully");
            }
        } catch (error: any) {

            console.error("Error deleting item:", error);

            // Ensure that error.response exists before trying to access error details
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Failed to delete item.");
            }


        }
    }


    return (
        <>

            <ToastContainer />
            <Modal isOpen={modal} fade={false} toggle={toggle}>

                <ModalHeader toggle={toggle}> Add Product </ModalHeader>
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <ModalBody>

                        <div className="col">
                            {/* File Upload */}
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary">
                                    Upload File
                                    <input
                                        type="file"
                                        className="form-control required d-none"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        required
                                    />
                                </label>
                            </div>

                            {/* Preview uploaded image */}
                            {prevImg && (
                                <div className="mb-3">
                                    <img
                                        src={prevImg}
                                        className="rounded-circle"
                                        alt="Preview"
                                        style={{ maxWidth: '100px' }}
                                    />
                                    <i
                                        className="fa fa-2x fa-times text-danger"
                                        onClick={handleRemoveImage}
                                        style={{ cursor: 'pointer' }}
                                    ></i>
                                </div>
                            )}

                            {/* Title input */}
                            <div className="mb-3">
                                <label className="form-label">Title:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Description input */}
                            <div className="mb-3">
                                <label>Description:</label>
                                <textarea
                                    className="form-control"
                                    rows={5}
                                    placeholder="Enter Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            {/* <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button> */}


                        </div>
                    </ModalBody>
                    <ModalFooter>

                        {/* <Button color="btn btn-primary" onClick={toggle}> */}
                        <Button type="submit" color="btn btn-primary" onClick={toggle} >
                            Submit
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>

            <div className="container">

                <div className="card mt-5 mb-5">

                    <div className="card-header"> <span>   Product List</span>
                        <span>

                            <button type="button" className="btn btn-outline-primary  float-end" onClick={toggle}> Add Product  </button>

                        </span>
                    </div>

                    <div className="card-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Image </th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="" colSpan={2}> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataList && dataList.map((item, i) => {
                                    return (
                                        <>
                                            <tr key={i}>
                                                <th scope="row">{i += 1}</th>
                                                <td>
                                                    {/* <Image
                                                        className="rounded me-2"
                                                        src={!item.product_img ? '/images/placeholder.png' : item.product_img}
                                                        alt={"Gallery Image"}
                                                        width={50}
                                                        height={50}
                                                    />  */}

                                                    <Image
                                                        className="rounded me-2"
                                                        src={!item.product_img ? '/images/placeholder.png' : `/images/${item.product_img}`}

                                                        alt=""
                                                        width={50}
                                                        height={50}
                                                    />
                                                </td>
                                                <td> {item.title}</td>
                                                <td>{item.description}</td>

                                                <td> <Link href={'/edit-product'}> <button type="button" className="btn btn-outline-warning btn-sm">Edit</button> </Link> </td>
                                                <td>
                                                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => {
                                                        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
                                                        if (confirmDelete) {
                                                            handleDelete(item._id);
                                                        }
                                                    }}>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}


                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer">Footer</div>
                </div>


            </div>

        </>
    )
}

export default ProductList