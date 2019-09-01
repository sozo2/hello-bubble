import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';


class Home extends Component {

    state = {
        images: [],
        current_image: ''
    }

    intervalID;
    // imageIntervalID;

    grabAllImages = () => {
        axios.get('/api/all-images')
        .then((res) => {
            this.setState({
                images: res.data,
                current_image: this.getRandomIndex(res.data) 
            });
            this.intervalID = setTimeout(this.grabAllImages.bind(this), 5000);
        }); 
    }

    getRandomIndex = (arr) => {
        let randomIdx = Math.random() * length(arr) + 1;
        return arr[randomIdx]; 
    }

    // setCurrentImage = () => {
    //     this.setState({
    //         current_image: this.getRandomImage()
    //     });
    //     this.imageIntervalID = setTimeout(this.setCurrentImage.bind(this), 5000);
    // }

    componentDidMount() {
        this.grabAllImages();
        // this.setCurrentImage();
    }; 

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }

    render() {
      return (
        <div>
          <div>Hello, Bubble :)</div> 
          <Link to={"/upload"}><button>Upload a Photo</button></Link>
          <img id="slideshow-image" src={this.state.current_image} />
        </div>
    )
  }
}

export default Home;