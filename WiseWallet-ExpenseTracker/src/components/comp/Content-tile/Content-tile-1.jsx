import React from 'react';

function Content_tile_1(props) {
  const cardStyle = {
    maxWidth: "60%",
    width: "100%",
    height: "auto",
    marginLeft: "30px", // Move Content_tile_1 to the right by 30px
  };

  return (
    <>
      <div className="card m-3 ml-5" style={cardStyle}>
        <div className="row g-0 d-flex align-items-center">
          <div className="col-md-4">
            <img src={props.src} className="img-fluid rounded-start h-100" alt={props.alt} />
          </div>
          <div className="col-md-8">
            <div className="card-body text-center">
              <h5 className="card-title">{props.title}</h5>
              <p className="card-text">{props.content}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content_tile_1;