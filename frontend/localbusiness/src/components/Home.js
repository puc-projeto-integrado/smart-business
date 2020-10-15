import React from 'react';
import BusinessHighligh from './BusinessHighlight';
import Business from './Business';

const Home = ()=>{
    return (
            <main class="container">
                <div class="row">
                    <div class="col-sm-12 col-md-8  pt-5">
                    <BusinessHighligh />
                    <BusinessHighligh/>
                    </div>

                    <div class="col-4 d-none d-sm-block pt-5">
                        
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                    <h3 class="mt-5">Mais Recentes</h3>
                        <div class="row">
                            <div class="col-md-6 col-sm-12">
                                <Business/>
                            </div>
                            <div class="col-md-6 col-sm-12">
                            <Business/>
                            </div>
                        </div>
                        <div class="container center mt-3 mb-3">
                            <img src="./assets/images/google-ads-1.png" alt=""/>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-sm-12">
                            <Business/>
                            </div>
                            <div class="col-md-6 col-sm-12">
                            <Business/>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 col-sm-12">
                            <Business/>
                            </div>
                            <div class="col-md-6 col-sm-12">
                            <Business/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
    )
}
  
export default Home;