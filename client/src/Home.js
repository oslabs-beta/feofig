import React from 'react';
import Fig from '../../dev/feofig';
import lazyLoadConfig from "./config"
import image from "../public/placeholder.webp"
import './style.scss';

const figs = [
  { id: 1, name: 'Black Mission Figs', description: 'Sweet and densely flavored, perfect for baking and snacking.', imageUrl: 'https://www.melissas.com/cdn/shop/products/1-pound-image-of-black-mission-figs-fruit-28656452010028_600x600.jpg?v=1628114077' },
  { id: 2, name: 'Calimyrna Figs', description: 'Large and nutty, great for jams and preserves.', imageUrl: 'https://askthefoodgeek.com/wp-content/uploads/2021/09/figs-1-1-of-1-1440x1440.jpg' },
  { id: 3, name: 'Brown Turkey Figs', description: 'Mildly sweet with a robust flavor, ideal for fresh eating.', imageUrl: 'https://www.melissas.com/cdn/shop/products/1-pound-image-of-brown-turkey-figs-fruit-30093262946348_600x600.png?v=1650057434' },
  { id: 4, name: 'Kadota Figs', description: 'Less sweet, with a thick skin and creamy texture.', imageUrl: 'https://www.fourwindsgrowers.com/cdn/shop/files/Kadota-fig-tree-primo-size-for-sale_1_1024x1024.jpg?v=1697648295' },
  { id: 5, name: 'Sierra Figs', description: 'Lightly sweet with a nutty flavor, excellent for drying.', imageUrl: 'https://askthefoodgeek.com/wp-content/uploads/2021/09/sierra-green-figs.jpg' },
  { id: 6, name: 'Tiger Figs', description: 'Distinctly striped skin with a rich and spicy flavor.', imageUrl: 'https://m.media-amazon.com/images/I/81EJDd4VNwL.jpg' },
  { id: 7, name: 'Adriatic Figs', description: 'Bright green skin with a sweet and tangy flavor.', imageUrl: 'https://amaranthhome.com/cdn/shop/products/figs_smallest_530x@2x.jpg?v=1499178144' },
  { id: 8, name: 'Panachée Figs', description: 'Striped appearance with a sweet, fruity flavor.', imageUrl: 'https://i.etsystatic.com/26687866/r/il/1628da/4665798420/il_340x270.4665798420_maht.jpg' },
  { id: 9, name: 'Celeste Figs', description: 'Small and sweet, with a smooth, purple skin.', imageUrl: 'https://m.media-amazon.com/images/I/61MYwzAaFqL._AC_UF894,1000_QL80_.jpg' },
  { id: 10, name: 'Desert King Figs', description: 'Large, sweet, and juicy, perfect for fresh eating.', imageUrl: 'https://i0.wp.com/tallcloverfarm.com/wp-content/uploads/2013/10/Ripe-and-Cut-Dessert-King-Figs-.jpg?fit=500%2C350&ssl=1' }
];

const placeholder = 
<img src={image} alt='figs coming soon' className="fig-image"/>


const Home = () => {
  return (
    <div className="figs-page">
      <header className="figs-header">
        <h1>The Fig Boutique</h1>
        <p>Welcome to your one-stop shop for exquisite fig  varieties!</p>
      </header>

      <Fig config={lazyLoadConfig} placeholder={placeholder}>
        <div className="figs-container">
          {figs.map(fig => (
            <div key={fig.id} className="fig-item">
              {/* <Fig config={lazyLoadConfig} placeholder={placeholder}> */}
                <img src={fig.imageUrl} alt={fig.name} className="fig-image" />
              {/* </Fig> */}
              <h3>{fig.name}</h3>
              <p>{fig.description}</p>
              {/* <div>
                <div>
                  <img src={fig.imageUrl} alt={fig.name} className="fig-image" />
                </div>
              </div> */}
              <button className="buy-button">Buy Now</button>
            </div>
          ))}
        </div>
      </Fig>


      <footer className="figs-footer">
        <p>© 2023 The Fig Boutique. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;