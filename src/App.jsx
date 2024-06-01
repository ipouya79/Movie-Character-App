import toast, { ToastBar, Toaster } from "react-hot-toast";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favorities, Search, SearchResult } from "./components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./components/Modal";
function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favorite, setFavorite] = useState(() =>
    JSON.parse(localStorage.getItem("favorites")) || []
  );

 

useEffect(()=>{
localStorage.setItem("favorites" , JSON.stringify(favorite) )


},[favorite])


  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal }
        );
        setCharacters(data.results.slice(0, 5));
      } catch (err) {
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setCharacters([]);
      return;
    }

    fetchData();
    return () => {
      controller.abort();
    };
  }, [query]);

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavorite = (char) => {
    setFavorite((prev) => [...prev, char]);
  };

  const handleDeleteFavorite = (id) => {
    setFavorite((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };

  const isAddToFavorite = favorite.map((fav) => fav.id).includes(selectedId);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favorities
          favorites={favorite}
          onDeleteFavorite={handleDeleteFavorite}
        />
      </Navbar>
      <Main>
        <CharacterList
          characters={characters}
          isLoading={loading}
          onSelectCharacter={handleSelectCharacter}
          selectedId={selectedId}
        />
        <CharacterDetail
          selectedId={selectedId}
          onAddFavorite={handleAddFavorite}
          isAddToFavorite={isAddToFavorite}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
