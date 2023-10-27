/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import React from 'react';
import axios from "axios";

import SearchInput from "../components/searchInput";
import Product from "../components/product";

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            suggestion: '',
            searchInputText: '',
            placeholder: 'SEARCH',
            searchResults: [],
            showingSearch: false,
            showingSearchResults: false
        };

        this.searchUrl = "http://localhost:3035";
        this.searchProducts = this.searchProducts.bind(this);
    }

    /**
     Searching for products based on onChange events from the search input field
     Updates state (showingSearchResults, searchResults, suggestion)
    **/
    async searchProducts(queryString) {
      const url = `http://localhost:3035?queryString=${queryString}`;
      const searchProducts = (await axios.get(url)).data;

      this.setState({
        showingSearchResults: queryString.length > 2 && searchProducts.data.length > 0,
        searchResults: searchProducts.data,
        suggestion: searchProducts.suggestionString
      })
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     *
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <SearchInput suggestionText={this.state.suggestion} onSearchFunction={this.searchProducts} placeholderText={this.state.placeholder} />
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearchResults ? "showing " : "") + "search-results-container"}>
                  <div className={"search-results-header"}>
                    DISPLAYING {this.state.searchResults.length} RESULTS
                  </div>
                  <div className={"search-results-items"}>
                    {this.state.searchResults.map(item => <Product data={item} key={`${item._id}-${item.name}`} />)}
                  </div>
                </div>
            </header>
        );
    }
}

// Export out the React Component
export default Menu;