import React,{Component} from 'react';
var Carousel = require('react-3d-carousel');
var Ease = require('ease-functions');
var images = require('./images');
import './ap.css'

var MainView = React.createClass({
    getInitialState: function () {
        return {
            images: images.slice(0, 6),
            width: 300,
            layout: 'classic',
            ease: 'linear',
            duration: 800
        };
    },
    componentWillMount: function () {
        this.onSides = function (event) {
            this.setState( {images: images.slice(0, event.target.value) });
        }.bind(this);
        this.onLayout = function (event) {
            this.setState({layout: event.target.value});
        }.bind(this);
        this.onDuration = function (event) {
            this.setState({duration: parseInt(event.target.value) });
        }.bind(this);
        this.onEase = function (event) {
            this.setState({ease:  event.target.value});
        }.bind(this);
    },
    render: function () {
        var easeList = Object.keys(Ease).map(function (d) {
            return (<option key={d} value={d}>{d}</option>)
        });
        return (
            <div>
                <Carousel width={this.state.width}
                          images={this.state.images}
                          ease={this.state.ease}
                          duration={this.state.duration}
                          layout={this.state.layout}/>

            </div>
        );
    }
});

module.exports = MainView;
