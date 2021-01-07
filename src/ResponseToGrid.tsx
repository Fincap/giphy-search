/**

This file is responsible for the conversion of the GIPHY API results into a
list of images that can be used by react-grid-gallery.

**/

import {AxiosResponse} from 'axios';

interface GifData {
	url: string;
	embed_url: string;
}

function extract_image_data_from_response(response: AxiosResponse): GifData[]{
	const gifDataList: GifData[] = [];

	response.data.data.forEach((gif: GifData) => {
		let gifData = {
			url: gif.url,
			embed_url: gif.embed_url
		};
		gifDataList.push(gifData);
	});

	return gifDataList;

}

export {GifData, extract_image_data_from_response};
