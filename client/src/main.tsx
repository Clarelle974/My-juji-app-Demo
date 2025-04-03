import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */
import App from "./App";
/* ************************************************************************* */
import {
  getBelts,
  getCategories,
  getKodokanKatasByBelt,
  getKodokanKatasDetails,
  getKodokanNotesByMember,
  getMemberDetails,
  getTechniqueDetails,
  getTechniqueNote,
  getTechniques,
  getTechniquesByBelt,
  getTechniquesByCategory,
  getTwentyAttacksKatasByBelt,
  getTwentyAttacksKatasDetails,
  getTwentyAttacksNotesByMember,
} from "./services/requests";

import { BeltProvider } from "./services/beltContext";
import { DarkModeProvider } from "./services/darkModeContext";
import { UserRoleProvider } from "./services/usersContext";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import EditKodokanKata from "./pages/admin/EditKodokanKata";
import EditTechnique from "./pages/admin/EditTechnique";
import EditTwentyAttacksKata from "./pages/admin/EditTwentyAttacksKata";
import NewKata from "./pages/admin/NewKata";
import NewTechnique from "./pages/admin/NewTechnique";
import Home from "./pages/general/Home";
import Kodokan from "./pages/general/Kodokan";
import Programs from "./pages/general/Programs";
import Search from "./pages/general/Search";
import TechniqueDetails from "./pages/general/TechniqueDetails";
import Techniques from "./pages/general/Techniques";
import TechniquesByCategory from "./pages/general/TechniquesByCategory";
import TwentyAttacks from "./pages/general/TwentyAttacks";
import Values from "./pages/general/Values";
import Learn from "./pages/training/Learn";

/* ************************************************************************* */
/*****PROBLEME DE CHARGEMENT DE BELTS DANS LOGINPOPUP A L'INSCRIPTION QUAND IL EST APPELE DU HEADER
 * VOIR SI ON GARDE LE LOADER POUR APP ET VOIR COMMENATIRES DESSOUS
 */
const router = createBrowserRouter([
  {
    element: <App />,

    children: [
      {
        path: "/",
        element: <Login />,
        loader: getBelts,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/kodokan-katas/:id/edit",
        element: <EditKodokanKata />,
        loader: async ({ params }) => ({
          belts: await getBelts(),
          kata: await getKodokanKatasDetails(String(params.id)),
          categories: await getCategories(),
          techniques: await getTechniques(),
        }),
      },

      {
        path: "/katas/new",
        element: <NewKata />,
        loader: async () => ({
          belts: await getBelts(),
          categories: await getCategories(),
          techniques: await getTechniques(),
        }),
      },
      {
        path: "/kodokan",
        element: <Kodokan />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const searchParams = new URLSearchParams(url.search);

          return {
            belts: await getBelts(),
            katas: await getKodokanKatasByBelt(searchParams),
            notes: await getKodokanNotesByMember(),
          };
        },
      },
      {
        path: "/programs",
        element: <Programs />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const searchParams = new URLSearchParams(url.search);

          return {
            belts: await getBelts(),
            categories: await getCategories(),
            techniquesByBelt: await getTechniquesByBelt(searchParams),
            kodokanKatas: await getKodokanKatasByBelt(searchParams),
            twentyAttacksKatas: await getTwentyAttacksKatasByBelt(searchParams),
          };
        },
      },

      {
        path: "/profile",
        element: <Profile />,
        loader: async () => ({
          belts: await getBelts(),
          member: await getMemberDetails(),
        }),
      },

      {
        path: "/search",
        element: <Search />,
        loader: getBelts,
      },

      {
        path: "/training/learn",
        element: <Learn />,
        loader: getBelts,
      },

      {
        path: "/techniques",
        element: <Techniques />,
        loader: getCategories,
      },

      {
        path: "/techniques/:id",
        element: <TechniqueDetails />,
        loader: async ({ params }) => {
          const belts = await getBelts();
          const technique = await getTechniqueDetails(String(params.id));
          let note = await getTechniqueNote(String(params.id));
          if (!note || note.content.trim() === "") {
            note = null;
          }

          return {
            belts,
            technique,
            note,
          };
        },
      },

      {
        path: "/techniques/:id/edit",
        element: <EditTechnique />,
        loader: async ({ params }) => ({
          belts: await getBelts(),
          technique: await getTechniqueDetails(String(params.id)),
          categories: await getCategories(),
        }),
      },
      {
        path: "/techniques/new",
        element: <NewTechnique />,
        loader: async () => ({
          belts: await getBelts(),
          categories: await getCategories(),
        }),
      },
      {
        path: "/techniques/category/:slug",
        element: <TechniquesByCategory />,
        loader: async ({ params, request }) => {
          const url = new URL(request.url);
          const searchParams = new URLSearchParams(url.search);

          return {
            belts: await getBelts(),
            techniques: await getTechniquesByCategory(
              String(params.slug),
              searchParams,
            ),
          };
        },
      },
      {
        path: "/twenty-attacks",
        element: <TwentyAttacks />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const searchParams = new URLSearchParams(url.search);

          return {
            belts: await getBelts(),
            katas: await getTwentyAttacksKatasByBelt(searchParams),
            notes: await getTwentyAttacksNotesByMember(),
          };
        },
      },
      {
        path: "/twenty-attacks-katas/:id/edit",
        element: <EditTwentyAttacksKata />,
        loader: async ({ params }) => ({
          belts: await getBelts(),
          kata: await getTwentyAttacksKatasDetails(String(params.id)),
          categories: await getCategories(),
          techniques: await getTechniques(),
        }),
      },
      {
        path: "/values",
        element: <Values />,
      },
    ],
  },
]);

/* ************************************************************************* */

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <DarkModeProvider>
      <UserRoleProvider>
        <BeltProvider>
          <RouterProvider router={router} />
        </BeltProvider>
      </UserRoleProvider>
    </DarkModeProvider>
  </StrictMode>,
);
