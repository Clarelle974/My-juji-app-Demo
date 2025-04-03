import { Link } from "react-router-dom";
import HomePictures from "../../components/display-and-tools/HomePictures";
import SearchBar from "../../components/display-and-tools/SearchBar";
import "./home.css";
import ValuesPicture from "../../components/display-and-tools/ValuesPicture";

export default function Home() {
  return (
    <main id="main" className="home top">
      <div className="banner">
        <img src="/banner2.png" alt="jujitsukas en combat" />
        <h2>ACCUEIL</h2>
      </div>

      <SearchBar />
      <section>
        <h3>Bienvenue sur my-juji-app</h3>
        <p>
          My-juji-app est une application conçue pour vous aider à vous préparer
          pour le passage de grades en jujitsu traditionnel.{" "}
        </p>
        <ul>
          Chaque grade est l'occasion de travailler trois volets :
          <li>les techniques isolées </li>
          <li> des éléments du Kodokan Goshin Jutsu</li>
          <li>un ensemble d'attaques et réponses des 20 attaques imposées.</li>
        </ul>

        <HomePictures />
      </section>
      <Link to="/programs" className="dark-square big-radius">
        voir les programmes
      </Link>
      <ValuesPicture />
    </main>
  );
}
