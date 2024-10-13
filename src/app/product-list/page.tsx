// 'use client'

// import React, { useRef, useState } from 'react';
// // import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../../redux/api/productsApi';
// import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../../redux/apiSlice';
// import { ToastContainer, toast } from 'react-toastify';
// import Image from 'next/image';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import 'react-toastify/dist/ReactToastify.css';

// const ProductList = () => {
//   const [modal, setModal] = useState(false);
//   const toggle = () => setModal(!modal);

//   // Redux hooks for RTK Query
//   const { data: dataList, isLoading, error } = useGetProductsQuery();
//   const [createProduct] = useCreateProductMutation();
//   const [deleteProduct] = useDeleteProductMutation();

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   // Handle form submission to add a product
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!image || !description || !title) {
//       return toast.error('All fields are required');
//     }

//     const formData = new FormData();
//     formData.append('file', image);
//     formData.append('description', description);
//     formData.append('title', title);

//     try {
//       await createProduct(formData).unwrap();
//       toast.success('Product added successfully!');
//       setTitle('');
//       setDescription('');
//       setImage(null);
//       fileInputRef.current!.value = '';
//       setModal(false);
//     } catch (error) {
//       toast.error('Failed to add product');
//     }
//   };

//   // Handle product deletion
//   const handleDelete = async (id: string) => {
//     if (confirm('Are you sure you want to delete this item?')) {
//       try {
//         await deleteProduct(id).unwrap();
//         toast.success('Product deleted successfully');
//       } catch (error) {
//         toast.error('Failed to delete product');
//       }
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching data</div>;

//   return (
//     <>
//       <ToastContainer />
//       <Modal isOpen={modal} fade={false} toggle={toggle}>
//         <ModalHeader toggle={toggle}>Add Product</ModalHeader>
//         <form encType="multipart/form-data" onSubmit={handleSubmit}>
//           <ModalBody>
//             <div className="col">
//               <input
//                 type="file"
//                 className="form-control"
//                 ref={fileInputRef}
//                 onChange={(e) => setImage(e.target.files?.[0] || null)}
//                 required
//               />
//               <input
//                 type="text"
//                 className="form-control mt-3"
//                 placeholder="Enter Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//               />
//               <textarea
//                 className="form-control mt-3"
//                 placeholder="Enter Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 required
//               ></textarea>
//             </div>
//           </ModalBody>
//           <ModalFooter>
//             <Button type="submit" color="primary">Submit</Button>
//           </ModalFooter>
//         </form>
//       </Modal>

//       <div className="container">
//         <button className="btn btn-primary" onClick={toggle}>Add Product</button>
//         <table className="table table-striped mt-4">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Image</th>
//               <th>Title</th>
//               <th>Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dataList?.map((item, index) => (
//               <tr key={item._id}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <img src={item.product_img || '/images/placeholder.png'} alt={item.title} width={50} height={50} />
//                 </td>
//                 <td>{item.title}</td>
//                 <td>{item.description}</td>
//                 <td>
//                   <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default ProductList;


import Link from "next/link"

const ProductList = () => {
    
    return (
        <>
            <div className="container">

                <div className="card mt-5 mb-5">

                    <div className="card-header"> <span>   Product List</span>
                        <span>
                            <Link href="/add-product" >
                                <button type="button" className="btn btn-outline-primary  float-end"> Add Product </button>
                            </Link>
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
                                <tr>
                                    <th scope="row">1</th>
                                    <td> Image </td>
                                    <td>Mark</td>
                                    <td>Otto</td>

                                    <td> <Link href={'/edit-product'}> <button type="button" className="btn btn-outline-warning btn-sm">Edit</button> </Link> </td>
                                    <td> <button type="button" className="btn btn-outline-danger btn-sm">Delete</button></td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td> Image </td>
                                    <td>Mark</td>

                                    <td>@mdo</td>
                                    <td> <Link href={'/edit-product'}> <button type="button" className="btn btn-outline-warning btn-sm">Edit</button> </Link> </td>
                                    <td> <button type="button" className="btn btn-outline-danger btn-sm">Delete</button></td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td> Image </td>

                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td> <Link href={'/edit-product'}> <button type="button" className="btn btn-outline-warning btn-sm">Edit</button> </Link> </td>
                                    <td> <button type="button" className="btn btn-outline-danger btn-sm">Delete</button></td>
                                </tr>
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