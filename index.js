'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gifulator = function (_React$Component) {
	_inherits(Gifulator, _React$Component);

	function Gifulator() {
		_classCallCheck(this, Gifulator);

		var _this = _possibleConstructorReturn(this, (Gifulator.__proto__ || Object.getPrototypeOf(Gifulator)).call(this));

		_this.state = {
			firstImg: null,
			firstImgLoaded: false,
			imgsLoaded: false,
			currentImgKey: 0
		};
		return _this;
	}

	_createClass(Gifulator, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			var img = new Image();
			img.src = this.props.imgs[0];
			img.onload = function () {
				_this2.setState({
					firstImgLoaded: true,
					firstImg: _this2.props.imgs[0]
				});
				_this2.loadAllframes();
			};
		}
	}, {
		key: 'loadAllframes',
		value: function loadAllframes() {
			var _this3 = this;

			var counter = 0,
			    totalImgs = this.props.imgs.length;

			_lodash2.default.forEach(this.props.imgs, function (val) {

				var img = new Image();
				img.src = val;
				img.onload = function () {
					if (counter == totalImgs - 1) {
						_this3.setState({
							imgsLoaded: true
						});
						_this3.timer();
					} else {
						counter++;
					}
				};
			});
		}
	}, {
		key: 'timer',
		value: function timer() {
			var _this4 = this;

			setInterval(function () {
				var totalImgs = _this4.props.imgs.length,
				    newState = void 0;

				if (_this4.state.currentImgKey == totalImgs - 1) {
					newState = { currentImgKey: 0 };
				} else {
					newState = { currentImgKey: _this4.state.currentImgKey + 1 };
				}

				_this4.setState(newState);
			}, this.props.timer);
		}
	}, {
		key: 'pickImg',
		value: function pickImg() {

			return this.props.imgs[this.state.currentImgKey];
		}
	}, {
		key: 'render',
		value: function render() {

			var css = {
				loading: {
					width: '100%',
					height: window.innerWidth,
					backgroundColor: 'lightgray',
					color: 'whitesmoke',
					textAlign: 'center'
				},
				table: {
					display: 'table',
					width: '100%',
					height: '100%'
				},
				tableCell: {
					display: 'table-cell',
					verticalAlign: 'middle'
				}
			};

			if (this.state.imgsLoaded) {
				return _react2.default.createElement('img', { src: this.pickImg(), style: { maxWidth: '100%', display: 'block' }, alt: 'Image1' });
			} else if (this.state.firstImgLoaded) {
				return _react2.default.createElement('img', { src: this.state.firstImg, style: { maxWidth: '100%', display: 'block' }, alt: 'Image1' });
			} else {
				return _react2.default.createElement(
					'div',
					{ style: css.loading },
					_react2.default.createElement(
						'div',
						{ style: css.table },
						_react2.default.createElement(
							'div',
							{ style: css.tableCell },
							'Image loading…'
						)
					)
				);
			}
		}
	}]);

	return Gifulator;
}(_react2.default.Component);

exports.default = Gifulator;


Gifulator.propTypes = {
	imgs: _react2.default.PropTypes.array.isRequired,
	timer: _react2.default.PropTypes.number.isRequired
};
