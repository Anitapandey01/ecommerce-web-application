import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>Welcome to ShopEase</h1>

        <p>
          Discover quality products at affordable prices.
          Shop the latest gadgets with a smooth and secure shopping experience.
        </p>

        <Link to="/">
          <button
onClick={()=>{
window.scrollTo({
top:650,
behavior:"smooth"
});
}}
>
Shop Now
</button>
        </Link>

      </div>

    </section>
  );
}

export default Hero;