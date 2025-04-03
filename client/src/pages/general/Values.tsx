import ValuesPicture from "../../components/display-and-tools/ValuesPicture";
import "./values.css";

export default function Values() {
  return (
    <>
      <main id="main" className="top judo-values">
        <div className="banner">
          <img src="/banner5.png" alt="poignée de mains" />
          <h2>LES VALEURS DU JUDO-JUJITSU</h2>
        </div>
        <div className="content">
          <h3>Un code moral pour les judokas</h3>
          <p>
            Le judo est bien plus qu’un simple sport ou un art martial. C’est
            une véritable école de vie, fondée sur un ensemble de valeurs
            morales qui guident le pratiquant aussi bien sur le tatami que dans
            la vie quotidienne.
          </p>{" "}
          <p>
            Ces principes, souvent regroupés sous le terme de "code moral du
            judo", ont été mis en avant par Jigoro Kano, le fondateur du judo,
            afin de faire du judoka un individu équilibré, respectueux et
            responsable.{" "}
          </p>{" "}
          <p>
            Chaque valeur a son importance et contribue à forger l’état d’esprit
            du judoka, favorisant à la fois la progression technique et le
            développement personnel.
          </p>
        </div>
        <section className="list-values">
          <h3>Les 8 valeurs du code moral</h3>
          <ul>
            <li>
              <p>
                <dfn>Politesse (Rei - 礼)</dfn>
                <br />
                Respecter son adversaire et son enseignant, être courtois sur et
                en dehors du tatami.
              </p>
            </li>

            <li className="value">
              <p>
                <dfn>Courage (Yūki - 勇気)</dfn>
                <br />
                Affronter ses peurs et persévérer malgré les difficultés.
              </p>
            </li>

            <li className="value">
              <p>
                <dfn>Sincérité (Makoto - 誠)</dfn>
                <br />
                Être honnête et agir avec intégrité, sans chercher à tromper les
                autres.
              </p>
            </li>

            <li className="value">
              <p>
                <dfn>Honneur (Meiyo - 名誉)</dfn>
                <br />
                Agir avec dignité et respect, assumer ses actions et ses
                engagements.
              </p>
            </li>

            <li className="value">
              <p>
                <dfn>Modestie (Kenkyo - 謙虚)</dfn>
                <br />
                Ne pas se vanter, rester humble et toujours prêt à apprendre des
                autres.
              </p>
            </li>

            <li className="value">
              <p>
                <dfn>Respect (Sonkei - 尊敬)</dfn>
                <br />
                Reconnaître la valeur des autres et se comporter avec
                bienveillance.
              </p>
            </li>

            <li className="value">
              <p>
                <dfn>Contrôle de soi (Jisei - 自制)</dfn>
                <br />
                Gérer ses émotions et agir avec calme et maîtrise.
              </p>
            </li>

            <li className="value">
              <p>
                <dfn>Amitié (Yūjō - 友情)</dfn>
                <br />
                Créer des liens de confiance et d'entraide avec ses partenaires.
              </p>
            </li>
          </ul>
        </section>
        <ValuesPicture />
      </main>
    </>
  );
}
