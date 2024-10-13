


// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState, useRef } from 'react';

// const Add = () => {
//     const [prevImg, setPrevImg] = useState<string | null>(null); // Store image preview
//     const [title, setTitle] = useState<string>(''); // Store title input
//     const [description, setDescription] = useState<string>(''); // Store description input
//     const fileInputRef = useRef<HTMLInputElement | null>(null);
//     const [image, setImage] = useState<File | null>(null); // Store selected image file
//     const router = useRouter();

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         // You can add your form submission logic here
//         console.log({ title, description, image });
//         // router.push('/success'); // Uncomment to redirect after submission
//     };

//     const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             setImage(file); // Set selected image file
//             const reader = new FileReader();
//             reader.readAsDataURL(file);

//             reader.onloadend = () => {
//                 setPrevImg(reader.result as string);
//             };
//         }
//     };

//     const handleRemoveImage = () => {
//         setPrevImg(null);
//         setImage(null); // Reset image state
//         if (fileInputRef.current) {
//             fileInputRef.current.value = ''; // Clear the file input
//         }
//     };

//     return (
//         <div className="container">
//             <div className="row mt-5 mb-5">
//                 <div className="col">
//                     <div className="card mb-3">
//                         <div className="card-header">Add Product</div>
//                         <div className="card-body">
//                             <form encType="multipart/form-data" onSubmit={handleSubmit}>
//                                 {/* File Upload */}
//                                 <div className="mb-3">
//                                     <label className="btn btn-outline-secondary">
//                                         Upload File
//                                         <input
//                                             type="file"
//                                             className="form-control required d-none"
//                                             ref={fileInputRef}
//                                             onChange={handleImageChange}
//                                             required
//                                         />
//                                     </label>
//                                 </div>

//                                 {/* Preview uploaded image */}
//                                 {prevImg && (
//                                     <div className="mb-3">
//                                         <img
//                                             src={prevImg}
//                                             className="rounded-circle"
//                                             alt="Preview"
//                                             style={{ maxWidth: '100px' }}
//                                         />
//                                         <i
//                                             className="fa fa-2x fa-times text-danger"
//                                             onClick={handleRemoveImage}
//                                             style={{ cursor: 'pointer' }}
//                                         ></i>
//                                     </div>
//                                 )}

//                                 {/* Title input */}
//                                 <div className="mb-3">
//                                     <label className="form-label">Title:</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         placeholder="Enter Title"
//                                         value={title}
//                                         onChange={(e) => setTitle(e.target.value)}
//                                         required
//                                     />
//                                 </div>

//                                 {/* Description input */}
//                                 <div className="mb-3">
//                                     <label>Description:</label>
//                                     <textarea
//                                         className="form-control"
//                                         rows={5}
//                                         placeholder="Enter Description"
//                                         value={description}
//                                         onChange={(e) => setDescription(e.target.value)}
//                                         required
//                                     ></textarea>
//                                 </div>

//                                 <button type="submit" className="btn btn-primary">
//                                     Submit
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Add;


'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';

const Add = () => {
    const [prevImg, setPrevImg] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        const response = await fetch('/api/products', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log('Product added successfully');
            // router.push('/success');
        } else {
            console.error('Failed to add product');
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

    return (
        <div className="container">
            <div className="row mt-5 mb-5">
                <div className="col">
                    <div className="card mb-3">
                        <div className="card-header">Add Product</div>
                        <div className="card-body">
                            <form encType="multipart/form-data" onSubmit={handleSubmit}>
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

                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;
