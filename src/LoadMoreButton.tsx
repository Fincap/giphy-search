import * as React from 'react';

interface Props {
    gifOffset: number;
    searchTerm: string;
    handleSearch(term: string, offset: number): void;
}

class LoadMoreButton extends React.Component<Props> {

    onClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>): void => {
        this.props.handleSearch(this.props.searchTerm, this.props.gifOffset + 1);
    }

    render() {
        return (
            <div className="LoadMoreButton-container">
            	<input className="LoadMoreButton" type="button" onClick={this.onClick} value="Load more..." />
            </div>
        );
    }
}

export default LoadMoreButton;
