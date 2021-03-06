import React from 'react';
import axios from 'axios';
import AssetPair from '../js/AssetPair';

class CryptoCurrencies extends React.Component {
	propTypes: {
    data: React.PropTypes.array.isRequired
  }

	constructor(props) {
  	super(props);
  	this.state = {
			data : this.props.data,
			pollInterval: this.props.pollInterval,
			webApiGatewayUrl: this.props.url,
			dataEndpointUrl: props.url + '/kraken'
		};
		this.loadDataFromServer = this.loadDataFromServer.bind(this)
	}

	loadDataFromServer(component, apiUrl) {
		axios.get(apiUrl).then(function(res) {
			var dataList = res.data.list;
			component.setState({
				data : dataList
			});
		});
	}

	componentDidMount() {
		this.loadDataFromServer(this, this.state.dataEndpointUrl);
		setInterval(this.loadDataFromServer.bind(null, this, this.state.dataEndpointUrl), this.state.pollInterval);
	}

	render(){
		const dataEndpointUrl = this.state.dataEndpointUrl;
		const dataItems = this.state.data.map(function(item) {
			return <AssetPair data={item} key={item.id} url={dataEndpointUrl}/>
		});

		return (
			<div>
				<h1>CryptoCurrencies</h1>
				<h2>Kraken Asset Pairs</h2>
				<ul className='DataItemList-list'>
					{dataItems}
				</ul>
			</div>
		)
	}
}

export default CryptoCurrencies;
