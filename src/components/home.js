import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class Home extends Component {

    state = {
        images: [],
        current_image: '',
        fill_bar_num: 0,
        fill_bar_percent: '0%'
    }

    intervalID;
    fillBarIntervalID;

    grabAllImages = () => {
        console.log(this.state.fill_bar_percent);
        axios.get('/api/all-images')
        .then((res) => {
            this.setState({
                images: res.data,
                current_image: this.getRandomIndex(res.data),
                fill_bar_num: 0,
                fill_bar_percent: '0%'
            });
            this.intervalID = setTimeout(this.grabAllImages.bind(this), 5000);
            console.log("Hi there");
            console.log(res.data);
        }); 
    }

    handleFillBar = () => {
        let current_time = this.state.fill_bar_num;
        this.setState({fill_bar_num: current_time+0.56, fill_bar_percent: (current_time+0.56) + '%' });
        this.fillBarIntervalID = setTimeout(this.handleFillBar.bind(this),25);
    }

    getRandomIndex = (arr) => {
        let randomIdx = Math.floor(Math.random() * arr.length);
        console.log(randomIdx);
        return arr[randomIdx].source; 
    }

    componentDidMount() {
        this.grabAllImages();
        this.handleFillBar();
    }; 

    componentWillUnmount() {
        clearTimeout(this.intervalID);
        clearTimeout(this.fillBarIntervalID);
    }

    render() {
      return (
        <div>
          <h1 className="center-title">Hello, Bubble!</h1> 
          <Link to={"/upload"}><button id="home-button" className="bubble-button">Upload a Photo</button></Link>
          <div id="image-wrapper">
            <img alt="Uh oh! New photo coming soon..." src={this.state.current_image} />
          </div>
          <div id="time-bar">
            <div style={{width: this.state.fill_bar_percent, float:'left', background: '#424242', height: '100%'}}></div>
          </div> 
        </div>
    )
  }
}

export default Home;