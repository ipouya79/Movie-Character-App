import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";

export default function CharacterList({
  characters,
  isLoading,
  onSelectCharacter,
  selectedId,
}) {
  console.log(characters);

  if (isLoading) {
    return (
      <div className="characters-list">
        <Loader />
      </div>
    );
  }

  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Charecter key={item.id} item={item}>
          <button
            className="icon red"
            onClick={() => onSelectCharacter(item.id)}
          >
            {selectedId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </Charecter>
      ))}
    </div>
  );
}

export function Charecter({ item, children }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />

      <CharacterName item={item} />

      <CharacterInfo item={item} />
      {children}
    </div>
  );
}

function CharacterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? "👨" : "👩"}</span>
      <span> {item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info">
      <span className={`status ${item.status === "Dead" ? "red" : ""} `}></span>

      <span> {item.status}</span>
      <span> - {item.species}</span>
    </div>
  );
}
