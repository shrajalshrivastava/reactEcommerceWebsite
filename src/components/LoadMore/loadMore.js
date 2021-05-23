import React from 'react'
import Button from "./../forms/Button/button"
import "./style.scss"

const LoadMore = ({
    onLoadMoreEvt = () => { },
  }) => {
    return (
      <Button  className="loadMore"onClick={() => onLoadMoreEvt()}>
        Load More
      </Button>
    );
  };
  
  export default LoadMore;
  