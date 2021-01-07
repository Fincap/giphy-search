import * as React from 'react';
import { XMasonry, XBlock } from 'react-xmasonry';

import GifTile from './GifTile';
import { GifData } from './ResponseToGrid';

interface Props {
	gifData?: GifData[];
}

class GifTileContainer extends React.Component<Props> {
  	render() {
  		let gifList: GifData[] = [];

  		if (this.props.gifData !== undefined) {
  			gifList = this.props.gifData.slice()
  		}

  		const listOfGifs = gifList.map((item, i) => {
  			return (
  				<XBlock>
  					<GifTile key={i} url={item.url} embed_url={item.embed_url}/>
  				</XBlock>
  				);
  		});

  		return (
  			<XMasonry>
  				{listOfGifs}
  			</XMasonry>
  		);
  	}
}

export default GifTileContainer;
