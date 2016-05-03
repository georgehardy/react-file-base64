/*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
* Licensed Under MIT (http://opensource.org/licenses/MIT)
*
* React File Base64 - Version@1.0.0
*
*/

import React from 'react';
import ReactDOM from 'react-dom';

class FileBase64 extends React.Component {

  constructor() {
    super()
    this.state = {
      files: []
    }
    this.props = {
      multiple: false
    }
  }

  handleChange(e){

    // get the files
    let files = e.target.files;

    // Process each file
    var allFiles = []
    for (var i = 0; i < files.length; i++) {

      let file = files[i]

      // Make new FileReader
      let reader = new FileReader()

      // Convert the file to base64 text
      reader.readAsDataURL(file)

      // on reader load somthing...
      reader.onload = () => {

        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000)+' kB',
          base64: reader.result
        }

        // Push it to the state
        allFiles.push(fileInfo)

        // If all files have been proceed
        if(allFiles.length == files.length){
          // Apply Callback function
          this.props.onDone(allFiles)
        }

      } // reader.onload

    } // for

  }

  render(){
    return (
      <input
        type="file"
        onChange={ this.handleChange.bind(this) }
        multiple={ this.props.multiple } />
    )
  }

}

export default FileBase64;