import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';	
import { fetchAPI, realFetchAPI } from './fetchAPI';

const pageSize = 10;
const threshold = 5;

const generateList = async (page, size) => {
	let arr = [];
	await realFetchAPI(page, size)
	.then((res) => {
		arr = [...res];
	})
  // let arr = [];
  // for (let i = 1; i <= size; i++) {
  //   arr.push(`${(page - 1) * size + i}`);
  // }

  return arr;
};

const fetchList = page => {
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve(generateList(page, pageSize));
    }, 1500);
  });
};

let options = {
  root: null,
  threshold: 0,
};

export default function InfiniteScrolling() {
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [list, setlist] = useState(generateList(page, pageSize));

  const listLengthRef = useRef(list.length);
  const pageRef = useRef(page);

  const callback = useCallback(entries => {
    if (entries[0].isIntersecting) {
      observerRef.current.unobserve(
        document.getElementById(`item_${listLengthRef.current - threshold}`),
      );
      setFetching(true);
      fetchList(pageRef.current + 1).then(res => {
        setFetching(false);
        setPage(page => page + 1);
        setlist(list => [...list, ...res]);
      });
    }
  }, []);

  const observerRef = useRef(new IntersectionObserver(callback, options));

  useEffect(() => {
    listLengthRef.current = list.length;
  }, [list]);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    observerRef.current.observe(
      document.getElementById(`item_${list.length - threshold}`),
    );
  }, [list]);

  return (
    <div className="App">
      {list.length > 0 && list.map(l => (
        <p key={l} id={`item_${l}`}>
          {l.id}
        </p>
      ))}
      {fetching && <p>loading...</p>}
    </div>
  );
}
