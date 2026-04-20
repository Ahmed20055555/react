import Header from '../comp/header';
import Footer from '../comp/Footer';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from "firebase/auth";



const Signup = () => {

    const schema = z.object({
        username: z.string().optional(),
        email: z
            .string()
            .nonempty("Email is required")
            .email("Invalid email format"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters"),
    })
    const [firebaseError, setFirebaseError] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    useEffect(() => {
        console.log("Errors:", errors)
    }, [errors]);

    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (!image) return;

        const objectUrl = URL.createObjectURL(image);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl); // تنظيف مهم 👈
    }, [image]);


    const onSubmit = (data) => {

        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {

                updateProfile(auth.currentUser, {
                    displayName: data.username,
                    photoURL: image ? URL.createObjectURL(image) : null
                }).then(() => {

                    const user = userCredential.user;
                    console.log("user .. ", user);
                    console.log("done");
                    navigate("/");
                }).catch((error) => {

                    const errorCode = error.code;
                    console.log(errorCode);

                });
            })

            .catch((error) => {

                const errorCode = error.code;

                console.log(errorCode);

                switch (errorCode) {
                    case "auth/email-already-in-use":
                        setFirebaseError("Email already in use");
                        break;
                    case "auth/invalid-email":
                        setFirebaseError("Invalid email ");
                        break;
                    case "auth/weak-password":
                        setFirebaseError("Password should be at least 6 characters");
                        break;
                    default:
                        setFirebaseError(errorCode);
                        break;
                }
            });
    }




    return (
        <>
            <Helmet>
                <title>Signup Page</title>
            </Helmet>

            <Header />

            <main>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className='create-account'> create an account </p>
                    <input placeholder='Username' {...register("username")} type="text" />
                    <input placeholder='Email' {...register("email")} type="text" />
                    {errors.email && <p className='error'>{errors.email.message}</p>}
                    <input placeholder='Password' {...register("password")} type="password" />
                    {errors.password && <p className='error'>{errors.password.message}</p>}

                    {preview ? (
                        <div className='preview-container'>
                            <img className='preview-image' src={preview} alt="Preview" />
                            <button
                                className='remove-btn'
                                onClick={() => {
                                    setImage(null);
                                    setPreview(null);
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ) : (
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    )}

                    {firebaseError && <p className="error">{firebaseError}</p>}
                    <button type="submit">  Send </button>
                    <p className='Dontaccount' >Already have an account? <Link to="/login">Login</Link> </p>

                </form >
            </main >

            <Footer />
        </>
    );
}

export default Signup;


