import React from "react";
import { useParams, Link } from "react-router-dom";
import { nfts } from "../data/nfts";

export default function Detail(){
  const { id } = useParams();
  const nft = nfts.find(x=>x.id===id);
  if(!nft) return (<main style={{padding:24}}><p>NFT not found. <Link to="/">Back</Link></p></main>);

  return (
    <main className="nft-detail">
      <Link to="/" className="back-link">← Back to gallery</Link>
      <div className="detail-grid">
        <img src={nft.image} alt={nft.name} className="detail-image" />
        <div className="detail-meta">
          <h1>{nft.name}</h1>
          <p className="artist">By {nft.artist}</p>
          <p className="price">{nft.price} ETH</p>
          <p className="description">{nft.description}</p>
        </div>
      </div>
    </main>
  );
}
