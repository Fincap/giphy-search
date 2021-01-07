import * as React from 'react';
import GifTileContainer from './GifTileContainer';
import LoadMoreButton from './LoadMoreButton';
import { GifData } from './ResponseToGrid';

interface Props {
	loadingStatus: number;		// Currently status of the GIF loading defined in App's State definition.
	gifContainersLoaded: GifData[][];			// This contains a list of each GifTileContainer generated upon a new search
	gifOffset: number;
	searchTerm?: string;		// Will contain the term serched for if the trending API is false, and a term was searched for.
	handleSearch(term: string, offset: number): void;		// Used to request the next lot of search results.
}

class GifResults extends React.Component<Props> {

  	render() {
  		// Map out GifTileContainers for each offset
  		const listOfGifTileContainers = this.props.gifContainersLoaded.map((item, i) => {
  			return <GifTileContainer key={i} gifData={item} />
  		});

  		// Construct the status text based off the current loading status.
  		const trending = this.props.loadingStatus == 0 || this.props.loadingStatus == 1 || this.props.loadingStatus == 4;
  		const failed = this.props.loadingStatus == 4 || this.props.loadingStatus == 5;
  		const noResults = this.props.gifContainersLoaded.length == 1 && this.props.gifContainersLoaded[0].length == 0

  		let statusText: string = "";
  		if (failed) {
  			statusText = "Loading failed. Try again later.";
  		} else if (this.props.loadingStatus == 0 || this.props.loadingStatus == 2) {
  			statusText = "Loading GIFs...";
  		} else if (noResults) {
  			statusText = "No results found.";
  		} else {
  			statusText = "";
  		}

  		let loadMoreButton;
  		if (!trending && this.props.searchTerm != undefined && !failed && !noResults) {
  			loadMoreButton = <LoadMoreButton gifOffset={this.props.gifOffset} searchTerm={this.props.searchTerm} handleSearch={this.props.handleSearch}/>;
  		} else {
  			loadMoreButton = <br />;
  		}

	    return (
	    	<div className="GifResults">
	    		<h3>
	    			{trending ? "Trending now" : "Results for " + this.props.searchTerm + "..."}
	    		</h3>
	    		<p>
	    			{statusText}
	    		</p>
	    		{listOfGifTileContainers}
	    		{loadMoreButton}
	    	</div>
	    );
  	}
}

export default GifResults;
