import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Row from "../components/Row";

export default function Home() {
  return (
    <div className="bg-black min-h-screen pt-[80px] pb-10">

      <Banner />

      {/* ROWS */}
      <Row title="Netflix Originals" fetchUrl="/discover/tv?with_networks=213" isLarge />
      <Row title="Trending Now" fetchUrl="/trending/all/week" />
      <Row title="Top Rated" fetchUrl="/movie/top_rated" />
      <Row title="Action Movies" fetchUrl="/discover/movie?with_genres=28" />
      <Row title="Comedy Movies" fetchUrl="/discover/movie?with_genres=35" />
      <Row title="Horror Movies" fetchUrl="/discover/movie?with_genres=27" />
      <Row title="Romance Movies" fetchUrl="/discover/movie?with_genres=10749" />

      {/* FOOTER HERE */}
      <Footer />

    </div>
  );
}
