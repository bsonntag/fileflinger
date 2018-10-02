import './page.css';
import Footer from './footer';
import Header from './header';
import React from 'react';

const Page = ({ children }) => (
  <div className={'Page'}>
    <Header />

    <main className={'Page-content'}>
      {children}
    </main>

    <Footer />
  </div>
);

export default Page;
