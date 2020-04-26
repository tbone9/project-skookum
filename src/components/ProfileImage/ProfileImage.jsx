import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { storage, storageRef } from '../../utils/firebase';


class ProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileURL: '',
            image: null,
            progress: 0
        }

    }

    handleImageChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));

        }
    }

    handleUpload = () => {
        const { image } = this.state;
        console.log(image, 'IMAGE')
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                // progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ progress });
            },
            error => {
                // Error function ...
                console.log(error);
            },
            () => {
                // complete function ...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({ profileURL: url });
                    });
            }
        );

    };

    render() {
        return (
            <div>
                <progress value={this.state.progress} max='100' />
                <Input type='file' onChange={this.handleImageChange} />
                <button onClick={this.handleUpload}>Upload Image</button>
            </div>
        )
    }
}

export default ProfileImage;