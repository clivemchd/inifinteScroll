/* eslint-disable no-unreachable */
import './App.css';
import { fetchAPI, realFetchAPI } from './fetchAPI';
import { useEffect, useState, useRef } from 'react';


const InfiniteScrollingBitch = () => {

	const [itemList, setItemList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(0);
	const loaderRef = useRef(null);
	
	const handleUpdate = (entities, observer) => {
		const newPage = page + 1;
		console.log("test ", page, newPage);
		getData(newPage);
		setPage(newPage);
	}
	
	const getData = (page) => {
		setLoading(true);
		realFetchAPI(page, 10)
		.then((response) => {
			setItemList(() => { return [...itemList, ...response]});
			setLoading(false);
		})
	} 
	
	useEffect(() => {
		getData(page);

		// let options = {
		// 	root: null,
		// 	rootMargin: '0px',
		// 	threshold: 0.1
		// }
		
		// let observer = new IntersectionObserver(handleUpdate, options);
		// observer.observe(loaderRef.current);
	}, []);

	const loadingCSS = {
		height: "100px",
		margin: "30px"
	};

	const loadingTextCSS = {
		border: `1px solid yellow`,  
		display: loading ? "block" : "none"
	};
	
	return (
		<div>
			<div id="scrollArea" style={{ border: `1px solid red`, minHeight: "800px" }} className="App">
				{itemList.length > 0 && itemList.map((elem, index) => {
					return (
						<div key={index} id={`louda`}>
							<img src={elem.url} height="60px" width="80%" />
							<h5>{elem.id} - {elem.title}</h5>
						</div>
					)
				})}
			</div>
			<div
				ref={loaderRef}
				style={loadingCSS}
			>
			<span style={loadingTextCSS}>Loading...</span>
			</div>
		</div>
  );
}

export default InfiniteScrollingBitch;
