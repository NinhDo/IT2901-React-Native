import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Linking

} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import userDefaults from 'react-native-user-defaults'

import Button from '../misc/Button'

import * as templates from '../../utilities/templates'
import * as dataActions from '../../actions/dataActions'

/*
Shows information about current search, buttons for viewing map and opening AR
*/
var CurrentSearchView = React.createClass({
  componentDidMount() {
    this.props.resetFetching();
  },

  render() {
    return <View style={templates.container}>
      <View style={templates.top}/>
      <View style={styles.header}>
        <Text style={{color: templates.colors.darkGray}}>NVDB-app</Text>
      </View>
      <View style={styles.contents}>
        {this.createInformationView()}
      </View>
      <View style={styles.bottom}>
        {this.createButtons()}
      </View>
      <View style={templates.footer}>
        <Text style={{color: templates.darkGray}}>Gruppe 16 NTNU</Text>
      </View>
    </View>
  },

  createInformationView() {
    return <View style={styles.informationView}>
      <View style={styles.informationPadding}/>
      <View style={styles.information}>
        <Text style={styles.text}>Informasjon om valgt vegsøk:</Text>
        <Text style={styles.text}>Fylke:
          {this.props.currentRoadSearch.searchParameters[0].navn}</Text>
        <Text style={styles.text}>Antall vegobjekter er:
          {this.props.currentRoadSearch.roadObjects.length} </Text>
        <Text style={styles.text}>Prosentandel med egengeometri</Text>
      </View>
      <View style={styles.informationPadding}/>
    </View>
  },

  createButtons() {
    return <View style={styles.buttons}>

      <View style={styles.buttonArea1}>
        <Button text="Kart" onPress={Actions.RoadMapView} />
        <View style={styles.buttonPadding}/>
        <Button text="AR" onPress={this.openAR} />
      </View>

      <View style={styles.buttonArea2}>
        <Button text="Rapport" onPress={Actions.ReportView} />
        <View style={styles.buttonPadding}/>
        <Button text="Tilbake" onPress={this.exit} />
      </View>

    </View>
  },

  openAR() {
    //kan brukes ved mottak av data fra unity
    //this.props.fetchDataReturned(objects, true);
    userDefaults.set("HEI", this.props.currentRoadSearch.roadObjects, "group.nvdb", (err, data) => {
      if(!err) Linking.openURL("ARApp:");
    });
  },

  exit() {
    Actions.StartingView();
  },
});

var styles = StyleSheet.create({
  //Top-leve containers

  header: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.white
  },
  contents: {
    flex: 11.5,
    flexDirection: 'column',
    backgroundColor: templates.colors.white
  },
  informationView: {
    flex:1,
    flexDirection: 'row',
  },
  informationPadding: {
    flex: 0.2,
  },
  information: {
    flex:2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  bottom: {
    flex: 5,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: templates.colors.white
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonArea1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  buttonArea2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  buttonPadding: {
    flex: 0.1
  },
  button: {
    borderWidth: 2,
    flex: 1,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'aliceblue',
  },
  text: {
    color: templates.colors.darkGray,
  },
})


function mapStateToProps(state) {
  return {
    currentRoadSearch: state.dataReducer.currentRoadSearch,
  };}

  function mapDispatchToProps(dispatch) {
    return {
      //dataActions
      resetFetching: bindActionCreators(dataActions.resetFetching, dispatch),
    }
  }
  //function mapDispatchToProps(dispatch) {return bindActionCreators(dataActions, dispatch);}
  export default connect(mapStateToProps, mapDispatchToProps) (CurrentSearchView);