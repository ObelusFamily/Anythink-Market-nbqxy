import ItemList from "../ItemList";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import { CHANGE_TAB } from "../../constants/actionTypes";

const YourFeedTab = (props) => {
  if (props.token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onTabClick("feed", agent.Items.feed, agent.Items.feed());
    };

    return (
      <li className="nav-item">
        <button
          type="button"
          className={props.tab === "feed" ? "nav-link active" : "nav-link"}
          onClick={clickHandler}
        >
          Your Feed
        </button>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = (props) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    props.onTabClick("all", agent.Items.all, agent.Items.all());
  };
  return (
    <li className="nav-item">
      <button
        type="button"
        className={props.tab === "all" ? "nav-link active" : "nav-link"}
        onClick={clickHandler}
      >
        Global Feed
      </button>
    </li>
  );
};

const TagFilterTab = (props) => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <button type="button" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </button>
    </li>
  );
};

const mapStateToProps = (state) => ({
  ...state.itemList,
  tags: state.home.tags,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (tab, pager, payload) =>
    dispatch({ type: CHANGE_TAB, tab, pager, payload }),
});

const MainView = (props) => {
  if (props.itemsCount === 0 && props.title !== "") {
    return (
      <div
        id="empty"
        className="card rounded-0 text-white w-75 mx-auto py-4 mt-4"
        style={{ background: "rgb(147,112,219,.4)" }}
      >
        <i className="bi bi-emoji-frown-fill text-center display-3"></i>
        <h4 className="pt-2 m-0 text-center font-weight-light">
          No items found for{" "}
          <span className="font-weight-bold">"{props.title}"</span>
        </h4>
      </div>
    );
  }

  return (
    <div>
      <div className="feed-toggle">
        <ul className="nav nav-tabs">
          <YourFeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick}
          />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />
        </ul>
      </div>

      <ItemList
        pager={props.pager}
        items={props.items}
        loading={props.loading}
        itemsCount={props.itemsCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
