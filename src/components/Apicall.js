import React, { useEffect, useState } from "react";

function Apicall() {
    const [categories, setcategories] = useState([]);
    const [category, setcategory] = useState("");
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        fetch('https://api.publicapis.org/categories')
            .then((resp) => resp.json())
            .then((response) => {
                setcategories(response.categories);
            })
            .catch((err) => alert(err.message ?? "Something went wrong"))
            .finally(() => setLoading(false)); // Set loading state to false after fetching categories
    }, []);

    useEffect(() => {
        if (category) {
            setLoading(true); // Set loading state to true before fetching entries
            fetch(`https://api.publicapis.org/entries?category=${category}`)
                .then((resp) => resp.json())
                .then((response) => {
                    setEntries(response.entries);
                })
                .catch((err) => alert(err.message ?? "Something went wrong"))
                .finally(() => setLoading(false)); // Set loading state to false after fetching entries
        }
    }, [category]);

    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand mx-5" >VK</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Features</a>
                            </li>
                        </ul>
                    </div>

                    <label htmlFor="items">Choose a category :</label>
                    <select className="items mx-5" id="items" onChange={(e) => setcategory(e.target.value)}>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </nav>

            {!loading && entries.length > 0 && (
                <div className="mainContainer">
                    {entries.map((item, index) => (
                        <div key={index} className="miniContainer">
                            <p>  <span>"API": </span>{item.API} </p>
                            <p>  <span>"Description": </span>{item.Description} </p>
                            <p>  <span>"Auth": </span>{item.Auth} </p>
                            {item.HTTPS ? (
                                <p>  <span>"HTTPS": </span>{item.HTTPS} </p>
                            ) : null} {/* Conditional rendering for HTTPS */}
                            <p>
                                <span>"Link": </span>
                                <a
                                    href={item.Link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link"
                                >
                                    {item.Link}
                                </a>
                            </p>
                            <p>  <span>"Category": </span>{item.Category} </p>
                        </div>
                    ))}
                </div>
            )}
            {!loading && entries.length === 0 && <p className="text-center fw-bold">Please Call the Api Dropdown</p>}
            {loading && <p>Loading...</p>}
        </>

    )
}

export default Apicall;
