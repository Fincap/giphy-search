import * as React from 'react';

interface Props {
	handleSearch(term: string, offset: number): void;
}

interface State {
	value: string;
}

class SearchBar extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {value: ''};
	}

	handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		if (this.state.value != '') this.props.handleSearch(this.state.value, 0);
		event.preventDefault();
	}

	handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({value: event.target.value});
	}

  	render() {
	    return (
	    	<div>
	    		<form onSubmit={this.handleSubmit}>
	    			<input type="text" value={this.state.value} placeholder="Search..." onChange={this.handleChange} className="SearchBar" />
	    		</form>
	    	</div>
	    );
  	}
}

export default SearchBar;
