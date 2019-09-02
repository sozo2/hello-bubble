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
            imageLink: '',
            media_placeholder: ''
        }
    }

    onChangeUploadImage(e) {
        this.setState({
            imageFile: e.target.files[0],
            media_placeholder: e.target.value  
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
        console.log(formData);
        axios.post('/api/upload', formData)
            .then(function(res) { 
                console.log(res.data);
            });

        this.setState({
            imageFile: '',
            imageLink: '',
            media_placeholder: ''
        });
    }


    render() {
      return (
        <div>
            <h1 className="center-title">Upload a Photo!</h1> 
          <Link to={"/"}><button className="bubble-button" id="return-button">Return to Slideshow</button></Link>
          <div id="form-wrapper">
          <form onSubmit={this.onSubmit}>

            <div className="form-group">
                <label style={{'font-weight':'500'}}>upload an image:</label>
                <input  value={this.state.media_placeholder}
                        type="file" 
                        name="imageFile"
                        onChange={this.onChangeUploadImage}
                        accept="image/png, image/jpeg, image/jpg"
                        style={{width:'50%', 'font-size': '18px'}}
                />
            </div>

            <div className="form-group" style={{'margin-top':'15px', 'font-style': 'oblique'}}>or</div> 

            <div className="form-group"> 
                <label style={{'font-weight':'500'}}>submit link to an image:</label>
                <input  type="text"
                        value={this.state.imageLink}
                        onChange={this.onChangeImageLink}
                        name="imageLink"
                        id="link-input"
                />
            </div>
                   
                    <div className="form-group">
                        <input id="upload-submit" type="submit" value="Upload" />
                    </div>
                </form>
                </div>
        </div>
    )
  }
}

export default Upload;