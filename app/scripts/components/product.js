/**
 * This file will hold a single Product box
 *
 */
import React from 'react';

export default function Product({data}) {

    return (
      <div className={"product-box"}>
        <img src={`${data.picture}`} className={"product-image"} />
        <div className={"product-name"}>
          {data.name}
        </div>
      </div>
    );
}
