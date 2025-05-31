import { useState } from "react";
import BgImage from "../../public/bg-image.jpg";
import TextField from '@mui/material/TextField';
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
    let [data, setData] = useState({
        email: "",
        password: ""
    });

    function onChangeHandler(e) {
        setData((prevObj) => {
            return { ...prevObj, [e.target.name]: e.target.value }
        })
    }

    function onSubmitHandler(e) {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_API_PATH}/users/login`, data).then((res) => {
            console.log(res.data);
            setData({
                email: "",
                password: ""
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <form className="flex flex-col justify-center items-center w-full h-screen bg-[url(../../public/bg-image.jpg)] bg-contain" onSubmit={onSubmitHandler} autoComplete="off">
            <div className="form-container bg-[#000000ab] border border-gray-700 px-7 min-h-[300px] py-5 rounded-2xl m-5 text-center flex gap-5 flex-col">
                <h2 className="py-5 px-3 text-white text-center font-bold font-sans text-2xl">Welcome Back on <span className="text-[#af0409] shadow-2xs 2xl sm:text-3xl md:text-4xl whitespace-nowrap">SASM Web...!</span></h2>
                <div>
                    <TextField
                        label="Email"
                        name="email"
                        value={data.email}
                        type="email"
                        onChange={onChangeHandler}
                        className="w-[90%]"
                        variant="outlined"

                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#364153", // default border
                                },
                                "&:hover fieldset": {
                                    borderColor: "#364153", // on hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#364153", // on focus
                                },
                            },
                            input: {
                                color: "white", // text color inside input
                            },
                            label: {
                                color: "white", // label color
                            },
                        }}
                    />
                </div>
                <div>
                    <TextField
                        label="Password"
                        name="password"
                        value={data.password}
                        type="password"
                        onChange={onChangeHandler}
                        className="w-[90%]"
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#364153", // default border
                                },
                                "&:hover fieldset": {
                                    borderColor: "#364153", // on hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#364153", // on focus
                                },
                            },
                            input: {
                                color: "white", // text color inside input
                            },
                            label: {
                                color: "white", // label color
                            },
                        }}
                    />
                </div>
                <div className="text-end pe-5">
                    <button type="submit" className="bg-red-400 text-lg text-white font-semibold border-none rounded-lg py-2 px-3 w-[30%] cursor-pointer "> Submit </button>
                </div>
                <p className="text-lg text-gray-500 py-2">Don't Have a account <Link to="/signup" className="text-blue-500 hover:underline">Signup here.</Link></p>
            </div>

        </form>
    )
}

export default Login;