import React from 'react';
import _ from 'lodash';

export default class Gifulator extends React.Component {

	constructor() {
		super();
		this.state = {
			firstImg: null,
			firstImgLoaded: false,
			imgsLoaded: false,
			currentImgKey : 0
		}
	}

	componentDidMount() {

		let img = new Image();
		img.src = this.props.imgs[0];
		img.onload = () => {
				this.setState({
					firstImgLoaded: true,
					firstImg: this.props.imgs[0]
				});
				this.loadAllframes();
		}
	}

	loadAllframes() {

		let counter = 0,
			totalImgs = this.props.imgs.length;

		_.forEach(this.props.imgs, (val)=> {

			let img = new Image();
			img.src = val;
			img.onload = () => {
				if (counter == totalImgs - 1) {
					this.setState({
						imgsLoaded: true
					});
					this.timer();
				} else {
					counter++;
				}
			}
		});
	}

	timer() {

		setInterval(()=>{
			let totalImgs = this.props.imgs.length,
				newState;

			if (this.state.currentImgKey == totalImgs - 1) {
				newState = { currentImgKey: 0 }
			} else {
				newState = {currentImgKey: this.state.currentImgKey + 1 }
			}

			this.setState(newState);
		}, this.props.timer);
	}

	pickImg() {

		return this.props.imgs[this.state.currentImgKey]
	}
	
	render() {

		const css = {
			loading: {
				width: '100%',
				height: window.innerWidth,
				backgroundColor: 'lightgray',
				color: 'whitesmoke',
				textAlign: 'center',
			},
			table: {
				display: 'table',
				width: '100%',
				height: '100%',
			},
			tableCell: {
				display: 'table-cell',
				verticalAlign: 'middle',
			}
		}

		if (this.state.imgsLoaded) {
			return(
				<img src={this.pickImg()} style ={{maxWidth: '100%', display: 'block'}} alt="Image1" />
			);	
		} else if (this.state.firstImgLoaded) {
			return(
				<img src={this.state.firstImg} style ={{maxWidth: '100%', display: 'block'}} alt="Image1" />
			);
		} else {
			return(
				<div style={css.loading}>
					<div style={css.table}>
						<div style={css.tableCell}>Image loading&hellip;</div>
					</div>
				</div>	
			);
		}

	}
}