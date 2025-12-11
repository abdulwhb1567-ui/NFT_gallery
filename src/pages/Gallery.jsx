import React, { useMemo, useState, useEffect } from "react";
import NFTCard from "../components/NFTCard";
import { nfts as initial } from "../data/nfts";

function parseDate(d){ return d ? new Date(d) : new Date(0) }

export default function Gallery(){
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [artist, setArtist] = useState("all");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  // debounce search input
  useEffect(()=>{
    const t = setTimeout(()=> setDebouncedQuery(query.trim()), 250);
    return ()=> clearTimeout(t);
  },[query]);

  const artists = useMemo(() => ["all", ...Array.from(new Set(initial.map(i=>i.artist)))], []);

  // compute min/max price from dataset on mount
  useEffect(()=>{
    const prices = initial.map(i=>i.price);
    const pmin = Math.floor(Math.min(...prices));
    const pmax = Math.ceil(Math.max(...prices));
    setMinPrice(pmin);
    setMaxPrice(pmax);
  },[]);

  const filtered = useMemo(()=>{
    let list = initial.slice();
    if(artist !== 'all') list = list.filter(i=>i.artist===artist);
    if(debouncedQuery) list = list.filter(i=> i.name.toLowerCase().includes(debouncedQuery.toLowerCase()) || i.artist.toLowerCase().includes(debouncedQuery.toLowerCase()));
    list = list.filter(i=> i.price >= minPrice && i.price <= maxPrice);

    if(sort === 'price-asc') list.sort((a,b)=>a.price-b.price);
    else if(sort === 'price-desc') list.sort((a,b)=>b.price-a.price);
    else if(sort === 'name') list.sort((a,b)=>a.name.localeCompare(b.name));
    else if(sort === 'newest') list.sort((a,b)=> parseDate(b.minted) - parseDate(a.minted));

    return list;
  }, [artist, debouncedQuery, sort, minPrice, maxPrice]);

  // pagination
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  useEffect(()=>{ if(page>totalPages) setPage(1) },[totalPages]);
  const pageItems = filtered.slice((page-1)*perPage, page*perPage);

  function resetFilters(){
    setQuery(""); setArtist('all'); setSort('newest');
    const prices = initial.map(i=>i.price);
    setMinPrice(Math.floor(Math.min(...prices))); setMaxPrice(Math.ceil(Math.max(...prices)));
    setPage(1);
  }

  return (
    <main className="gallery-page">
      <header className="controls">
        <input placeholder="Search name or artist" value={query} onChange={e=>{ setQuery(e.target.value); setPage(1); }} />
        <select value={artist} onChange={e=>{ setArtist(e.target.value); setPage(1); }}>
          {artists.map(a=> <option key={a} value={a}>{a}</option>)}
        </select>

        <label style={{display:'flex',gap:8,alignItems:'center'}}>
          <small>Min</small>
          <input type="number" value={minPrice} onChange={e=>{ setMinPrice(Number(e.target.value)); setPage(1); }} style={{width:80}} />
        </label>
        <label style={{display:'flex',gap:8,alignItems:'center'}}>
          <small>Max</small>
          <input type="number" value={maxPrice} onChange={e=>{ setMaxPrice(Number(e.target.value)); setPage(1); }} style={{width:80}} />
        </label>

        <select value={sort} onChange={e=>{ setSort(e.target.value); setPage(1); }}>
          <option value="newest">Newest</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="name">Name A–Z</option>
        </select>

        <select value={perPage} onChange={e=>{ setPerPage(Number(e.target.value)); setPage(1); }}>
          <option value={6}>6 / page</option>
          <option value={12}>12 / page</option>
          <option value={24}>24 / page</option>
        </select>

        <button onClick={resetFilters}>Clear</button>
      </header>

      <div style={{maxWidth:1100,margin:'8px auto',padding:'0 20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>{total} item{total!==1?'s':''}</div>
        <div>Page {page} / {totalPages}</div>
      </div>

      <section className="gallery-grid">
        {pageItems.map(n => (
          <NFTCard key={n.id} nft={n} />
        ))}
      </section>

      <footer style={{display:'flex',gap:8,justifyContent:'center',padding:20}}>
        <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page<=1}>Prev</button>
        {Array.from({length:totalPages}).map((_,i)=> (
          <button key={i} onClick={()=>setPage(i+1)} style={{fontWeight: i+1===page?700:400}}>{i+1}</button>
        ))}
        <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page>=totalPages}>Next</button>
      </footer>
    </main>
  );
}
