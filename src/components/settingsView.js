//currently not used, but may be used to specify username, autoloading on/off etc
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,

 } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as settingsActions from '../actions/settingsActions'
import * as templates from '../utilities/templates'

var SettingsView = React.createClass({
  render() {
    return <View style={templates.container}>
      <View style={templates.top}/>
        <View style={styles.header}>
          <Text style={{color: templates.colors.white}}>NVDB-app</Text>
        </View>
        <View style={styles.contents}>
          <Text style={styles.text}>
            Her vil det komme settings slik at bruker kan definiere div instillinger
            slik som f.eks skru av/på autolagring av søk.
            Samt spesifisering av forhåndsutfylte søkeparametre:
            kommune, veg, skilt e.l kommer opp standard ved nytt søk.
            Her kan du også hente nye oppdateringer på vegobjektyper eller kommuner dersom det blir endret
          </Text>
        </View>
        <View style={templates.footer}>
          <Text style={{color: templates.gray}}>Gruppe 16 NTNU</Text>
        </View>
    </View>
  }
});

var styles = StyleSheet.create({
  //Top-leve containers
  header: {
    flex: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.darkGray
  },
  contents: {
    flex: 10.5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: templates.colors.darkGray
  },
  text: {
    color: templates.colors.white,
  },
})


function mapStateToProps(state) {return {user: state.dataReducer.fetching};}
function mapDispatchToProps(dispatch) {return bindActionCreators(settingsActions, dispatch);}
export default connect(mapStateToProps, mapDispatchToProps) (SettingsView);
