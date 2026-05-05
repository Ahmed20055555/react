import Header from '../comp/header';
import Footer from '../comp/Footer';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { FaTimes } from "react-icons/fa";


const Signin = () => {

    const schema = z.object({
        email: z
            .string()
            .nonempty("Email is required")
            .email("Invalid email format"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters"),
    });

    const [firebaseError, setFirebaseError] = useState("");
    const [showFormReset, setShowFormReset] = useState(false);

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

    const onSubmit = (data) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;

                console.log(errorCode);

                switch (errorCode) {
                    case "auth/user-not-found":
                        setFirebaseError("Email not found");
                        break;
                    case "auth/email-already-in-use":
                        setFirebaseError("Email already in use");
                        break;
                    case "auth/wrong-password":
                        setFirebaseError("Wrong password");
                        break;
                    case "auth/invalid-email":
                        setFirebaseError("Invalid email");
                        break;
                    default:
                        setFirebaseError(errorCode);
                        break;
                }
            });
    }

    const handleSendReset = (data) => {
        console.log(data);
        sendPasswordResetEmail(auth, data.email)
        .then(() => {
            console.log("Email sent successfully");
            setShowFormReset(false);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    return (
        <>
            <Helmet>
                <title>signin Page</title>
            </Helmet>

            <Header />

            <main>

                {showFormReset ?
                    <form className='form_reset' onSubmit={handleSubmit(handleSendReset)}>
                        <FaTimes onClick={() => setShowFormReset(false)} className='fa-times' />
                        <p className='form_label' >forget email ?</p>
                        <input className='form_input'  {...register("email")} type="text" placeholder='enter your email' />
                        {errors.email && <p className='error'>{errors.email.message}</p>}
                        <button className='form_button'>send</button>
                    </form> : null}


                <form onSubmit={handleSubmit(onSubmit)} >
                    <input placeholder='email :'  {...register("email")} type="text" />
                    {errors.email && <p className='error'>{errors.email.message}</p>}
                    <input placeholder='password :'  {...register("password")} type="password" />
                    {errors.password && <p className='error'>{errors.password.message}</p>}
                    {firebaseError && <p className="error">{firebaseError}</p>}
                    <button type="submit">  Send </button>
                    <div className="form-footer">
                        <p className='Dontaccount' > Don't have an account? <Link to="/signup">Sign up</Link> </p>
                        <p className='forget_password'  onClick={() => setShowFormReset(!showFormReset)} > forget password ? </p>
                    </div>
                </form>
            </main>

            <Footer />
        </>
    );
}

export default Signin;
