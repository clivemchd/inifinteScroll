import React, { Component } from 'react';
import { fetchAPI } from './fetchAPI';

export class InfiniteScrolling extends Component {
	constructor() {
    super();
    this.state = {
      photos: [],
      loading: false,
      page: 0,
      prevY: 0
    };
  }

	componentDidMount(){
		this.getPhotos(this.state.page);

		var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };
    
    const observer = new IntersectionObserver(
      this.handleObserver,
      options
    );
    observer.observe(this.loadingRef);
	}

	handleObserver = (entities, observer) => {
		// console.log("ss ", entities);
    // const y = entities[0].boundingClientRect.y;
    // if (this.state.prevY > y) {
			// console.log("blah")
      // const lastPhoto = this.state.photos[this.state.photos.length - 1];
      // const curPage = lastPhoto.albumId;
    this.getPhotos(0);
      // this.setState({ page: curPage });
    // }
    // this.setState({ prevY: y });
  }

	getPhotos = (page) => {
		this.setState({ loading: true });
		fetchAPI()
		.then((res) => {
			// console.log(res)
			this.setState({ photos: [...this.state.photos, ...res] });
			this.setState({ loading: false });
		})
	}

	render() {

		// Additional css
		const loadingCSS = {
			height: "100px",
			margin: "30px"
		};

		// To change the loading icon behavior
    const loadingTextCSS = {
			border: `1px solid yellow`,  
			// display: this.state.loading ? "block" : "none"
		};

		return (
      <div className="container">
        <div style={{ border: `1px solid red`, minHeight: "50px" }}>
          {this.state.photos.map((user, index) => (
						<img src={user.url} height="100px" width="200px" />
          ))}
        </div>
        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>Loading...</span>
        </div>
      </div>
		)
	}
}

export default InfiniteScrolling
