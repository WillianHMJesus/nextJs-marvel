import NavBar from "@/components/navbar";
import Section from "@/components/section";
import { useEffect, useState } from "react";
import { getCharacters, getCharactersByName } from "../services/characterService";
import Loading from "@/components/loading";

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(12);
  const [hideButton, setHideButton] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    handleGetCharacters();
  }, [])

  const handleGetCharacters = (offset = 0, limit = 12) => {
    setShowLoading(true);

    getCharacters(offset, limit)
      .then(data => {
        setHideButton(false);
        setCharacters(data?.results);
      }).finally(() => {
        setShowLoading(false);
      });
  }

  const handleGetCharactersByName = (name) => {
    setShowLoading(true);

    if (!name || name == '') {
      handleGetCharacters();
      return;
    }

    getCharactersByName(name)
      .then(data => {
        setHideButton(true);
        setCharacters(data?.results);
      }).finally(() => {
        setShowLoading(false);
      });
  }

  const handleGetCharactersShowMore = () => {
    setShowLoading(true);

    getCharacters(offset + limit, limit)
      .then(data => {
        setCharacters(concatList(characters, data.results));
        setOffset(offset + limit);
      }).finally(() => {
        setShowLoading(false);
      });
  }

  const concatList = (oldList, currentList) => {
    let newList = oldList;
    newList.push.apply(newList, currentList);
    return newList;
  }

  return (
    <>
      <NavBar
        showForm={true}
        handleSearchData={handleGetCharactersByName} />
      <Section />

      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            {characters.length > 0 &&
              characters.map(character => (
                <div key={character.id} className="col">
                  <a href={`/characters/${character.id}`}>
                    <div className="card h-100 shadow-sm">
                      <img className="card-img-top" height="85%"
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />
                      <div className="card-body">
                        <h5 className="card-title">{character.name}</h5>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
          </div>

          {characters.length == 0 && <div>
            <div className="row">&nbsp;</div>
            <div className="d-grid gap-2 col-4 mx-auto">
              <div className="alert alert-secondary" style={{ textAlign: "center" }}>
                Characters not found!
              </div>
            </div>
          </div>}

          <div className="row">&nbsp;</div>
          {!hideButton && characters.length > 0 &&
            <div className="d-grid gap-2 col-2 mx-auto">
              <button onClick={handleGetCharactersShowMore} className="btn btn-outline-dark" type="button">Show More</button>
            </div>}
        </div>
      </div >

      {showLoading && <Loading />}
    </>
  )
}
