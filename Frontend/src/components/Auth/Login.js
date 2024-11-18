import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:6868/login', {
                email: email,
                password: password
            });

            const { accessToken, redirectUrl } = response.data;

            localStorage.setItem('accessToken', accessToken);

            navigate(redirectUrl);
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <section className="hero has-background-grey-light is-fullheight is-fullwidth">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-4-desktop">
                                <form onSubmit={Auth} className="box">

                                    <p className='has-text-centered'>{msg}</p>

                                    <h1 className='columns is-centered mt-2'>ĐĂNG NHẬP</h1>
                                    <div className="field mt-5">
                                        <label className="label">Email</label>
                                        <div className="controls">
                                            <input type="text" className="input" placeholder="Nhập địa chỉ email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="field mt-5">
                                        <label className="label">Mật khẩu</label>
                                        <div className="controls">
                                            <input type="password" className="input" placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="field mt-5">
                                        <button className="button is-success is-fullwidth">Đăng nhập</button>
                                    </div>
                                    <div className="has-text-centered mt-4">
                                        <p>Bạn chưa có tài khoản? <a href="/register" className="has-text-link">Đăng ký</a></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;












// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";


// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [msg, setMsg] = useState('');
//     const navigate = useNavigate();

//     const Auth = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:6868/login', {
//                 email: email,
//                 password: password
//             });
//             navigate("/dashboard");
//         } catch (error) {
//             if (error.response) {
//                 setMsg(error.response.data.msg);
//             }
//         }
//     }
//     return (
//         <div>
//             <section className="hero has-background-grey-light is-fullheight is-fullwidth">
//                 <div className="hero-body">
//                     <div className="container">
//                         <div className="columns is-centered">
//                             <div className="column is-4-desktop">
//                                 <form onSubmit={Auth} className="box">

//                                     <p className='has-text-centered'>{msg}</p>

//                                     <h1 className='columns is-centered mt-2'>ĐĂNG NHẬP</h1>
//                                     <div className="field mt-5">
//                                         <label className="label">Email</label>
//                                         <div className="controls">
//                                             <input type="text" className="input" placeholder="Nhập địa chỉ email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                                         </div>
//                                     </div>

//                                     <div className="field mt-5">
//                                         <label className="label">Mật khẩu</label>
//                                         <div className="controls">
//                                             <input type="password" className="input" placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
//                                         </div>
//                                     </div>

//                                     <div className="field mt-5">
//                                         <button className="button is-success is-fullwidth">Đăng nhập</button>
//                                     </div>
//                                     <div className="has-text-centered mt-4">
//                                         <p>Bạn chưa có tài khoản? <a href="/register" className="has-text-link">Đăng ký</a></p>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default Login;




