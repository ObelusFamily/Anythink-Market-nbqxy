import ItemPreview from "./ItemPreview";
import ListPagination from "./ListPagination";
import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    ...state.itemList,
  };
};

const ItemList = (props) => {
  if (!props.items) {
    return <div className="py-4">Loading...</div>;
  }

  if (props.items.length === 0 && props.title_search_input) {
    return (
      <div
        className="card rounded-0 text-white w-75 mx-auto py-4 mt-4"
        style={{ background: "rgb(147,112,219,.4)" }}
      >
        <i className="bi bi-emoji-frown-fill text-center display-3"></i>
        <h4 className="pt-2 m-0 text-center font-weight-light">
          No items found for{" "}
          <span className="font-weight-bold">"{props.title_search_input}"</span>
        </h4>
      </div>
    );
  }

  return (
    <div className="container py-2">
      <div className="row">
        {props.items.map((item) => {
          return (
            <div className="col-sm-4 pb-2" key={item.slug}>
              <ItemPreview item={item} />
            </div>
          );
        })}
      </div>

      <ListPagination
        pager={props.pager}
        itemsCount={props.itemsCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default connect(mapStateToProps)(ItemList);
