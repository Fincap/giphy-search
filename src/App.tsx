import * as React from 'react';
import axios from 'axios';

import SearchBar from './SearchBar'
import GifResults from './GifResults'

import { GifData, extract_image_data_from_response } from './ResponseToGrid';

let giphy_api_key = "3GO2nGpEoMu412iBW9S1Rqjp0SeEd1pi";

interface Props {
    name: string;
}

/**
Loading statuses:
0: Loading Trending
1: Loaded Trending
2: Loading Search
3: Loaded Search
4: Trending Failed
5: Search Failed
**/

interface State{
	loadingStatus: number;
	searchTerm?: string;
	gifContainersLoaded: GifData[][];			// This contains a list of each GifTileContainer generated upon a new search
	gifOffset: number;							// The amount of times a new GifTileContainer has been requested (i.e. the first 20, then the next 20, etc.)
}

class App extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			loadingStatus: 0,
			gifContainersLoaded: [],
			gifOffset: 0
		};
	}

	constructGifContainerList = (gifData: GifData[], replaceExisting: boolean): GifData[][] => {
		let gifContainerList: GifData[][];

		if (replaceExisting) {
			gifContainerList = [gifData];
		} else {
			let gifContainersLoaded = this.state.gifContainersLoaded;
			gifContainersLoaded.push(gifData);
			gifContainerList = gifContainersLoaded;
		}

		return gifContainerList;
	}

	// This will load make an API request for the GIPHY trending page once the Component mounts.
	componentDidMount() {
		axios.get('http://api.giphy.com/v1/gifs/trending', {
			params: {
				api_key: giphy_api_key,
				limit: 20
			}
		})
		.then((response) => {
			const gifData: GifData[] = extract_image_data_from_response(response);
			const gifContainerList: GifData[][] = this.constructGifContainerList(gifData, true);

			this.setState({
				loadingStatus: 1,
				gifContainersLoaded: gifContainerList,
				gifOffset: 0});

		})
		.catch((response) => {
			this.setState({loadingStatus: 4});
		});
	}

	// This function is responsible for driving the API requests to GIPHY, receiving the responses, and then
	// taking the appropriate action depending on the results.
	handleSearch = (term: string, offset: number) => {

		this.setState({searchTerm: term,
				loadingStatus: 2});

		axios.get('http://api.giphy.com/v1/gifs/search', {
			params: {
				api_key: giphy_api_key,
				q: term,
				limit: 20,
				offset: 20 * offset
			}
		})
		.then((response) => {
			const gifData: GifData[] = extract_image_data_from_response(response);
			const gifContainerList: GifData[][] = this.constructGifContainerList(gifData, offset == 0 ? true : false);

			this.setState({
				loadingStatus: 3,
				gifContainersLoaded: gifContainerList,
				gifOffset: offset});
		})
		.catch((response) => {
			this.setState({searchTerm: term,
				loadingStatus: 5});
		});
};

  	render() {
	    const { name } = this.props;
	    return (
	    	<div>
		    	<div className="logo">
			    	<h1>GIPHYSearch</h1>
			    	<h6 className="logoSubtitle">Powered by GIPHY</h6>
			    </div>
			    <SearchBar handleSearch={this.handleSearch}/>

			    <GifResults loadingStatus={this.state.loadingStatus}
			    searchTerm={this.state.searchTerm}
			    gifContainersLoaded={this.state.gifContainersLoaded}
			    gifOffset={this.state.gifOffset}
			    handleSearch={this.handleSearch} />
			</div>
	    );
	}
}

export default App;
