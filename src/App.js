import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { realFetchAPI } from './fetchAPI';

const InfiniteScrolling = () => {
	
	const [callback, setCallback] = useState({});
	const [itemList, setitemList] = useState([]);
	const [page, setPage] = useState(0);
	const [loaderElem, setLoaderElem] = useState(null)
	let observer = useRef()

	useEffect(() => {
		observer.current = new IntersectionObserver(([entry]) => { setCallback(entry) }, 
		{ rootMargin: '1px', threshold : 1 })
		const currentElem = loaderElem;
		const currentObserver = observer.current;
		
		if(currentElem){
			currentObserver.observe(currentElem);
		}

		return () => {
			if(currentElem){
				currentObserver.unobserve(currentElem);
			}
		}
	}, [loaderElem])

	useEffect(() => {
		if(callback && callback.isIntersecting){
			const newPage = page + 1;
			setPage(newPage);
			realFetchAPI(newPage, 10)
			.then(res => {
				setitemList(() => [...itemList, ...res]);
			})
		}
	}, [callback])

	return (
		<div>
			<div>
			{itemList.length > 0 && itemList.map((elem, index) => {
					return (
						<div key={index} id={`content`} style={{ color:`white`, border: `1px solid white`, margin: `1%`, padding: `1%` }}>
							<img src={elem.url} height="60px" width="80%" />
							<h5>{elem.id} - {elem.title}</h5>
						</div>
					)
			})}
			</div>
			<div ref={setLoaderElem}>
				<span style={{ color:'#ffffff'}} >Loading...</span>
			</div>
		</div>
	)
}

export default InfiniteScrolling
