import * as React from 'react';

interface Props {
	url: string;
	embed_url: string;
}

class GifTile extends React.Component<Props> {
  	render() {
    	return (
    		<div className="GifTile">
    				<iframe src={this.props.embed_url} />
    		</div>
    	);
  	}
}

export default GifTile;
