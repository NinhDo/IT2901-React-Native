//Connectino with AR
import { connect } from 'react-redux';
import RNFS from 'react-native-fs';
import Platform from 'react-native';

var ARConnection = React.createClass() {
  render(){
    return{<View></View>

    }
  },
  componentDidUpdate() {
    this.sendToAR(this.props.objects);
  },

  sendToAR (objects) {
    // Android handling code
    if (Platform.OS === 'android'){
      let mainpath = RNFS.DocumentDirectoryPath+'/data.json';
      RNFS.writeFile(mainpath, {this.props.objects}, 'utf8')
      .then((success) => {
        console.log('File written');
      })
      .catch((err) => {
        console.log(err.message);
      });
      // Now data should be available for unity
    }
    // Handling for iOS
    else{
      console.log('FeelsBad')
    }

    //send objects elle lagre fil
  }

}


function mapStateToProps(state) {
  return {
    objects: state.dataReducer.objects,

  };}
export default connect(mapStateToProps, null) (currentSearchView);
