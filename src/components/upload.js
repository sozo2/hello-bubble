import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


class Upload extends Component { 

    constructor(props) {
        super(props);

        this.onChangeUploadImage = this.onChangeUploadImage.bind(this);
        this.onChangeImageLink = this.onChangeImageLink.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            imageFile: '',
            imageLink: ''
        }
    }
    

    onChangeUploadImage(e) {
        this.setState({
            imageFile: e.target.value
        });
    }

    onChangeImageLink(e) {
        this.setState({
            imageLink: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        let formData = new FormData();

        formData.append('imageFile', this.state.imageFile);
        formData.append('imageLink', this.state.imageLink);

        axios.post('/api/upload', formData)
            .then(function(res) { 
                console.log(res.data);
            });

        this.setState({
            imageFile: '',
            imageLink: ''
        });
    }


    render() {
      return (
        <div>
          Upload a new photo
          <Link to={"/"}><button>Return to Slideshow</button></Link>
          <form onSubmit={this.onSubmit}>

            <div className="form-group">
                <label>Upload an image: </label>
                <input 
                        type="file" 
                        name="imageFile"
                        onChange={this.onChangeUploadImage}
                        accept="image/png, image/jpeg, image/jpg"
                />
            </div>

            <div className="form-group"> 
                <label>Or submit link to an image: </label>
                <input  type="text"
                        value={this.state.imageLink}
                        onChange={this.onChangeImageLink}
                        name="imageLink"
                />
            </div>
                   
                    <div className="form-group">
                        <input id="upload-image" type="submit" value="Upload!" />
                    </div>
                </form>
        </div>
    )
  }
}

export default Upload;