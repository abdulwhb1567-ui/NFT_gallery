import React from "react";
import { Link } from "react-router-dom";

export default function NFTCard({ nft }) {
  return (
    <article className="nft-card">
      <Link to={`/nft/${nft.id}`} className="nft-link">
        <img src={nft.image} alt={nft.name} className="nft-image" />
        <div className="nft-meta">
          <h3 className="nft-name">{nft.name}</h3>
          <p className="nft-artist">{nft.artist}</p>
          <p className="nft-price">{nft.price} ETH</p>
        </div>
      </Link>
    </article>
  );
}
