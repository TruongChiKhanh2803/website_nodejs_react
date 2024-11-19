// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
// import Footer from './FooterUser';
// import ShopHome from './ShopHome';

// const Home = () => {


//     return (
//         <div>
//             <section className="hero is-primary is-fullheight is-fullwidth">
//                 <div className="hero-body">
//                     <div className="container">
//                         <div className="columns is-centered">
//                             <div className="column is-6-desktop">
//                                 <div className="field mt-5">
//                                     <div className="container">
//                                         <ShopHome />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <Footer />
//         </div>
//     );
// };

// export default Home;
import React from 'react';
import Footer from './FooterUser';
import ShopHome from './ShopHome';

const Home = () => {
    return (
        <div>
            <section className="hero is-fullheight is-fullwidth" style={{ backgroundColor: "#f0f4f7" }}>
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-12">
                                <div className="field mt-5">
                                    <div className="container">
                                        <ShopHome />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;
