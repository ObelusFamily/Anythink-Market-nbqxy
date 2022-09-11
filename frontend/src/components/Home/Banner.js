import React, { useState } from "react";
import { connect } from "react-redux";
import { TITLE_SEARCH, TITLE_SEARCH_INPUT } from "../../constants/actionTypes";
import logo from "../../imgs/logo.png";

const mapStateToProps = (state) => {
  return {
    ...state.itemList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  buildItemsList: (payload) => dispatch({ type: TITLE_SEARCH, payload }),
  updateTitleSearchVal: (payload) =>
    dispatch({ type: TITLE_SEARCH_INPUT, payload }),
});

const Banner = ({ items, initItems, buildItemsList, updateTitleSearchVal }) => {
  const [kek, setKek] = useState(false);
  const startSearch = (input) => {
    setKek(true);
    if (input.length >= 1) {
      const searchResult = items.filter(
        (item) => item.title.includes(input) && item
      );
      updateTitleSearchVal({ title_search_input: input });
      buildItemsList({ items: searchResult, itemsCount: searchResult.length });
      return;
    }
    updateTitleSearchVal({ title_search_input: "" });
    buildItemsList({ items: initItems, itemsCount: initItems.length });
    return;
  };

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div className="container">
          <div class="row align-items-center">
            <span className="col text-right" id="get-part">
              A place to get
            </span>
            <div className="input-group col-6 p-0">
              <input
                id="search-box"
                className="form-control my-0 py-1 border-0 shadow-none"
                type="text"
                placeholder="What is it that you truly desire?"
                aria-label="Search"
                onInput={(e) => startSearch(e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white border-0">
                  <i className="bi bi-search" aria-hidden="true"></i>
                </span>
              </div>
            </div>
            <span className="col text-left"> the cool stuff.</span>
            {kek && <div id="empty">kek</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
