// view shown when fetching/loading data
import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import TimerMixin from 'react-timer-mixin';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as templates from '../utilities/templates'

// 3rd party module imports
import * as Progress from 'react-native-progress';

//import only the actions that we need
import * as dataActions from '../actions/dataActions'
import * as searchActions from '../actions/searchActions'

import {fetchFromAPI_all, fetchEgenskapstyper, fetchTotalNumberOfObjects} from '../utilities/wrapper'

const objektID = 96;
const baseURL = 'https://www.vegvesen.no/nvdb/api/v2/';
const preFetchURL = 'vegobjekter/96/statistikk';

var LoadingView = React.createClass({
  mixins: [TimerMixin],

  //create URL happens here here
  componentWillMount() {
    //prefetches total number of objects to be fetched
    const preURL = baseURL + preFetchURL + '?kommune=' + this.props.kommune.nummer;
    var numberOfObjectsToBeFetched = 0;
    fetchTotalNumberOfObjects(preURL).then(function(response) {
      numberOfObjectsToBeFetched = response.antall;
      this.props.setNumberOfObjectsToBeFetched(numberOfObjectsToBeFetched);
    }.bind(this));

    //Creates url and fetches objects
    const url = baseURL + 'vegobjekter/' + objektID + '?kommune=' + this.props.kommune.nummer + '&inkluder=alle&srid=4326';
    this.props.fetchDataStart();
    fetchFromAPI_all(this.props.fetchDataReturned, url);

    this.state = {
      counter: 0,
      progress: 0
    }

    this.getProgress();
  },

  /*<ActivityIndicator
    animating={this.props.fetching}
    style={[styles.fetchingStatus, {height: 80}]}
    size="large"
    />*/

  render() {
    return <View style={styles.container}>
      <View style={styles.top}/>
      <View style={styles.header}>
        <Text style={{color: templates.textColorWhite}}>NVDB-app</Text>
      </View>
      <View style={styles.contents}>
        <Progress.Circle
          progress={this.state.progress}
          color='white'
          showsText={true}
          size={80}
        />
        <View style={styles.fetchingInfo}>
          <View style={styles.padding}/>
          <View style={styles.progressInfo}>
            <Text style={styles.text}> Some information about progress:</Text>
            <Text style={styles.text}></Text>
            <Text style={styles.text}> Kommune, er {this.props.kommune.navn}</Text>
            <Text style={styles.text}> Antall objekter hentet er {this.props.numberOfObjectsFetchedSoFar + this.state.counter}</Text>
            <Text style={styles.text}> Antall objekter som skal hentes er {this.props.numberOfObjectsToBeFetched}</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={{color: templates.gray}}>Gruppe 16 NTNU</Text>
      </View>
    </View>
  },

  getProgress() {
    this.setTimeout(() => {
      this.getProgress();
    }, 10);

    if (isNaN(this.props.numberOfObjectsFetchedSoFar / this.props.numberOfObjectsToBeFetched)) {
      this.setState({progress: 0});
    } else {
      if(this.state.counter < this.props.numberOfObjectsToBeFetched) {
        this.setState({counter: this.state.counter + 1});
      } else {
        this.setState({counter: this.props.numberOfObjectsToBeFetched - 100})
      }

      const progress = (this.props.numberOfObjectsFetchedSoFar + this.state.counter) / this.props.numberOfObjectsToBeFetched;
      this.setState({progress: progress});
    }
  },

  //this may be really bad as componentDidUpdate may be called a lot of times
  //and it works ugly af
  componentDidUpdate() {
    if(this.props.fetched) {
      this.props.createSearchObject(
        'description',
        this.props.objects,
        'report',
        this.props.combinedSearchParameters);
        this.props.resetSearchParameters();
        Actions.currentSearchView();
      }
    },
  });

  function mapStateToProps(state) {
    return {
      //Fields used when creating URL
      kommune: state.searchReducer.kommune_input,

      //Needed when creating roadSearch object
      objects: state.dataReducer.objects,
      combinedSearchParameters: state.searchReducer.combinedSearchParameters,

      //Status information about search
      fetching: state.dataReducer.fetching,
      fetched: state.dataReducer.fetched,
      numberOfObjectsToBeFetched: state.dataReducer.numberOfObjectsToBeFetched,
      numberOfObjectsFetchedSoFar: state.dataReducer.numberOfObjectsFetchedSoFar,
    };}

    function mapDispatchToProps(dispatch) {
      return {
        //dataActions
        fetchDataStart: bindActionCreators(dataActions.fetchDataStart, dispatch),
        fetchDataReturned: bindActionCreators(dataActions.fetchDataReturned, dispatch),
        createSearchObject: bindActionCreators(dataActions.createSearchObject, dispatch),
        setNumberOfObjectsToBeFetched: bindActionCreators(dataActions.setNumberOfObjectsToBeFetched, dispatch),
        resetSearchParameters: bindActionCreators(searchActions.resetSearchParameters, dispatch),
      }
    }
    export default connect(mapStateToProps, mapDispatchToProps) (LoadingView);

    var styles = StyleSheet.create({
      container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'stretch',
      },
      //Top-leve containers
      top: {
        flex: 0.7
      },
      header: {
        flex: 7.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: templates.gray
      },
      contents: {
        flex: 10.5,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: templates.gray
      },
      fetchingStatus: {  //used by fetching status
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
      },
      fetchingInfo: {
        flex: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      padding: {
        flex: 0.4,
      },
      progressInfo: {
        flex: 1.5,
      },
      footer: {
        flex:0.7,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        color: templates.textColorWhite,
      },
    })
