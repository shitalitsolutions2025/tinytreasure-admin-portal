// src/pages/LandingPage.js
import React from 'react';
import './landing.css'; // We'll move the styles here

const LandingPage = () => {
  return (
    <div>
      <header>
        <h1>TinyTreasure</h1>
        <p>Buy, Sell, Donate Baby Products</p>
      </header>
      <main>
        <section>
          <h2>About the App</h2>
          <p>
            TinyTreasure is a baby marketplace app to buy, sell, or donate secondhand baby items — toys, clothes, cradles, strollers and more. Save money, reduce waste, and help new parents!
          </p>
        </section>

        <section className="screenshots">
          <h2>App Preview</h2>
          <img src={require("../Images/ProductList.png")} alt="App Screenshot 1" />
          <img src={require("../Images/SellProduct.png")} alt="App Screenshot 2" />
        </section>

        <section>
          <h2>Contact</h2>
          <p>Email: contact@tinytreasure.app</p>
        </section>

        <section>
          <h2>Policy Links</h2>
          <ul>
            <li><a href="privacy.html">Privacy Policy</a></li>
            <li><a href="terms.html">Terms & Conditions</a></li>
          </ul>
        </section>

        <section>
          <h2>Coming Soon</h2>
          <a href="#" className="button">Play Store</a>
          <a href="#" className="button">App Store</a>
        </section>
      </main>

      <footer>
        &copy; 2025 TinyTreasure. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
